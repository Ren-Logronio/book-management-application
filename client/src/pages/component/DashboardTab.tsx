
import { Book, CardChecklist, PeopleFill } from 'react-bootstrap-icons';
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

import DashboardCard from "./DashboardCard";
import { RootState, useAppDispatch } from '../../app/store';
import { loadDashboard } from '../../slices/DashboardSlice';


export default function DashboardTab() {

    const { loading, dash } = useSelector((state: RootState) => state.dashboard);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadDashboard());
    }, []);

    const toReactBootstrapIcon = (icon: string | undefined) => {
        switch(icon) {
            case 'Book':
                return <Book />;
            case 'CardChecklist':
                return <CardChecklist />;
            case 'PeopleFill':
                return <PeopleFill />;
            default:
                return <Book />;
        }
    }

    return(
        <div>
            <div className='d-flex flex-row jutify-content-end mb-3'>
                <Link to='/forms/book?add' className='btn btn-outline-success rounded-1'>Add Book</Link>
            </div>
            <div className='row g-lg-4 g-md-3 g-2'>
                {loading ? <Spinner></Spinner> :
                    <>
                        {
                            dash.map((card, index) => {
                                return <DashboardCard key={index} title={card.title} content={card.content} icon={toReactBootstrapIcon(card.icon)} />
                            })
                        }
                    </>
                }
            </div>
        </div>
    )
}