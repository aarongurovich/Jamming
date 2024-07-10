import React, {useState, useEffect} from 'react'
import Spotify, {getAccessToken} from '../services/spotifyService'
export default function App(){
    let access_token;
    useEffect(() =>{
        access_token = getAccessToken().accessToken;
        console.log(access_token);
    }, []);

    return (
        <>
        <h1>Hey</h1>
        <a href={Spotify()}>Click This!</a>
        </>
    );
}
