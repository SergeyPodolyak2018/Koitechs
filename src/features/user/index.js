import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import {selectUsers, getUsers} from "../search/searchSlice";
import styles from './user.module.css';
import {UserCard} from '../../component/userCard'
import Spinner from 'react-bootstrap/Spinner';



export function User() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const users = useSelector(selectUsers);
  const {name} = useParams();



  useEffect(() => {
    if(!users[name]){
      dispatch(getUsers(name))
        .then((data)=>{
          if(!data.error){
            setLoading(false);
          }else{
            setError(true);
            setLoading(false);
          }
        })
    }else{setLoading(false);}
  }, [])

  const getsomeUser=()=>{
    if(!error){
      return <UserCard element={users[name]}/>
    }else{
      return <div>error</div>
    }
  }



  return (
    <div className={styles.usersContainer}>

      {!loading
        ?getsomeUser()
        :<Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      }

    </div>
  )
}


