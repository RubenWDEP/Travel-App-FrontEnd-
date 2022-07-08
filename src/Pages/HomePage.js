import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import LatestPublications from '../Components/LatestPublications';
import Publish from '../Components/Publish';
import { useToken } from '../Context/loginContext';
import { useLatestRec } from '../Hooks/lastestRecommendations';
import './HomePage.css';


function HomePage () {
    const [user, setUser, token, setToken, logout, id, setID] = useToken();
    const [recs, setRecs] = useLatestRec();
    const loggedUser = localStorage.getItem("user");

    if (!loggedUser) {
        return <Navigate to="/"/>
    }

    return (
        <>
            <Publish setRecs={setRecs}/>
            <LatestPublications recs={recs} setRecs={setRecs}/>
        </>
    );
    
}

export default HomePage;