import { Link } from 'react-router-dom';

function HomePage(){
    return (
        <div>
            <h1>Homepage</h1>
            <Link to="/login">Login</Link>
        </div>
    )
}

export default HomePage;