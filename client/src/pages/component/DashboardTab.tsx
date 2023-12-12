import { Link } from 'react-router-dom';
import DashboardCard from "./DashboardCard";
import { Book, CardChecklist, PeopleFill } from 'react-bootstrap-icons';

export default function DashboardTab() {
    const numbooks = 0;
    const numstudents = 0;
    const numreviews = 0;

    return(
        <div>
            <div className='d-flex flex-row jutify-content-end mb-3'>
                <Link to='/forms/book?add' className='btn btn-outline-success rounded-1'>Add Book</Link>
            </div>
            <div className='row g-lg-4 g-md-3 g-2'>
                <DashboardCard title='Number of Books' content={numbooks} icon={<Book/>} />
                <DashboardCard title='Number of Students' content={numstudents} icon={<PeopleFill />} />
                <DashboardCard title='Number of Reviews' content={numreviews} icon={<CardChecklist />} />
            </div>
        </div>
    )
}