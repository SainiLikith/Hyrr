
import React, { useState } from 'react';
// import { validator } from "express-validator";
import * as Yup from "yup";
import axios from "axios";

const Form = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');
  // Validation schema
  const formSchema = Yup.object().shape({
    userName: Yup.string()
      .min(4, "Username must be at least 4 characters long")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid Email address")
      .required("Email is Required"),
    password: Yup.string()
      .min(8, "Password should have minimum of 8 characters")
      .matches(/(?=.*\d)(?=.*[!@#$%^&*])/, "Must contain a number and a special character")
      .required("Please enter your Password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords do not match'),
    agreeTerms: Yup.boolean().oneOf([true], 'Agree Terms is required')
  })

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await formSchema.validate(formData, { abortEarly: false })
      console.log("Form Submited", formData);
    } catch (error) {
      const newError = {};
      error.inner.forEach((err) => { newError[err.path] = err.message });
      setErrors(newError)
    }
    const res = await axios.post('http://localhost:9000/form', formData);
    if (res.data.status === 'success') {
      setResponseMessage(res.data.msg);
    } else {
      alert(res.data.msg);
    }
  }
  const handleChange = (e) => {
    e.preventDefault(e);
    setErrors('');
    let key = e.target.name;
    let value = e.target.value;
    setFormData({ ...formData, [key]: value });
  };

  return (
    <div className="container">
      <div className="loginbox">
        <img
          src="https://tse1.mm.bing.net/th?id=OIP.Vzu9LsVapjfVOcPQ0YolxgHaHa&pid=Api&P=0&h=220"
          className="avatar"
        />
        <form onSubmit={onSubmit} >
          <h1>SignUp</h1>
          <p>UserName:</p>
          <input type="text" name="userName" placeholder="User First Name" onChange={handleChange} value="likith" />
          {errors.userName && <div>{errors.userName}</div>}
          {/* <p>Last Name:</p>
            <input type="text" name="Last name" placeholder="User Last Name" /> */}
          <p>E-mail Id:</p>
          <input type="email" name="email" placeholder="User Email" onChange={handleChange} value="likith@gmail.com" />
          {errors.email && <div>{errors.email}</div>}
          <p>Password:</p>
          <input type="Password" name="password" placeholder="User Password" onChange={handleChange} value="Likith@9959" />
          {errors.password && <div>{errors.password}</div>}
          <p>Confirm Password:</p>
          <input type="Password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} value="Likith@9959" />
          {errors.confirmPassword && <div>{errors.confirmPassword}</div>}
          <input type="submit" defaultValue="SignUp" />
        </form>
        <div id="agreeTerms" style={{ display: 'flex', msFlex: "auto", justifyContent: "center" }}>
          <input type="checkbox" name="agreeTerms" value="true" />
          <p>Agree the terms and conditions</p>
        </div>
      </div>
    </div>
  )
}

export default Form;