import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button, Alert } from 'react-bootstrap';

import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import useScriptRef from '../../../hooks/useScriptRef';
import { API_SERVER } from './../../../config/constant';
import { ACCOUNT_INITIALIZE } from './../../../store/actions';

const RestLogin = ({ className, ...rest }) => {
    const dispatch = useDispatch();
    const scriptedRef = useScriptRef();
    const navigate = useNavigate();

    return (
        <React.Fragment>
            <Formik
                initialValues={{
                    username: '', // Изменено с email на username
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    username: Yup.string().required('Требуется имя пользователя'),
                    password: Yup.string().required('Требуется пароль')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        const response = await axios.post(`${API_SERVER}auth/login`, {
                            Username: values.username, // Соответствует ожиданиям API
                            PasswordHash: values.password // Соответствует ожиданиям API
                        }, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            }
                        });

                        if (response.data.token) {
                            const userData = {
                                isLoggedIn: true,
                                user: {
                                    username: values.username // Минимальные данные пользователя
                                },
                                token: response.data.token
                            };

                            dispatch({
                                type: ACCOUNT_INITIALIZE,
                                payload: userData
                            });

                            localStorage.setItem('authToken', response.data.token);
                            
                            if (scriptedRef.current) {
                                setStatus({ success: true });
                                setSubmitting(false);
                                navigate('/dashboard'); // Использование useNavigate
                            }
                        } else {
                            throw new Error('Отсутствует токен в ответе');
                        }
                    } catch (err) {
                        let errorMessage = 'Ошибка при входе';
                        
                        if (err.response) {
                            errorMessage = err.response.data?.message || 
                                         err.response.statusText || 
                                         `Ошибка ${err.response.status}`;
                        } else if (err.request) {
                            errorMessage = 'Сервер не отвечает. Проверьте подключение.';
                        }
                        
                        setErrors({ submit: errorMessage });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} className={className} {...rest}>
                        <div className="form-group mb-3">
                            <input
                                className={`form-control ${touched.username && errors.username ? 'is-invalid' : ''}`}
                                placeholder="Имя пользователя"
                                name="username"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="text"
                                value={values.username}
                            />
                            {touched.username && errors.username && (
                                <small className="text-danger form-text">{errors.username}</small>
                            )}
                        </div>

                        <div className="form-group mb-4">
                            <input
                                className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                                placeholder="Пароль"
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="password"
                                value={values.password}
                            />
                            {touched.password && errors.password && (
                                <small className="text-danger form-text">{errors.password}</small>
                            )}
                        </div>

                        {errors.submit && (
                            <Col sm={12}>
                                <Alert variant="danger">{errors.submit}</Alert>
                            </Col>
                        )}

                        <Row>
                            <Col mt={2}>
                                <Button
                                    className="btn-block"
                                    disabled={isSubmitting}
                                    size="lg"
                                    type="submit"
                                    variant="primary"
                                >
                                    {isSubmitting ? 'Вход...' : 'Войти'}
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