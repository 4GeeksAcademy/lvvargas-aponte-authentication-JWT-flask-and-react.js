import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (store.token && store.token != '' && store.token != undefined) actions.getMessage();
    }, [store.token])

    const handleGetJoke = async () => {
        navigate('/private')
    };

    return (
        <div className="text-center mt-5">
            <h1 className="mb-5">JWT Project</h1>
            {store.token && store.token != '' && store.token != undefined ? <div className="alert alert-info">
                {store.message || "If you see this, you have an error with your backend not running or failed to authenticate"}
                <button className="btn btn-primary ms-5" onClick={handleGetJoke}>
                    Private Page
                </button>
            </div>
                :
                <div className="alert alert-warning">Login to see this change!</div>}
        </div>
    );
};