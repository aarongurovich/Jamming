import React, { useState, useEffect } from 'react';
import { getAccessToken } from '../services/spotifyService';
import SearchBar from './SearchBar';

export default function App() {
    const [token, setToken] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    async function fetchToken() {
        try {
            const tokenData = await getAccessToken();
            if (tokenData) {
                setToken(`Bearer ${tokenData}`);
            } else {
               
                const clientId = '3382493d2f4b4131a180974372a2f024';
                const redirectUri = 'http://localhost:3000/';
                const authEndpoint = 'https://accounts.spotify.com/authorize';
                const scopes = [
                    'user-read-private',
                    'user-read-email',
                    'playlist-modify-public',
                    'playlist-modify-private'
                ];
                window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
            }
        } catch (error) {
            console.error('Error fetching token:', error);
        }
    }

    useEffect(() => {
        fetchToken();
    }, []);


    async function fetchSpotifyData(searchTerm) {
        const baseURL = "https://api.spotify.com/v1/search";
        const query = encodeURIComponent(searchTerm);
        const types = "album,track";
        const market = "US";
        const limit = 10;
        const offset = 0;
        const url = `${baseURL}?q=${query}&type=${types}&market=${market}&limit=${limit}&offset=${offset}`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': token
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch: ' + response.statusText);
            }
            const data = await response.json();
            setSearchResults(data.albums ? data.albums.items : []);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <>
            <h1>Spotify Search Results</h1>
            <SearchBar onSearch={fetchSpotifyData} />
            <button onClick={fetchToken}>Get New Token</button>
            <button onClick= {() => setToken(null)}>Clear Old Token</button>
            <p>{token}</p>
            <ul>
                {searchResults.map(item => (
                    <li key={item.id}>
                        <div>
                            <strong>{item.name}</strong> - {item.artists[0].name}
                        </div>
                        <div>
                            <img src={item.images[0]?.url} alt={`${item.name} album cover`} style={{ width: 100, height: 100 }} />
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}
