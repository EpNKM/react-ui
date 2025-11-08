import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
    const history = useHistory();

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
                    password: Yup.string().required('Требуется пароль')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        const response = await axios.post(`${API_SERVER}/api/auth/login`, {
                            email: values.email,
                            password: values.password
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
                                    email: values.email,
                                    username: response.data.user?.username || values.email.split('@')[0]
                                },
                                token: response.data.token
                            };

                            dispatch({ type: ACCOUNT_INITIALIZE, payload: userData });
                            localStorage.setItem('authToken', response.data.token);
                            
                            if (scriptedRef.current) {
                                setStatus({ success: true });
                                setSubmitting(false);
                                history.push('/dashboard'); 
                            }
                        } else {
                            throw new Error('Отсутствует токен в ответе');
                        }
                    } catch (err) {
                        let errorMessage = 'Ошибка при входе';
                        if (err.response) {
                            errorMessage = err.response.data?.message || 
                                         err.response.data ||
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
                        {/* Email */}
                        <div className="form-group mb-3">
                            <input
                                className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                                placeholder="Электронная почта"
                                name="email"
                                type="email"
                                value={values.email}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            {touched.email && errors.email && (
                                <small className="text-danger form-text">{errors.email}</small>
                            )}
                        </div>

                        {/* Password */}
                        <div className="form-group mb-4">
                            <input
                                className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                                placeholder="Пароль"
                                name="password"
                                type="password"
                                value={values.password}
                                onBlur={handleBlur}
                                onChange={handleChange}
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