import { Link } from 'react-router-dom';

export default function () {
    return(
        <>
            <div>DashboardPage</div>
            <Link replace to="/login?logout">Logout</Link>
        </>
    ) 
}
