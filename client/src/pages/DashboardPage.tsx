import NavigationBar from './component/NavigationBar';
import SearchTab from './component/SearchTab';
import DashboardTab from './component/DashboardTab';

import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

type DashboardState = {
    loading: boolean,
    name: {
        firstname: string,
        lastname: string,
        middlename: string
    }
}

export default function () {
    const [ loading, setLoading ] = useState(true);
    const [ dash, setDash ] = useState({firstname: '', lastname: '', middlename: '', userType:'' });
    const { user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        console.log("once");
        if(typeof user == 'string') {
            var cur = JSON.parse(user);
            setDash({ 
                firstname: cur.firstname, 
                lastname: cur.lastname, 
                middlename: cur.middlename, 
                userType: cur.userType
            });
        } else {
            setDash({ 
                firstname: (user as any).firstname, 
                lastname: (user as any).lastname, 
                middlename: (user as any).middlename, 
                userType: (user as any).userType
            });
        }
        setLoading(false);
    }, []);

    return(
        <div className='min-vh-100 d-flex flex-column flex-wrap'>
            <NavigationBar loading={loading} dash={dash} />
            <div className='container container-fluid h-100 d-flex flex-column flex-grow-1 justify-content-evenly'>
                { loading ? 
                    <div className='d-flex flex-row justify-content-center'>
                        <Spinner /> 
                    </div>
                    :
                    <>
                        <p className='h3'>Welcome, {dash.userType}</p>
                        <SearchTab />
                        {
                            dash.userType == 'librarian' ?
                                <DashboardTab />
                                :
                                <div></div>
                        }
                    </>
                }
                
            </div>
        </div>
    ) 

}
