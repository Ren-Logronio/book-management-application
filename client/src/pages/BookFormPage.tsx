import { useSearchParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import { useForm } from "react-hook-form";
import { Spinner } from "react-bootstrap";
import { ToggleButtonGroup, ToggleButton  } from "@mui/material";

import { RootState } from "../app/store";
import NavigationBar from "./component/NavigationBar";

type Book = {
    title: string;
    author?: string;
    description?: string;
    datePublished?: Date;
    keywords?: string; 
    bookType?: string;
    bookCoverImage?: File;
    bookDocument?: File;
}

export default function () {
    const [ loading, setLoading ] = useState(true);

    const [ searchParams, setSearchParams ] = useSearchParams();
    const { register, handleSubmit } = useForm<Book>();

    const [ userLoading, setUserLoading ] = useState(true);
    const [ dash, setDash ] = useState({firstname: '', lastname: '', middlename: '', userType:'' });
    const { user } = useSelector((state: RootState) => state.auth);

    const [ alignment, setAlignment ] = useState('printed');
    const [ key, setKey ] = useState("" as string);
    const [ keys, setKeys ] = useState([] as string[]);

    const add = typeof searchParams.get('add') == null ? false : true;
    const edit = searchParams.get('edit');

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
            setUserLoading(false);
        }
        setUserLoading(false);
    }, []);

    const handleBookTypeToggle = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    }

    const handleKeywordDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
   if (/[a-zA-Z]/.test(event.key)) {
    setKey(key + event.key);
  } else if (['Space', 'Enter', 'Comma'].includes(event.code)) {
    setKeys([...Keys, event.key]);
setKey("");
  }
    }

    const handleRemoveKey = (event: React.MouseEvent<HTMLButtonElement>) => {
        const rkey = event.currentTarget.id;
        const newKeys = keys.filter(oldkey => oldkey !== rkey);
        if(rkey.includes(rkey)) {
            setKeys(newKeys);
        }
    };

    return(
        <div className='min-vh-100 d-flex flex-column flex-wrap'>
            <NavigationBar loading={userLoading} dash={dash} />
            <div className='container container-fluid h-100 d-flex px-md-5 px-3 flex-column flex-grow-1 justify-content-evenly'>
                {!loading ? <div className='d-flex flex-row justify-content-center'><Spinner /></div> : <>
                <form className="mx-1 px-2 mx-md-3 mx-lg-5 px-md-3 px-lg-5">
                    <div className="mb-2">
                        <label className="form-label">Title *</label>
                        <input className="form-control" {...register("title")} />
                    </div>
                    <div className="row mb-2">
                        <div className="col-8">
                            <label className="form-label">Author</label>
                            <input className="form-control" {...register("author")} />
                        </div>
                        <div className="col-4">
                            <label className="form-label">Date Published</label>
                            <input className="form-control" type="date" {...register("datePublished")} />
                        </div>
                    </div>
                    <div className="mb-2">
                        <label className="form-label">Description</label>
                        <textarea className="form-control" style={{minHeight: '100px', maxHeight: '200px'}} {...register("description")} />
                    </div>
                    <div className="mb-2">
                        <label className="form-label">Cover <span className="fst-italic">(Optional)</span></label>
                        <input className="form-control" type="file" {...register("bookCoverImage")} />
                    </div>
                    <div className="mb-2">
                        <label className="form-label">Keywords</label>
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
                        <input className="form-control" value={key} onKeyDown={handleKeywordDown} type="text" />
                    </div>

                    <input type="hidden" value={keys} {...register("keywords")} />
                    <input type="hidden" value={alignment} {...register("bookType")} />
                    <div className="d-flex flex-row justify-content-end mt-4">
                        <ToggleButtonGroup color="primary" value={alignment} onChange={handleBookTypeToggle} size="small" exclusive aria-required>
                            <ToggleButton value="printed" >Printed</ToggleButton>
                            <ToggleButton value="digital" >Digital</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    <div className="mb-2">
                        <label className="form-label">Document</label>
                        <input className="form-control" type="file" {...register("bookDocument")} disabled={alignment == 'printed'}/>
                    </div>
                </form>
                </>} 
            </div>
        </div>
    ) 
};