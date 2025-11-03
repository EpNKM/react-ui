import React, { useState } from 'react';
import CardGroup from 'react-bootstrap/CardGroup';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown,ProgressBar } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import myImageE from '../../../assets/images/Excel/Excel.png';
import myImageW from '../../../assets/images/Word/Word.png';
import myImageP from '../../../assets/images/PowerPoint/PowerPoint.png';

function GroupExample() {
  const history = useHistory();
  return (
    <CardGroup>
      <Card className="text-white">
        <Card.Img variant="top" src={myImageE}/>
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
      <Card className="text-white">
        <Card.Img variant="top" src={myImageW}/>
        <Card.ImgOverlay>
          <Card.Title>Курс 2 Word</Card.Title>
          <Card.Text>
          Базовые навыки владения word
          </Card.Text>
          <Button variant="primary">Перейти к курсу</Button>
        </Card.ImgOverlay>
        <Card.Footer>
         <ProgressBar variant="primary" now={60} />
        </Card.Footer>
      </Card>
      <Card className="text-white">
        <Card.Img variant="top" src={myImageP}/>
        <Card.ImgOverlay>
          <Card.Title>Курс 3 PowerPoint</Card.Title>
          <Card.Text>
          Базовые навыки владения powerpoint
          </Card.Text>
          <Button variant="danger">Перейти к курсу</Button>
        </Card.ImgOverlay>
        <Card.Footer>
         <ProgressBar variant="danger" now={60} />
        </Card.Footer>
      </Card>
    </CardGroup>
  );
}

export default GroupExample;