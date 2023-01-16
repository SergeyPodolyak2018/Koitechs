import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";



export function ErrorCard(props) {
  const navigate = useNavigate();

  const backToSearch = ()=>{
    navigate('/');
  }

  return (
    <Card
          style={{ width: '30rem', margin:'20px' }}
          bg={'light'}
          text={'dark'}>
      <Card.Body>
        <Card.Title>Unexpected error</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Try another account name</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Button variant="primary" onClick={backToSearch}>Back to search</Button>
      </Card.Body>
    </Card>
  )
}
