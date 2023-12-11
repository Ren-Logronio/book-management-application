import React, { useContext, useState } from 'react'
import './Signin.css'
import axios from 'axios'
import { AuthContext } from '../Context/AuthContext.js'
import Switch from '@material-ui/core/Switch'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


function Signin() {
    const [isStudent, setIsStudent] = useState(true)
    const [admissionId, setAdmissionId] = useState()
    const [employeeId,setEmployeeId] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState("")
    const { dispatch } = useContext(AuthContext)

    const API_URL = process.env.REACT_APP_API_URL
    
    const loginCall = async (userCredential, dispatch) => {
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post(API_URL+"api/auth/signin", userCredential);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        }
        catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err })
            setError("Wrong Password or Id")
        }
    }

    const handleForm = (e) => {
        e.preventDefault()
        isStudent
        ? loginCall({ admissionId, password }, dispatch)
        : loginCall({ employeeId, password }, dispatch)
    }

    return (
        <div className='signin-container'>
            <div className="border border-1 rounded rounded-2 p-3 d-flex flex-column">
                <a className='position-fixed btn text-black p-2 d-flex justify-content-center align-content-center' href='/'>
                    <ArrowBackIosIcon/>
                </a>
                <img src='/logo.png' className='align-self-center' style={{height: "45px", width: "45px"}} />
                <h2 className="h5 fw-bold text-center">Book Management Application</h2>
                <form className='pt-0 p-2' onSubmit={handleForm}>
                    <hr/>
                    <div className="d-flex flex-row mb-2">
                        <p className='text-end m-0 w-100 fw-thin h-5 align-self-center'>I am not a student</p>
                        <Switch
                            onChange={() => setIsStudent(!isStudent)}
                            color="primary"
                        />
                    </div>
                    <div className="error-message"><p>{error}</p></div>
                    <div className="">
                        <label htmlFor={isStudent?"admissionId":"employeeId"}> <b>{isStudent?"Student ID":"Employee ID"}</b></label>
                        <input className='form-control mb-3' type="text" placeholder={isStudent?"Enter Student ID":"Enter Employee ID"} name={isStudent?"admissionId":"employeeId"} required onChange={(e) => { isStudent?setAdmissionId(e.target.value):setEmployeeId(e.target.value) }}/>
                        <label htmlFor="password"><b>Password</b></label>
                        <input className='form-control mb-3' type="password" minLength='6' placeholder="Enter Password" name="psw" required onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                    <button type='submit' className="btn btn-outline-success w-100 mb-3">Log In</button>
                </form>
                <div className='text-light-emphasis'>
                    <p className="text-center fw-medium fst-italic">Don't have an account? Forgot password? Contact the Librarian</p>
                </div>
            </div>
        </div>
    )
}

export default Signin