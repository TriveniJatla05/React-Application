import { useState, useEffect } from 'react';
import { API_URL, API_KEY } from '../../config';
import axios from 'axios';
const useHomeFetch = () => {
    const [state, setState] = useState({ movies: [] })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const fetchMovies = async endpoint => {
        setError(false);
        setLoading(true);
        const isLoadMore = endpoint.search('page')
        axios.get(endpoint)
            .then(response => {
                setState(prevState => ({
                    ...prevState,
                    movies:
                        isLoadMore !== -1
                            ? [...prevState.movies, ...response.data.results]
                            : [...response.data.results],
                    heroImage: prevState.heroImage || response.data.results[0],
                    currentPage: response.data.page,
                    totalPages: response.data.total_pages
                }))
            })
            .catch(error => {
                setError(true);
            })
        setLoading(false); 
    }
    useEffect(() => {
        fetchMovies(`${API_URL}movie/popular?api_key=${API_KEY}`);
    }, [])
    return [{ state, loading, error }, fetchMovies];
}

export default useHomeFetch