import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import {getRepos, selectRepos} from "../../features/search/searchSlice";
import React, {useEffect, useState} from "react";
import {RepoCard} from "../repoCard"
import Spinner from "react-bootstrap/Spinner";
import {Languages} from "../languageCard";
import {prepareLanguages} from "../../helper"

export function UserCard(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const repos = useSelector(selectRepos);


  useEffect(() => {

    const {login, repos_url:url} = props.element;
    if(!repos[login]){
      dispatch(getRepos({login, url}))
        .then((data)=>{
          if(!data.error){
            setLoading(false);
          }else{
            setError(true);
            setLoading(false);
          }
        })
    }else{setLoading(false);}
  }, []);


  const backToSearch = ()=>{
    navigate('/');
  }

  return (
    <Card
          style={{ width: '30rem', margin:'20px' }}
          bg={'light'}
          text={'dark'}>
      <Card.Img variant="top" src={props.element.avatar_url} style={{width:'20%', margin: '10px'}}/>
      <Card.Body>
        <Card.Title>{props.element.login}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{props.element.name}</Card.Subtitle>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Location: {props.element.location || 'unknown'}</ListGroup.Item>
        <ListGroup.Item>Email: {props.element.email || 'unknown'}</ListGroup.Item>
      </ListGroup>
      <Card.Header>Languages</Card.Header>
      {!loading?<Languages reposUrl={prepareLanguages(repos[props.element.login])} login={props.element.login}/>:<Spinner animation="border" role="status" style={{margin:'20px auto'}}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>}
      <Card.Header>Repositories</Card.Header>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          {!loading
            ?<RepoCard repos={repos[props.element.login]}/>
            :<Spinner animation="border" role="status" style={{margin:'20px auto'}}>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          }
        </ListGroup.Item>
      </ListGroup>


      <Card.Body>
        <Button variant="primary" onClick={backToSearch}>Back to search</Button>
      </Card.Body>
    </Card>
  )
}
