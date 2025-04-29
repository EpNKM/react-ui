import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Button, Alert, Row, Col } from 'react-bootstrap';
import { API_SERVER } from '../../../config/constant';
import { ACCOUNT_INITIALIZE } from '../../../store/actions';

const RestLogin = ({ className }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <Formik
            initialValues={{ username: '', password: '', submit: null }}
            validationSchema={Yup.object().shape({
                username: Yup.string().required('Требуется имя пользователя'),
                password: Yup.string().required('Требуется пароль')
            })}
            onSubmit={async (values, { setErrors, setSubmitting }) => {
                try {
                    const response = await axios.post(`${API_SERVER}auth/login`, {
                        Username: values.username,
                        PasswordHash: values.password
                    }, {
                        headers: { 'Content-Type': 'application/json' }
                    });

                    if (response.data.token) {
                        // Сохраняем токен
                        localStorage.setItem('authToken', response.data.token);
                        
                        // Устанавливаем данные пользователя (минимальный набор)
                        const userData = {
                            isLoggedIn: true,
                            user: {
                                username: values.username
                            },
                            token: response.data.token
                        };

                        dispatch({ type: ACCOUNT_INITIALIZE, payload: userData });
                        navigate('/dashboard');
                    }
                } catch (error) {
                    console.error('Login error:', error);
                    setSubmitting(false);
                    
                    if (error.response) {
                        // Ошибка от сервера
                        if (error.response.status === 401) {
                            setErrors({ submit: 'Неверное имя пользователя или пароль' });
                        } else {
                            setErrors({ submit: error.response.data.message || 'Ошибка сервера' });
                        }
                    } else {
                        setErrors({ submit: 'Не удалось подключиться к серверу' });
                    }
                }
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit} className={className}>
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`form-control ${touched.username && errors.username ? 'is-invalid' : ''}`}
                            placeholder="Имя пользователя"
                        />
                        {touched.username && errors.username && (
                            <div className="invalid-feedback">{errors.username}</div>
                        )}
                    </div>

                    <div className="form-group mb-4">
                        <input
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                            placeholder="Пароль"
                        />
                        {touched.password && errors.password && (
                            <div className="invalid-feedback">{errors.password}</div>
                        )}
                    </div>

                    {errors.submit && (
                        <Alert variant="danger" className="mb-4">
                            {errors.submit}
                        </Alert>
                    )}

                    <Row>
                        <Col>
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={isSubmitting}
                                block
                            >
                                {isSubmitting ? 'Вход...' : 'Войти'}
                            </Button>
                        </Col>
                    </Row>
                </form>
            )}
        </Formik>
    );
};

export default RestLogin;