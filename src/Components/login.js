/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { React, useContext } from "react";
import { Formik, Form } from 'formik';
import axios, * as others from 'axios';
import {userDetail} from '../App' 
import * as yup from 'yup';
import {loginService} from "./Service/service"
const login = () => {
    const {state , dispatch } = useContext(userDetail);
      const validate = yup.object({
        usr_email: yup.string().email('must be Email').required('required email'),
        usr_password: yup.string().required('requires password').min(3,'min 3 is required') 
      })

  return (
   
    <Formik
      initialValues={{
        usr_email: '',
        usr_password : ""
      }}
      validationSchema={validate}
      onSubmit={values => {
        
        loginService(values).then((result) => {
            const data = result
                        if(data.status === 200) {
                          const userId = data.data._id
                          dispatch({type : "USER_ID", payload : userId })
                        }
                    }).catch((e) => {
                        console.log(e)
                    })
                    alert(JSON.stringify(values, null, 2))
             }}
    >
      {formik => (
        
          <Form>
          <h3>Sign In</h3>
      
          <div className="form-group">
              <label>Email address</label>
              <input  type="email" 
                      className="form-control" 
                      placeholder="Enter email" 
                      name='usr_email'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur} 
                      value={formik.values.usr_email } />
                      {formik.touched.usr_email && formik.errors.usr_email ? <div className='error'>{formik.errors.usr_email}</div> : null}
      
          </div>
      
          <div className="form-group">
              <label>Password</label>
              <input  type="password" 
                      className="form-control" 
                      placeholder="Enter password" 
                      name='usr_password'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur} 
                      value={formik.values.usr_password } />
                      {formik.touched.usr_password && formik.errors.usr_password ? <div className='error'>{formik.errors.usr_password}</div> : null}
                  </div>
      
          <div className="form-group">
              <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="customCheck1" />
                  <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
              </div>
          </div>
      
          <button type="submit" className="btn btn-primary btn-block">Submit</button>
          <p className="forgot-password text-right">
              Forgot <a href="#">password?</a>
          </p>
          </Form>
      )}
    </Formik>     
    );
}

export default login;


// <form onSubmit={formik.handleSubmit} >
// <h3>Sign In</h3>

// <div className="form-group">
//     <label>Email address</label>
//     <input  type="email" 
//             className="form-control" 
//             placeholder="Enter email" 
//             name='usr_email'
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur} 
//             value={formik.values.usr_email } />
//             {formik.touched.usr_email && formik.errors.usr_email ? <div className='error'>{formik.errors.usr_email}</div> : null}

// </div>

// <div className="form-group">
//     <label>Password</label>
//     <input  type="password" 
//             className="form-control" 
//             placeholder="Enter password" 
//             name='usr_password'
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur} 
//             value={formik.values.usr_password } />
//             {formik.touched.usr_password && formik.errors.usr_password ? <div className='error'>{formik.errors.usr_password}</div> : null}
//         </div>

// <div className="form-group">
//     <div className="custom-control custom-checkbox">
//         <input type="checkbox" className="custom-control-input" id="customCheck1" />
//         <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
//     </div>
// </div>

// <button type="submit" className="btn btn-primary btn-block">Submit</button>
// <p className="forgot-password text-right">
//     Forgot <a href="#">password?</a>
// </p>
// </form>

