import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import Excel1 from '../../../assets/images/Excel/Excelnum1.jpg';
import Excel2 from '../../../assets/images/Excel/Excelnum2.jpg';
import Excel3 from '../../../assets/images/Excel/Excelnum3.jpg';
import Excel4 from '../../../assets/images/Excel/Excelnum4.jpg';
import Excel5 from '../../../assets/images/Excel/Excelnum5.jpg';

const ExcelGuide = () => {
  const history = useHistory();
  return (
    <Container style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 className="text-center">Как работать в Excel</h1>
      <p className="text-center">Узнайте основные функции и возможности Microsoft Excel.</p>
      <p>Microsoft Excel -  программа для работы с электронными таблицами, созданная корпорацией Microsoft для Windows.</p>
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Img variant="top" src={Excel1} />
            <Card.Body>
              <Card.Title>Шаг 1: Открытие Excel</Card.Title>
              <Card.Text>
                Запустите Microsoft Excel. Вы можете найти его в меню «Пуск» или на рабочем столе.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Img variant="top" src={Excel2} />
            <Card.Body>
              <Card.Title>Шаг 2: Создание новой таблицы</Card.Title>
              <Card.Text>
                Выберите «Новая книга» для создания пустой таблицы или выберите шаблон из предложенных.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Img variant="top" src={Excel3}/>
            <Card.Body>
              <Card.Title>Шаг 3: Ввод данных</Card.Title>
              <Card.Text>
                Кликните на ячейку и начните вводить данные. Нажмите «Enter», чтобы перейти к следующей ячейке.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card>
          <Card.Img variant="top" src={Excel4}/>
            <Card.Body>
              <Card.Title>Шаг 4: Использование формул</Card.Title>
              <Card.Text> 
                Для выполнения расчетов используйте формулы. Например, введите =СУММ(A2:A10) для суммирования значений в диапазоне A2:A10.
              </Card.Text> 
            </Card.Body> 
          </Card> 
        </Col> 
      </Row>

      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Img variant="top" src={Excel5}/>
            <Card.Body>
              <Card.Title>Шаг 5: Форматирование данных</Card.Title>
              <Card.Text> 
                Выделите ячейки и используйте панель инструментов для изменения шрифта, цвета и стиля ячеек. При наведении курсором на иконку всплывает подсказка.
              </Card.Text> 
            </Card.Body> 
          </Card> 
        </Col> 
      </Row>

      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Шаг 6: Создание графиков</Card.Title>
              <Card.Text> 
                Выделите данные и выберите вкладку «Вставка», чтобы создать график или диаграмму.
              </Card.Text> 
            </Card.Body> 
          </Card> 
        </Col> 
      </Row>

      {/* Добавляем дополнительные шаги */}
      
      {/* Шаг 7 */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Шаг 7: Сохранение файла</Card.Title>
              <Card.Text> 
                Нажмите «Файл» -- «Сохранить как», чтобы сохранить вашу работу. Выберите место и формат файла (например, .xlsx).
              </Card.Text> 
            </Card.Body> 
          </Card> 
        </Col> 
      </Row>

      {/* Шаг 8 */}
      <Row className="mb-4">
        <Col >
          < Card >
            < Card.Body >
              < Card.Title > Шаг 8: Печать документа</ Card.Title >
              < Card.Text >
                Чтобы распечатать документ, нажмите «Файл» -- «Печать». Настройте параметры печати и нажмите «Печать».
              </ Card.Text >
            </ Card.Body >
          </ Card >
        </ Col >
      </ Row >

      {/* Шаг 9 */}
      {/* Добавляем дополнительные шаги */}
      {/* Шаг 9 */}
      {/* Шаг 9 */}
      {/* Шаг 9 */}
      
      


<Row className="mb-4">
<Col >
<Card >
<Card.Body >
<Card.Title > Шаг 9: Использование фильтров и сортировки</ Card.Title >
<Card.Text >
Используйте фильтры для упрощения анализа данных. Выделите заголовки столбцов и выберите «Данные» -- «Фильтр».
</ Card.Text >
</ Card.Body >
</ Card >
</ Col >
</ Row >

{/* Шаг 10 */}
<Row className="mb-4">
<Col >
<Card >
<Card.Body >
<Card.Title > Шаг 10: Защита документа паролем</ Card.Title >
<Card.Text >
Чтобы защитить файл паролем, нажмите «Файл» -- «Защитить книгу» -- «Задать пароль».
</ Card.Text >
</ Card.Body >
</ Card >
</ Col >
</ Row >

{/* Полезные советы */}
<h2 className="mt-5">Полезные советы:</h2>

<ul className="mb-4">
<li>Сохраняйте свою работу регулярно.</li>
<li>Используйте условное форматирование для выделения важных данных.</li>
<li>Изучите горячие клавиши для ускорения работы.</li></ul>

{/* Кнопка для перехода к тестированию или дополнительным ресурсам */}
<Button onClick={() => history.push('/basic/Form1cource')} variant="primary">Пройти тестирование</Button>

    </Container >
  );
};

export default ExcelGuide;