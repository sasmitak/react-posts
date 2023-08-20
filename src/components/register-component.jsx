import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import './register-component.css';
import { useState } from "react";
import * as yup from "yup";

export function Register() {

    const [personError , setPersonError] = useState('');
    const [persons , setPersons] = useState([]);
    const [theme, setTheme] = useState("bg-secondary text-white p-3");
    const [buttonTheme, setButtonTheme] = useState('btn btn-dark btn-rounded w-100');
    const navigate = useNavigate();

   

    const formik = useFormik({
        initialValues: {
            "UserName": "",
            "Password": "",
            "Age": 0,
            "Email": "",
            "Mobile": ""
        },
        validationSchema:yup.object({
            "UserName":yup.string()
                          .required("UserName Required")
                          .min(4,"Name Too Short")
                          .max(12,"Name Too Long"),
            "Password":yup.string()
                          .required("Password Required")
                          .matches(/(?=.*[A-Z])\w{4,8}$/ , "Password Must be 4 to 8 chars alpha numeric with atleast one uppercase letter."),
            "Age":yup.number()
                     .required("Age Required"),
            "Email":yup.string()
                       .required("Email Required"),
            "Mobile":yup.string()
                        .required("Mobile Number Required")
                        .matches(/\+91\d{10}/ , "Invalid Number - +91 with 10 digits")
        }),
        onSubmit: (values) => {
           /*
            axios({
                method: "post",
                url: "http://127.0.0.1:5000/registeruser",
                data: values
            })
           */
            alert(JSON.stringify(values));
            alert("Registered Successfully...");
            navigate("/login");
        },
        
       
    })

    function handleThemeChange(e) {
        if (e.target.checked) {
            setTheme('bg-dark text-white p-3');
            setButtonTheme('btn btn-primary btn-rounded w-100');
        } else {
            setTheme('bg-secondary text-white p-3');
            setButtonTheme('btn btn-dark btn-rounded w-100');
        }
    }

    function verifyUserName(e){
        axios({
            method:"get",
            url:"http://127.0.0.1:5000/users"
        })
        .then(response=>{
            setPersons(response.data);
            for(var person of persons){
                if(person.UserName === e.target.value){
                    setPersonError('UserName Taken - Try Another');
                    break;
                }else{
                    setPersonError('UserName Available');
                }
            }
        })
    }

    return (
        <div className="container-fluid">
            <div className="form-content" style={{ height: '600px' }}>
                <form className={theme} onSubmit={formik.handleSubmit}>
                    <div className="mt-1 mb-4 form-switch">
                        <input type="checkbox" onChange={handleThemeChange} className="form-check-input" />Dark Mode
                    </div>
                    <h3>Register User<span className="bi bi-person-fill text-success"></span></h3>
                    <dl>
                        <dt>UserName</dt>
                        <dd><input type="text" onKeyUp={verifyUserName} name="UserName" onChange={formik.handleChange} className="form-control mt-1" /></dd>
                        <dd className="text-info">{formik.errors.UserName}{personError}</dd>
                        <dt>Password</dt>
                        <dd><input type="password" name="Password" onChange={formik.handleChange} className="form-control mt-1" /></dd>
                        <dd className="text-info">{formik.errors.Password}</dd>
                        <dt>Age</dt>
                        <dd><input type="text" name="Age" onChange={formik.handleChange} className="form-control mt-1" /></dd>
                        <dd className="text-info">{formik.errors.Age}</dd>
                        <dt>Email</dt>
                        <dd><input type="email" name="Email" onChange={formik.handleChange} className="form-control mt-1" /></dd>
                        <dd className="text-info">{formik.errors.Email}</dd>
                        <dt>Mobile</dt>
                        <dd><input type="text" name="Mobile" onChange={formik.handleChange} className="form-control mt-1" /></dd>
                        <dd className="text-info">{formik.errors.Mobile}</dd>
                    </dl>
                    <button className={buttonTheme}>Register</button>
                    <div className="d-flex justify-content-between mt-2">
                        <p>Existing User ?</p>Login
                        <Link to="/login"><span className="bi bi-arrow-right-square-fill" style={{ fontSize: "20px" }}></span></Link>
                    </div>
                </form>
            </div>
        </div>
    )
}