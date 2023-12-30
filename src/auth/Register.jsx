import React, { useState } from 'react'
import './auth.css'

import axios from 'axios'
import joi from 'joi'
import { useNavigate } from 'react-router-dom'
const Register = () => {
    let Navigate = useNavigate();
    const [error, setError] = useState("")
    const [errorList, setErrorList] = useState([])
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });

    function getUserData(e) {
        let myuser = { ...user };
        myuser[e.target.name] = e.target.value;
        setUser(myuser)

    }
    // https://crud99-z2cf.onrender.com
    async function sendUserData() {
        try {
            let { data } = await axios.post(`https://crud99-z2cf.onrender.com/signUp`, user);

            if (data.message === "success") {
                Navigate("/login")
              
            } else {
                setLoading(false)
                setError(data.message)

            }
        } catch (err) {
            console.log("Error = " + err)
        }

    }
    function submitRegister(e) {
        e.preventDefault();
        setLoading(true);

        let validation = validateRegisterForm();

        if (validation.error) {
            setErrorList(validation.error.details);
            setLoading(false)
        }
        else {
            sendUserData();
        }

    }

    function validateRegisterForm() {
        let schema = joi.object({
            name: joi.string().min(3).max(10).required(),
            email: joi.string().email({ tlds: { allow: ['com', 'net'] } }),
            password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),

        })
        return schema.validate(user, { abortEarly: false })
    }


    return (
        <>

            <form onSubmit={submitRegister} className="from-Register  w-75 ms-auto my-5">
                {error ? <p className='w-75 alert alert-danger text-danger'>{error} </p> : ""}
                {errorList.map((error, i) => {
                    if (error.context.label === 'password') {
                        return <p key={i} className='w-75 p-2 alert alert-danger text-danger'>The password is weak and must not be less than five numbers </p>
                    } else {
                        return <p key={i} className='w-75 p2 alert alert-danger text-danger'>{error.message} </p>

                    }
                })}
                <h4> Registeration From</h4>


                <label htmlFor='first_name' className='text-Rgister my-2'>Name :</label>
                <input type='text' id='first_name' className='my-input form-control w-75' name='name' onChange={getUserData} />

                <label htmlFor='Email' className='text-Rgister my-2'>Email :</label>
                <input type='email' id='Email' className='my-input form-control w-75' name='email' onChange={getUserData} />


                <label htmlFor='password' className='text-Rgister my-2'>Password :</label>
                <input type='password' id='password' className='my-input form-control w-75' name='password' onChange={getUserData} />

                <button type='submit' className='btn btn-outline-info my-4'>{loading ? <i className='fas fa-spinner fa-spin'></i> : 'Register'}</button>
                <h6 className='text-blue' onClick={()=>  Navigate("/login") }>I have an account  </h6>

            </form>

        </>
    )
}

export default Register