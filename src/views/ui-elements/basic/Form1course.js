import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // Импортируем axios
import { API_SERVER } from './../../../config/constant';

const Example = () => {
  const [result, setResult] = useState(null); // Инициализация состояния для результата

  return (
    <div className="container mt-5">
      <h1>С чем работает Excel?</h1>
      <Formik
        initialValues={{
          picked: '',
        }}
        validate={values => {
          const errors = {};
          if (!values.picked) {
            errors.picked = 'Пожалуйста, выберите один из вариантов.';
          }
          return errors;
        }}
        onSubmit={async (values) => {
          try {
            // Отправка данных на сервер с помощью axios
            const response = await axios.post(API_SERVER +'check_answer', values, {
              headers: {
                'Content-Type': 'application/json',
              },
            });

            // Установка результата в состояние
            setResult(response.data);
            
            // Вывод результата в консоль
            console.log(JSON.stringify(response.data, null, 2));
          } catch (error) {
            console.error('Ошибка при отправке данных:', error);
          }
        }}
      >
        {({ values }) => (
          <Form>
            <div className="form-group">
              <label id="my-radio-group">Варианты ответа:</label>
              <div role="group" aria-labelledby="my-radio-group">
                <div className="form-check">
                  <Field type="radio" name="picked" value="Таблица" className="form-check-input" />
                  <label className="form-check-label">Таблица</label>
                </div>
                <div className="form-check">
                  <Field type="radio" name="picked" value="Текстовый документ" className="form-check-input" />
                  <label className="form-check-label">Текстовый документ</label>
                </div>
                <div>Выбрано: {values.picked}</div>
              </div>

              {/* Отображение ошибки */}
              <ErrorMessage name="picked" component="div" className="text-danger mt-2" />
            </div>

            <button type="submit" className="btn btn-primary">Подтвердить</button>
          </Form>
        )}
      </Formik>

      {/* Отображение результата на странице */}
      {result && (
        <div className="mt-4">
          <h3>Результат:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Example;