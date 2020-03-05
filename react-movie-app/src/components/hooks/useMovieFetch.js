import { useState, useEffect, useCallback } from 'react';
import { API_URL, API_KEY } from '../../config';
import axios from 'axios';

export const useMovieFetch = (movieId) => {
    
    const [movieInfo, setMovieInfo] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchData = useCallback(async () => {
        
        setError(false);
        setLoading(true);
        const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
        const creditsEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        axios.all([
            axios.get(endpoint),
            axios.get(creditsEndpoint)
        ])
            .then(axios.spread((endpointResult, creditsEndpointResult) => {
                //console.log("endpointResult = "+JSON.stringify(endpointResult));
                //console.log("creditsEndpointResult = " +JSON.stringify(creditsEndpointResult));
                const directors = creditsEndpointResult.data.crew.filter(
                    member => member.job === 'Director'
                )
                const producers = creditsEndpointResult.data.crew.filter(
                    person => person.job === 'Producer'
                )
                setMovieInfo({
                    ...endpointResult.data,
                     //movie:endpointResult.data,
                    actors: creditsEndpointResult.data.cast,
                    directors: directors,
                    producers: producers
                })
            }));
            
        setLoading(false);

    }, [movieId])

    useEffect(() => {
        console.log('useeffct hook in useMovieFetch')
        fetchData();
    }, [fetchData]);

    return [movieInfo, loading, error];
}

export default useMovieFetch

// try {
//     const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
//     const result = await (await fetch(endpoint)).json();
//     console.log(result);
//     const creditsEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
//     const creditsResult = await ( await fetch(creditsEndpoint)).json();
//     console.log(creditsResult);

//     const directors = creditsResult.crew.filter(
//         member => member.job === 'Director'
//     );

//     setMovieInfo({
//         ...result,
//         actors: creditsResult.cast,
//         directors: directors
//     })

// } catch (error) {
//     setError(true);
// }
// setLoading(false);