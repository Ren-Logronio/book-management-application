import { Dropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useEffect, useState } from 'react';

type NavBarProps = {
    loading: boolean,
    dash: {
        firstname: string,
        lastname: string,
        middlename: string,
        userType: string,
    }
}

export default function NavigationBar ({loading, dash}: NavBarProps) {

    return(
        <div style={{height: '54px'}} 
            className="min-vw-100 border border-1 d-flex flex-row align-content-center justify-content-between px-md-5 px-2">
            <a className='d-flex align-items-center align-content-center text-black text-decoration-none user-select-none'>
                <img src='/logo.png' style={{height: '32px', width: '32px'}} />
                <p className='m-0 ms-2 fw-semibold d-none d-sm-block'>Book Management Application</p>
            </a>
            { loading ? <div></div> :
                <Dropdown className='d-flex flex-row justify-content-center'>
                    <Dropdown.Toggle className='bg-transparent border border-0 text-black'>
                        <span className='m-0 me-2'>
                            {dash.lastname}, {dash.firstname} {dash.middlename}
                        </span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="/login?logout">Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            }
        </div>
    );
}
/*

<a className='d-flex align-items-center align-content-center' href='#'>
    <p className='m-0'>{navUser.lastname}, {navUser.firstname} {navUser.middlename}</p>
</a>

*/