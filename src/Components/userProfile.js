/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useState } from "react"
import { userDetail } from '../App' 
import { findOneUserService } from './Service/service'
import { updateUserService } from './Service/service'
import { Formik, Form } from 'formik';
import * as yup from 'yup';

const userDetails = () => {
    const [user ,  setUser ] = useState({
        _id : "" , usr_image : File , usr_firstname : "" , usr_lastname : ""  , usr_dob: "",
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
    const validate = yup.object({
        usr_firstname: yup.string().required('FirstName is require'),
        usr_lastname: yup.string().required('lastName is require'),
        usr_email: yup.string().email('must be email').required('Email is require'),
        usr_phone: yup.number('must be number').required('Number is require').min(5,'min 5 number is require'),
        usr_dob:  yup.string().required('DOB is require'),
        usr_password: yup.string().min(5,'min 5 number is require').required('Password is require')
      })
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
        
        updateUserService(state,values).then((result) => {
            console.log(result)
        }).catch((e) => {
            console.log(e)
          })
            alert(JSON.stringify(values, null, 2))
        }}
    >
      {formik => (
        
          <Form>
          <h3>Edit User Detail</h3>
        <div class="image-upload">
            <label for="file-input"> Image  </label> 
            <input type="file"     
                id='file-input' 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name='usr_image'
                value={user.usr_image}
                className="form-control" />
                {formik.touched.usr_image && formik.errors.usr_image ? <div className='error'>{formik.errors.usr_image}</div>  : null}
        </div>
        <div className="form-group">
            <label>First name</label>
            <input type="text" 
                onChange={formik.handleChange}
                value={user.usr_firstname}
                name='usr_firstname'
                onBlur={formik.handleBlur}
                className="form-control" 
                placeholder="First name" />
                {formik.touched.usr_firstname && formik.errors.usr_firstname ? <div className='error'>{formik.errors.usr_firstname}</div> : null}
        </div>

        <div className="form-group">
            <label>Last name</label>
            <input type="text"
                    onChange={formik.handleChange}
                    name='usr_lastname' 
                    value={user.usr_lastname}
                    onBlur={formik.handleBlur}
                    className="form-control" 
                    placeholder="Last name" />
                {formik.touched.usr_lastname && formik.errors.usr_lastname ? <div className='error'>{formik.errors.usr_lastname}</div> : null}
        </div>

        <div className="form-group">
            <label>Email address</label>
            <input type="email" 
                    onChange={formik.handleChange}
                    name='usr_email'
                    onBlur={formik.handleBlur}
                    value={user.usr_email}
                    className="form-control" 
                    placeholder="Enter email" />
                {formik.touched.usr_email && formik.errors.usr_email ? <div className='error'>{formik.errors.usr_email}</div> : null}
        </div>

        <div className="form-group">
            <label>Mobile Number</label>
            <input type="text" 
                   name='usr_phone'
                   onBlur={formik.handleBlur}
                   value={user.usr_phone}
                   onChange={formik.handleChange}
                   className="form-control" 
                   placeholder="Mobile Number" />
                {formik.touched.usr_phone && formik.errors.usr_phone ? <div className='error'>{formik.errors.usr_phone}</div> : null}
        </div>

        <div className="form-group">
            <label>DOB</label>
            <input type="date" 
                   name='usr_dob'
                   onBlur={formik.handleBlur}
                   onChange={formik.handleChange}
                   className="form-control" 
                   value={user.usr_dob}
                   placeholder="Date Of Birth" />
                {formik.touched.usr_dob && formik.errors.usr_dob ? <div className='error'>{formik.errors.usr_dob}</div> : null}
        </div>

        <div className="form-group">
            <label>Password</label>
            <input  type="password" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={user.usr_password}
                    name='usr_password'
                    className="form-control" 
                    placeholder="Enter password" />
                {formik.touched.usr_password && formik.errors.usr_password ? <div className='error'>{formik.errors.usr_password}</div> : null}
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

export default userDetails