import Switch from '@mui/material/Switch';
import { Alert } from 'react-bootstrap';
import  { Navigate, useSearchParams } from 'react-router-dom';
import { RootState, useAppDispatch } from '../app/store';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Credentials, userLogin, userLogout } from '../slices/AuthSlice';
import { useState, useEffect } from 'react';


function LoginPage(){
    const [ isStudent, setIsStudent ] = useState(true);
    const { register, handleSubmit } = useForm<Credentials>();
    const { error, user, token, success, message } = useSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const logout = searchParams.get('logout');

    const login = (data: any) => {
        var user: Credentials = {
            email: data.email,
            password: data.password,
            type: data.type ? "librarian" : "student",
        };
        dispatch(userLogin(user));
    };

    useEffect(() => {
        if(logout != null) {
            if (user && token) {
                dispatch(userLogout());
            }
            searchParams.delete('logout');
            setSearchParams(searchParams);
        } 
    }, [searchParams, setSearchParams, logout]);

    if( user && token ) {
        return(
            <Navigate replace to='/dashboard' />
        )
    };

    return (
        <div className='container min-vh-100 align-self-center container-fluid px-0 px-md-5 px-md-lg-5 d-flex flex-column justify-content-center'>
            <div className='d-flex flex-row justify-content-center'>
                <div style={{width: '500px'}} className="border border-1 align-self-center rounded rounded-2 mx-0 mx-md-5 p-3 d-flex flex-column">
                    <a className='position-fixed btn text-black p-2 d-flex justify-content-center align-content-center' href='/'>
                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><rect fill="none" height="24" width="24"/><g><polygon points="17.77,3.77 16,2 6,12 16,22 17.77,20.23 9.54,12"/></g></svg>
                    </a>
                    <img src='/logo.png' className='align-self-center' style={{height: "45px", width: "45px"}} />
                    <h2 className="h5 fw-bold text-center">Book Management Application</h2>
                    <hr/>
                    { error ? <Alert key='danger' variant='danger'>{error}</Alert> : "" }
                    <form className="pt-0 p-2" onSubmit={handleSubmit(login)}>
                        <div className="d-flex flex-row mb-2 px-2">
                            <p className='text-end m-0 w-100 fw-thin h-5 align-self-center'>I am not a student</p>
                            <Switch {...register("type")} onChange={() => setIsStudent(!isStudent)} color="primary" />
                        </div>
                        <div>
                            <label htmlFor="email"><b>Email</b></label>
                            <input {...register("email")} className='form-control mb-3' type="text" placeholder="Institutional Email" name="email" required/>
                            <label htmlFor="password"><b>Password</b></label>
                            <input {...register("password")} className='form-control mb-3' type="password" placeholder="Enter Password" name="password" required/>
                        </div>
                        <button type='submit' className="btn btn-outline-success w-100 mb-3">Log In</button>
                    </form>
                    <div className='text-light-emphasis'>
                        <p className="text-center fw-medium fst-italic">Don't have an account? Forgot password? Contact the Librarian</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;