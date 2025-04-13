import React, { useState } from 'react';
import CardGroup from 'react-bootstrap/CardGroup';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown,ProgressBar } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import myImage1 from '../../../assets/images/Excel/Excel.png';


function GroupExample() {
  const history = useHistory();
  return (
    <CardGroup>
      <Card className="text-white">
        <Card.Img variant="top" src={myImage1}/>
        <Card.ImgOverlay>
          <Card.Title>Курс 1 Excel</Card.Title>
          <Card.Text>
          Базовые навыки владения excel
          </Card.Text>
          <Button onClick={() => history.push('/basic/1course')} variant="success">Перейти к курсу</Button>
        </Card.ImgOverlay>
        <Card.Footer>
         <ProgressBar variant="success" now={60} />
        </Card.Footer>
      </Card>
      <Card>

        <Card.Body>
          <Card.Title>Курс 2</Card.Title>
          <Card.Text>
          Здесь скоро будет картинка с текстом{' '}
          </Card.Text>
          <Button variant="primary">Перейти к курсу</Button>
        </Card.Body>
        <Card.Footer>
        <ProgressBar now={60} />
        </Card.Footer>
      </Card>
      <Card>
        
        <Card.Body>
          <Card.Title>Курс 3</Card.Title>
          <Card.Text>
          Здесь скоро будет картинка с текстом
          </Card.Text>
          <Button variant="primary">Перейти к курсу</Button>
        </Card.Body>
        <Card.Footer>
        <ProgressBar now={60} />
        </Card.Footer>
      </Card>
    </CardGroup>
  );
}

export default GroupExample;