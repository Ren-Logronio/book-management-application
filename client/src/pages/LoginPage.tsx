import Switch from '@mui/material/Switch';
import { RootState, useAppDispatch } from '../app/store';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Credentials, userLogin } from '../slices/AuthSlice';
import { useState } from 'react';

function LoginPage(){
    const [isStudent, setIsStudent] = useState(true);
    const { error, user } = useSelector((state: RootState) => state.auth);
    const { handleSubmit } = useForm();
    const dispatch = useAppDispatch();

    const login = (data: any) => {
        var user: Credentials = {
            email: data.email,
            password: data.password,
        };
        dispatch(userLogin(user));
    };

    return (
        <div className='signin-container'>
            <div className="border border-1 rounded rounded-2 p-3 d-flex flex-column">
                <a className='position-fixed btn text-black p-2 d-flex justify-content-center align-content-center' href='/'>
                <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><rect fill="none" height="24" width="24"/><g><polygon points="17.77,3.77 16,2 6,12 16,22 17.77,20.23 9.54,12"/></g></svg>
                </a>
                <img src='/logo.png' className='align-self-center' style={{height: "45px", width: "45px"}} />
                <h2 className="h5 fw-bold text-center">Book Management Application</h2>
                <hr/>
                <div className="d-flex flex-row mb-2 px-2">
                    <p className='text-end m-0 w-100 fw-thin h-5 align-self-center'>I am not a student</p>
                    <Switch onChange={() => setIsStudent(!isStudent)} color="primary" />
                </div>
                <div className="text-danger fw-semibold px-2"><p className='text-center'>{ error ? "Error Occured" : "" }</p></div>
                <form className='pt-0 p-2' onSubmit={handleSubmit(login)}>
                    
                    <div className="">
                        <label htmlFor="email"><b>{isStudent?"Student Email":"Work Email"}</b></label>
                        <input className='form-control mb-3' type="text" placeholder={isStudent?"Enter Student Email":"Enter Work Email"} name="email" required/>
                        <label htmlFor="password"><b>Password</b></label>
                        <input className='form-control mb-3' type="password" placeholder="Enter Password" name="password" required/>
                    </div>
                    <button type='submit' className="btn btn-outline-success w-100 mb-3">Log In</button>
                </form>
                <div className='text-light-emphasis'>
                    <p className="text-center fw-medium fst-italic">Don't have an account? Forgot password? Contact the Librarian</p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;