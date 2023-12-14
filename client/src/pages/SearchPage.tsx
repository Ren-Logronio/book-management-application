import { useSearchParams, Navigate, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Spinner, Placeholder } from "react-bootstrap";
import { Trash, PencilSquare, ArrowLeft } from "react-bootstrap-icons";

import { RootState, useAppDispatch } from "../app/store";
import { getBook, deleteBook, searchBooks } from "../slices/BookSlice";
import NavigationBar from "./component/NavigationBar";
import SearchTab from "./component/SearchTab";

export default function () {
    const { bookList } = useSelector((state: RootState) => state.book);
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();
    const [ userLoading, setUserLoading ] = useState(true);
    const [ dash, setDash ] = useState({firstname: '', lastname: '', middlename: '', userType:'' });
    const [ loading, setLoading ] = useState(true);
    const [ searchParams, setSearchParams ] = useSearchParams();
    const navigate = useNavigate();

    const query: string = searchParams.get('q') || "";

    useEffect(() => {
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
        setUserLoading(false);
    }, []);

    useEffect(() => {
        if(!bookList.loading && loading) {
            if(query != null) {
                const search = query.trim() || "@all";
                console.log(search);
                dispatch(searchBooks(search));
            } 
        }
    });

    if(bookList.success && loading) {
        console.log(bookList);
        setLoading(false);
    }

    return(
        <div className='min-vh-100 d-flex flex-column flex-wrap'>
            <NavigationBar loading={userLoading} dash={dash} />
            <div className='container container-fluid h-100 d-flex flex-column flex-grow-1 justify-content-evenly'>
                <SearchTab query={searchParams.get('q') || ""} rms />
                { loading ?
                    <div className="d-flex justify-content-center">
                        <Spinner className="align-self-center" />
                    </div> : 
                    <div className="px-lg-5 mx-lg-5 px-md-3 mx-md-3 px-2 mx-2" style={{minHeight: '456px'}}>
                        <p className="h4 m-0">Search Results</p>
                        <div className="overflow-y-scroll" style={{minHeight: '456px', maxHeight: '456px'}}>
                        { bookList.books ? bookList.books.length > 0 ?
                            bookList.books.map((book, index) => {
                                return(
                                    <div className="border border-1 rounded-3 p-3 mx-3 mx-lg-5 my-3 d-flex justify-content-between" >
                                        <div>
                                            <div className="d-flex flex-row justify-content-between">
                                                <p className="m-0 h5">{book.title}</p>
                                            </div>
                                            <p className="m-0">{book.author}</p>
                                        </div>
                                        <div className="d-flex flex-column justify-content-center">
                                            <Link className="btn btn-outline-success" to={`/book?v=${book._id}`}>
                                                <span>View</span>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            }) : <p>No Results</p> : <p>No Results</p> }
                        </div>
                    </div>
                }
            </div>
        </div>
    ) 
}