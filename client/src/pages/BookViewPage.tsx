import { useSearchParams, Navigate, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Spinner, Placeholder } from "react-bootstrap";
import { Trash, PencilSquare, ArrowLeft } from "react-bootstrap-icons";

import { RootState, useAppDispatch } from "../app/store";
import { getBook, deleteBook } from "../slices/BookSlice";
import NavigationBar from "./component/NavigationBar";

export default function () {

    const { bookView } = useSelector((state: RootState) => state.book);
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();
    const [ userLoading, setUserLoading ] = useState(true);
    const [ dash, setDash ] = useState({firstname: '', lastname: '', middlename: '', userType:'' });
    const [ loading, setLoading ] = useState(true);
    const [ searchParams, setSearchParams ] = useSearchParams();
    const navigate = useNavigate();

    const view = searchParams.get("v");

    const handleBookDelete = (id: string ) => {
        return () => { 
            dispatch(deleteBook(id));
            navigate("/dashboard");
        };
    }

    useEffect(() => {
        if(!bookView.loading && loading) {
            if(view != null && view.trim().length > 0) {
                dispatch(getBook(view));
            } else {
                navigate("/dashboard");
            }
        }
    }, []);

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

    if(bookView.success && loading) {
        console.log(bookView.book);
        setLoading(false)
    }

    return(
        <div className='min-vh-100 d-flex flex-column flex-wrap'>
            <NavigationBar loading={userLoading} dash={dash} />
            <div className='container container-fluid h-100 d-flex flex-column flex-grow-1 justify-content-evenly'>
                { loading ? 
                    <div className='d-flex flex-row justify-content-center'>
                        <Spinner /> 
                    </div>
                    :
                    <> 
                        <div className="d-flex flex-column flex-grow-1 justify-content-evenly">
                            <div className=" ">
                                <Link className="btn text-black mb-2 align-items-center" to="/dashboard">
                                    <ArrowLeft className="align-self-center mx-auto"/><span className="m-0 ms-2">Return to Dashboard</span>
                                </Link>
                                <div className="border border-1 p-3 mx-lg-5 mx-md-4 mx-2  d-flex justify-content-evenly flex-row-1">
                                    { bookView.book ? !bookView.book.bookCoverImage ?
                                    <Placeholder as="div" style={{minHeight: '256px', minWidth: '183px'}}>
                                    </Placeholder> :
                                    <img src={`/api/files/img/${bookView.book.bookCoverImage}`} className="align-self-center border border-1 rounded-3" style={{height: "256px", width: "183px"}} /> : <></>
                                    }
                                    <div className="flex-grow-1 d-flex flex-column ms-3 position-relative">
                                        { dash.userType == "librarian" ?
                                            <div className="position-absolute top-0 end-0 translate-y-middle d-flex flex-row">
                                                <Link className="btn btn-primary me-2 d-flex flex-row" to={`/forms/book?edit=${bookView.book ? bookView.book._id : ""}`}>
                                                    Edit
                                                    <PencilSquare className="align-self-center ms-2" />
                                                </Link>
                                                <button className="btn btn-danger d-flex flex-row" onClick={handleBookDelete(bookView.book ? bookView.book._id : "")}>
                                                    <Trash className="align-self-center" />
                                                </button>
                                            </div> : <></>
                                        }
                                        <p className="h3 m-0 mb-2">
                                            { bookView.book ? bookView.book.title : "Untitled Book" }
                                        </p>
                                        <p className="h6 m-0 ms-2">
                                            By { bookView.book ? bookView.book.author : "Unknown Author" }
                                        </p>
                                        <p className="m-0 my-2 ms-2">
                                            Published at { bookView.book ? typeof bookView.book.datePublished == 'string' ? (new Date(bookView.book.datePublished)).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : bookView.book.datePublished : "Unknown Date" }
                                        </p>
                                        <p className="my-3 m-0 ms-2 flex-grow-1">
                                            { bookView.book ? bookView.book.description : "No description available." }
                                        </p>
                                        <div className="d-flex flex-row justify-content-between">
                                            <div className="d-flex align-items-end flex-nowrap">
                                                { bookView.book ? bookView.book.keywords ? (bookView.book.keywords.split(",")).map((key: string) => <Link className="text-black text-decoration-none me-2" to={`/book/search?q=${key}`}><div className="border border-1 p-1 rounded-1"> {key} </div></Link>): <></> : <></> }
                                            </div>
                                            <div className="d-flex flex-column">
                                                <p className="text-end m-0 fs-6 text-light-emphasis fst-italic">
                                                    Created @ { bookView.book ? new Date(bookView.book.createdAt).toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true,}) : "" }
                                                </p>
                                                <p className="text-end m-0 fs-6 text-light-emphasis fst-italic">
                                                    Last Updated @ { bookView.book ? new Date(bookView.book.updatedAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true,}) : "" }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                { bookView.book ? bookView.book.bookDocument ? <embed src={`/api/files/pdf/${bookView.book.bookDocument}`} className="mt-5" width="100%" height="750px" /> : <p className="h5 fst-italic text-center">No Online Copy For This Book</p> : <p className="h5 fst-italic text-center">No Online Copy For This Book</p> }
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    ) 
}