import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Spinner from "react-bootstrap/Spinner";

import {getLanguges, selectLanguages} from "../../features/search/searchSlice";
import ListGroup from "react-bootstrap/ListGroup";
import {Bar} from "../bar";
import Table from "react-bootstrap/Table";

export function Languages(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const languges = useSelector(selectLanguages);

  useEffect(() => {

    const {reposUrl, login} = props;
    if(!languges[login]){
      dispatch(getLanguges({login, reposUrl}))
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


  return (
    <ListGroup className="list-group-flush">
      {loading
        ?<Spinner animation="border" role="status" style={{margin:'20px auto'}}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      :<Table striped bordered hover size="sm">
          <thead>
          <tr>
            <th>Name</th>
            <th>%</th>
          </tr>
          </thead>
          <tbody>
          {languges[props.login].map((el,i)=>{
            return <tr key={i}>
              <td style={{width:'50%'}}>{el.name}</td>
              <td>
                <Bar percent={el.percents}/>
              </td>
            </tr>
          })}
          </tbody>
        </Table>
        }
    </ListGroup>
  )
}
