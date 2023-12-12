import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function SearchTab() {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const changeSearch = (event: any) => {
        setSearch((event.target as HTMLInputElement).value);
    }

    const handleKeydown = (event: any) => {
        if(event.key === 'Enter') {
            navigate(`/book/search?q=${search}`);
        }
    }

    return(
        <div className='mx-2 mx-md-5 px-lg-5 px-sm-3 px-2'>
            <p className='m-0 mb-2 text-center h5'>Book Search</p>
            <div className='position-relative'>
                <input className='form-control' type='text' onKeyDown={handleKeydown} onChange={changeSearch}/>
                <Link className='position-absolute top-50 end-0 translate-middle text-black d-flex justify-content-center' to={`/book/search?q=${search}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search my-auto align-self-center m-0" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                </Link>
            </div>
        </div>
    );

}