import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Private = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        const checkTokenValidity = async () => {
            const isValid = await actions.syncToken(); // Assuming syncToken checks and updates the token
            if (!isValid) {
                navigate('/login');
            }
        };

        checkTokenValidity();
    }, []);

    const handleGetJoke = async () => {
        const isAuthenticated = await actions.handlePrivateJoke();
        if (isAuthenticated) {
            navigate('/private');
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="text-center mt-5">
            {store.message ? (
                <div className="alert alert-info">{store.message}</div>
            ) : (
                <div className="alert alert-warning">If it does not load in a few sec..then..wait..did you refresh?</div>
            )}
            {store.joke ? (<div className="alert alert-success mt-3">{store.joke}</div>) : (<div className="alert alert-success mt-3">Fetching Jokes...</div>)}
            <button className="btn btn-primary mt-5" onClick={handleGetJoke}>
                Get Private Joke
            </button>
        </div>

    );
};

export default Private;