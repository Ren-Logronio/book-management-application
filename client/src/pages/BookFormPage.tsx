import { useSearchParams, Navigate, useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import { useForm } from "react-hook-form";
import { Spinner, Alert } from "react-bootstrap";
import { ToggleButtonGroup, ToggleButton  } from "@mui/material";
import { useAppDispatch, RootState } from "../app/store";
import { addBook, getBook, editBook, resetBookForm } from "../slices/BookSlice";
import NavigationBar from "./component/NavigationBar";

type Book = {
    title: string;
    author?: string;
    description?: string;
    datePublished?: string;
    keywords?: string; 
    bookType?: string;
    bookCoverImage?: File;
    bookDocument?: File;
}

export default function () {
    const { bookForm, bookView } = useSelector((state: RootState) => state.book);
    const dispatch = useAppDispatch();

    const navigate = useNavigate()

    const [ loading, setLoading ] = useState(true);

    const [ searchParams, setSearchParams ] = useSearchParams();
    const { register, setValue, handleSubmit } = useForm<Book>();

    const [ userLoading, setUserLoading ] = useState(true);
    const [ dash, setDash ] = useState({firstname: '', lastname: '', middlename: '', userType:'' });
    const { user } = useSelector((state: RootState) => state.auth);

    const [ alignment, setAlignment ] = useState('printed');
    const [ key, setKey ] = useState("" as string);
    const [ keys, setKeys ] = useState([] as string[]);

    const add = searchParams.get('add') != null ? true : false;
    console.log(add);
    const edit = searchParams.get('edit');

    const handleBookTypeToggle = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
        setValue("bookType", newAlignment);
    }

    const handleKeywordDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (event.code == 'Backspace') {
            setKey(key.slice(0, -1));
            return;
        } else if (['Space', 'Enter', 'Comma'].includes(event.code) && key.length > 0) {
            if (!keys.includes(key)){
                const newKeys = [...keys, key];
                setKeys(newKeys);
                setValue("keywords", newKeys.toString());
                setKey("");
            }
            return;
        }
        if (/^[0-9a-zA-Z]$/.test(event.key)) {
            setKey(key + event.key);
        } 
    }

    const handleRemoveKey = (event: React.MouseEvent<HTMLButtonElement>) => {
        const rkey = event.currentTarget.id;
        const newKeys = keys.filter(oldkey => oldkey !== rkey);
        if(rkey.includes(rkey)) {
            setKeys(newKeys);
            setValue("keywords", newKeys.toString());
        }
    };

    const bookFormSubmit = async (data: Book) => {
        if(bookForm.success) {
            return;
        } 
        if(add) {
            dispatch(addBook(data));
        } else if(edit != null) {
            if(edit.trim().length > 0) {
                dispatch(editBook({...data, id: edit, bookCoverImageFn: bookView.book?.bookCoverImage, bookDocumentFn: bookView.book?.bookDocument}));
            }
        } else {
            return(
                <Navigate replace to='/dashboard' />
            );
        }
    }

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
        if(edit != null && edit.trim().length > 0) { dispatch(getBook(edit)) } else { setLoading(false); }
    }, []);

    if((bookView.success) && loading){
        setLoading(false);
        if(edit != null) {
            if(bookView.success) {
                const { book } = bookView;
                if(book) {
                    console.log(book);
                    setValue("title", book.title ? book.title : "No title");
                    setValue("author", book.author || "No author");
                    setValue("description", book.description || "No description");
                    setValue("datePublished", book.datePublished || (new Date()).toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit',}));
                    setValue("keywords", book.keywords || "");
                    setValue("bookType", book.bookType || "printed");
                    setAlignment(book.bookType || "printed");
                    setKeys(book.keywords ? book.keywords.split(",") : []);
                }
            }
        } else {
            setValue("title", '');
            setValue("author", '');
            setValue("description", '');
            setValue("datePublished", (new Date()).toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit',}));
            setValue("keywords", '');
            setValue("bookType", '');
            setAlignment("printed");
            setKeys([]);
        }
    }

    if(bookForm.success){
        setTimeout(() =>{
            navigate('/dashboard');
            dispatch(resetBookForm());
        }, 2000);
        dispatchEvent 
    }

    if(dash.userType == 'student') {
        return(
            <Navigate replace to='/dashboard' />
        );
    };

    return(
        <div className='min-vh-100 d-flex flex-column flex-wrap'>
            <NavigationBar loading={userLoading} dash={dash} />
            <div className='container container-fluid h-100 d-flex px-md-5 px-3 flex-column flex-grow-1 justify-content-evenly overflow-x-hidden'>
                {loading ? <div className='d-flex flex-row justify-content-center'><Spinner /></div> : <>
                <div className="d-flex flex-row">
                    <Link className="text-black btn" to="/dashboard">
                        <ArrowLeft className="align-self-center" />
                    </Link>
                    <p className="h3 m-0 align-self-center">{ add ? "Add Book" : "Edit Book"}</p>
                </div>
                <form onSubmit={handleSubmit(bookFormSubmit)} className="mx-1 px-2 mx-md-3 mx-lg-5 px-md-3 px-lg-5" encType="multipart/form-data">
                    { bookForm.success ? <div>
                        <Alert className="" key="success" variant="success">{bookForm.message}</Alert>
                    </div> : <></> }
                    <div className="mb-2">
                        <label className="form-label fw-semibold">Title *</label>
                        <input className="form-control-sm form-control" placeholder="Title of the book" required {...register("title")} />
                    </div>
                    <div className="row mb-2">
                        <div className="col-8">
                            <label className="form-label fw-semibold">Author *</label>
                            <input className="form-control-sm form-control" placeholder="Author of the book" required {...register("author")} />
                        </div>
                        <div className="col-4">
                            <label className="form-label fw-semibold">Date Published *</label>
                            <input className="form-control-sm form-control" type="date" placeholder="Date the book was published" required {...register("datePublished")} />
                        </div>
                    </div>
                    <div className="mb-2">
                        <label className="form-label fw-semibold">Description  </label>
                        <textarea className="form-control" placeholder="Brief description of the book" style={{minHeight: '75px', maxHeight: '100px'}} {...register("description")} />
                    </div>
                    <div className="mb-2">
                        
                    </div>
                    <div className="mb-2">
                        <label className="form-label fw-semibold">Keywords  </label>
                        <div className="d-flex flex-nowrap mb-2">
                            {keys.map(
                                (key: string) => 
                                <div className="border border-1 p-1 rounded-1 me-2">
                                    {key}
                                    <button type="button" id={key} onClick={handleRemoveKey} className="btn-close fs-6" />
                                </div>
                            )}
                            {
                                key != '' ? <div className="border border-1 p-1 rounded-1">{key.replace(" ", "")}</div> : <></>
                            }
                        </div>
                        <input className="form-control form-control-sm" placeholder="Enter Keywords" value={key} onKeyDown={handleKeywordDown} type="text" />
                    </div>

                    <input type="hidden" defaultValue="" {...register("keywords")} />
                    <input type="hidden" defaultValue="printed" {...register("bookType")} />
                    <div className="d-flex flex-row justify-content-center mt-4">
                        <ToggleButtonGroup color="primary" value={alignment} onChange={handleBookTypeToggle} size="small" exclusive aria-required>
                            <ToggleButton value="printed" >Printed</ToggleButton>
                            <ToggleButton value="digital" >Digital</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    <div className="mb-2 row">
                        <div className="col-7">
                            <label className="form-label fw-semibold">Cover  </label>
                            <input className="form-control" type="file" placeholder="Cover image for the book" accept="image/jpeg, image/png" {...register("bookCoverImage")} />
                        </div>
                        <div className="col-5">
                            <label className="form-label fw-semibold">Document  </label>
                            <input className="form-control" type="file" {...register("bookDocument")} accept="application/pdf" disabled={alignment == 'printed'}/>
                        </div>
                    </div>
                    <div className="my-4 d-flex justify-content-end">
                        <button className="btn btn-outline-success" style={{width: '150px'}} type="submit">{ add ? "Add Book" : "Edit Book"}</button>
                    </div>
                </form>
                </>} 
            </div>
        </div>
    ) 
};