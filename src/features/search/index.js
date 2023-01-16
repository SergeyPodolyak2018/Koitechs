import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import styles from './serch.module.css';

import { useNavigate } from "react-router-dom";


export function Search() {
  const navigate = useNavigate();

  const openUser = (e)=>{
    const name = e.nativeEvent.target.elements[0].value.replace(' ','');
    navigate(`/user/${name}`);
  }

  return (
    <div className={styles.container}>
      <Form onSubmit={(e)=>{openUser(e)}} className={styles.subContainer}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Please enter Github account name</Form.Label>
          <Form.Control type="text" name='name' placeholder="Enter account name" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}


