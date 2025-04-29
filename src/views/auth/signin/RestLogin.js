import React from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Button, Alert } from 'react-bootstrap';

import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import useScriptRef from '../../../hooks/useScriptRef';
import { API_SERVER } from './../../../config/constant';
import { ACCOUNT_INITIALIZE } from './../../../store/actions';

const RestLogin = ({ className, ...rest }) => {
    const dispatcher = useDispatch();
    const scriptedRef = useScriptRef();

    return (
        <React.Fragment>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Нужен действительный адрес почты').max(255).required('Требуется электронная почта'),
                    password: Yup.string().max(255).required('Требуется пароль')
                })}
              onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
    try {
        const response = await axios.post(`${API_SERVER}auth/login`, 
            {
                username: values.email,
                password: values.password  // Не passwordHash - хэширование должно быть на сервере
            },
            {
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                withCredentials: true  // Для передачи кук, если используется
            }
        );

        // Проверяем структуру ответа
        if (response.data?.token && response.data?.user) {
            const userData = {
                isLoggedIn: true,
                user: {
                    id: response.data.user.id,
                    email: response.data.user.email || values.email,
                    name: response.data.user.name || values.email
                },
                token: response.data.token
            };
            
            dispatcher({ type: ACCOUNT_INITIALIZE, payload: userData });
            setStatus({ success: true });
            
            // Перенаправление после успешного входа
            if (scriptedRef.current) {
                navigate('/dashboard');  // Или ваш путь для редиректа
            }
        } else {
            throw new Error('Неверная структура ответа сервера');
        }
    } catch (err) {
        let errorMessage = 'Ошибка при входе';
        
        if (err.response) {
            // Сервер ответил с ошибкой
            errorMessage = err.response.data?.message || 
                         err.response.statusText || 
                         `Ошибка ${err.response.status}`;
        } else if (err.request) {
            // Запрос был отправлен, но ответа нет
            errorMessage = 'Сервер не отвечает. Проверьте подключение.';
        }
        
        setErrors({ submit: errorMessage });
        console.error('Login error:', err);
    } finally {
        setSubmitting(false);
    }
}}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} className={className} {...rest}>
                        <div className="form-group mb-3">
                            <input
                                className="form-control"
                                error={touched.email && errors.email}
                                label="Электронная почта"
                                placeholder="Электронная почта"
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="email"
                                value={values.email}
                            />
                            {touched.email && errors.email && <small className="text-danger form-text">{errors.email}</small>}
                        </div>
                        <div className="form-group mb-4">
                            <input
                                className="form-control"
                                error={touched.password && errors.password}
                                label="Пароль"
                                placeholder="Пароль"
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="password"
                                value={values.password}
                            />
                            {touched.password && errors.password && <small className="text-danger form-text">{errors.password}</small>}
                        </div>

                        {errors.submit && (
                            <Col sm={12}>
                                <Alert variant="danger">{'Неправильный email'}</Alert>
                            </Col>
                        )}

                        <div className="custom-control custom-checkbox  text-left mb-4 mt-2">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">
                                Запоми меня
                            </label>
                        </div>

                        <Row>
                            <Col mt={2}>
                                <Button
                                    className="btn-block"
                                    color="primary"
                                    disabled={isSubmitting}
                                    size="large"
                                    type="submit"
                                    variant="primary"
                                >
                                    Войти
                                </Button>
                            </Col>
                        </Row>
                    </form>
                )}
            </Formik>
            <hr />
        </React.Fragment>
    );
};

export default RestLogin;