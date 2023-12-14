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

    

    return(
        <div>SearchPage</div>
    ) 
}