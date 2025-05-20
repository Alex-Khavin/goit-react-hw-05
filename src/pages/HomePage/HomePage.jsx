import css from './HomePage.module.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import MovieList from '../../components/MovieList/MovieList';

export default function HomePage() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
    const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
    const options = {
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiODIwMmFlNDgwNzk1YWExNjNkODYzZDdiNmQ1YWMyMSIsIm5iZiI6MTc0NzQ3NTYzNC40NDcsInN1YiI6IjY4Mjg1Y2IyM2I0MjMyOWY5OThiZmRhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3XuoYUqnz_MW4wiLQ9U_HNGBd17UFrV3v27av6_l0Oo'
  }
    };
        async function fetchData() {
            try {
                setIsError(false);
                setIsLoading(true);
                const response = await axios.get(url, options)
                return setMovies(response.data.results);
            } catch {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData()
    }, []);


   
    return (
        <div className={css.container}>
            {isError && <p>Something went wrong</p>}
            {isLoading && <strong>Loading...</strong>}
            <p className={css.text}>Trading today:</p>
            {movies.length > 0 && (<MovieList movies={movies} />)}


            {/* {movies.length > 0 && (
                <ul>
                {movies.map(movie => (
                    <li key={movie.id}>
                        <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
                    </li>
                )
                )}
            </ul>)} */}
        </div>
    )
}