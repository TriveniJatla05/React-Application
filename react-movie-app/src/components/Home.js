import React, { useState, useEffect, useContext } from 'react'
import {
    API_URL,
    API_KEY,
    IMAGE_BASE_URL,
    BACKDROP_SIZE,
    POSTER_SIZE
} from '../config'

//importing components
import Header from './elements/Header';
import HeroImage from './elements/HeroImage'
import SearchBar from './elements/SearchBar'
import Grid from './elements/Grid'
import MovieThumb from './elements/MovieThumb'
import Spinner from './elements/Spinner'
import LoadMoreBtn from './elements/LoadMoreBtn'

//importing custom hook
import useHomeFetch from './hooks/useHomeFetch';
import NoImage from './images/no_image.jpg';
import AuthContext from './context/authContext/AuthContext';

const Home = (props) => {
    const [{ state, loading, error }, fetchMovies] = useHomeFetch();
    //console.log(JSON.stringify(state));
    const [searchTerm, setSearchTerm] = useState('');
     const [userName, setUserName] = useState('');
     const { userAuth } = useContext(AuthContext);
    useEffect(() => {
        console.log("userAuth in Home ..."+userAuth);
        if(!userAuth){
            props.history.push("/");
        }
        let user = JSON.parse(localStorage.getItem("user"));
        setUserName(user.userName);
    }, []);

    const loadMoreMovies = () => {
        const searchEndPoint = `${API_URL}search/movie?api_key=${API_KEY}&query=${searchTerm}&page=${state.currentPage + 1}`
        const popularEndPoint = `${API_URL}movie/popular?api_key=${API_KEY}&page=${state.currentPage + 1}`

        const endpoint = searchTerm ? searchEndPoint : popularEndPoint;
        fetchMovies(endpoint)
    }

    if (error) {
        return <div>Something went wrong...!</div>
    }
    if (!state.movies[0]) {
        return <Spinner />
    }

    return (
        <React.Fragment>
                <Header {...props} userName={userName} />
                <HeroImage
                    image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.heroImage.backdrop_path}`}
                    title={state.heroImage.original_title}
                    text={state.heroImage.overview}
                />
                <Grid header={searchTerm ? 'Search Results' : 'Popular Movies'}>
                    {state.movies.map(movie => (
                        < MovieThumb
                            key={movie.id}
                            clickable
                            image={
                                movie.poster_path
                                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                                    : NoImage
                            }
                            movieId={movie.id}
                            movieName={movie.original_title}
                        />
                    ))
                    }
                </Grid>
                {loading && <Spinner />}
                <LoadMoreBtn text='Load More Movies' callback={loadMoreMovies} />
        </React.Fragment>
    )
}

export default Home

