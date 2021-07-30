/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useState } from "react"
import { findOneUserService } from "./Service/service";
import { userDetail } from '../App' 
import axios, * as others from 'axios';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

const Detail = () => {
    const validate = yup.object({
        usr_firstname: yup.string().required('FirstName is require'),
        usr_lastname: yup.string().required('lastName is require'),
        usr_email: yup.string().email('must be email').required('Email is require'),
        usr_phone: yup.number('must be number').required('Number is require').min(5,'min 5 number is require'),
        usr_dob:  yup.string().required('DOB is require'),
        usr_password: yup.string().min(5,'min 5 number is require').required('Password is require')
      })
    const [user ,  setUser ] = useState({
        _id : "" , usr_firstname : "" , usr_lastname : "" , usr_email : "" , usr_dob: "",
        usr_phone : "" , usr_password : "" 
    })
    const { state , dispatch } = useContext(userDetail);

    findOneUserService(state).then((result) => {
        const data = result
        if(data.status === 200) {
            setUser(data.data)
        } else {
            console.log('some error')
        }
    }).catch((e) => {
        console.log(e);
    })

    useEffect(() => {
        findOneUserService(state)
    },[])
    return (
        <Formik
      initialValues={{
        usr_firstname: '',
        usr_lastname: '',
        usr_email: '',
        usr_phone: '',
        usr_dob:  '',
        usr_password: ''
      }}
      validationSchema={validate}
      onSubmit={values => {
        axios.post(`/login`,{values}).then((result) => {
            console.log(result)
        }).catch((e) => {
            console.log(e)
        })
      alert(JSON.stringify(values, null, 2))
            }}
    >
      {formik => (
        
          <Form>
          <h3>Sign Up</h3>
          <div className="form-group">
          <label>First name</label>
          <input type="text"
          className="form-control" 
              name='usr_firstname'
              value={user.usr_firstname}
              readOnly
              placeholder="First name" />
      </div>

      <div className="form-group">
          <label>Last name</label>
          <input type="text"
                  name='usr_lastname'
                  value={user.usr_lastname}
                  className="form-control" 
                  readOnly
                  placeholder="Last name" />
                  {formik.touched.usr_lastname && formik.errors.usr_lastname ? <div className='error'>{formik.errors.usr_lastname}</div>  : null}

      </div>

      <div className="form-group">
          <label>Email address</label>
          <input type="email"
                  name='usr_email'
                  value={user.usr_email}
                  className="form-control" 
                  readOnly
                  placeholder="Enter email" />
      </div>

      <div className="form-group">
          <label>Mobile Number</label>
          <input type="number" 
                 className="form-control" 
                 name="usr_phone"
                 value={user.usr_phone}
                 readOnly
                 placeholder="Mobile Number" />
      </div>

      <div className="form-group">
          <label>DOB</label>
          <input type="date" 
                 className="form-control" 
                 name='usr_dob'
                 value={user.usr_dob}
                 readOnly
                 placeholder="Date Of Birth" />
      </div>

      <div className="form-group">
          <label>Password</label>
          <input  type="password" 
                  name="usr_password"
                  value={user.usr_password}
                  className="form-control" 
                  readOnly
                  placeholder="Enter password" />
      </div>

        <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
            <p className="forgot-password text-right">
            Already registered <a href="#">sign in?</a>
         </p>
          </Form>
      )}
    </Formik>
    )
}

export default Detail