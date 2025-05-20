import css from './MovieDetailsPage.module.css';
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams, NavLink, Outlet, Link, useLocation } from "react-router-dom"
import Loader from "../../components/Loader/Loader";

export default function MovieDetailsPage() {
    const { movieId } = useParams();
    const [movieDetail, setMovieDetail] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const backLocationRef = useRef(location.state);
    
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
    const options = {
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiODIwMmFlNDgwNzk1YWExNjNkODYzZDdiNmQ1YWMyMSIsIm5iZiI6MTc0NzQ3NTYzNC40NDcsInN1YiI6IjY4Mjg1Y2IyM2I0MjMyOWY5OThiZmRhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3XuoYUqnz_MW4wiLQ9U_HNGBd17UFrV3v27av6_l0Oo'
  }
    };
    
    useEffect(() => {
        async function fetchData() {
            try {
                setIsError(false);
                setIsLoading(true);
                const response = await axios.get(url, options)
                return setMovieDetail(response.data);
            } catch {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData()
    }, [movieId])


    return (
        <div>
            {isError && <p>Something went wrong</p>}
            {isLoading && <Loader />}
            <Link to={backLocationRef.current}>Go back</Link>
            {movieDetail !== null && (
                <div className={css.container}>
                    <img className={css.image} src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`} alt={movieDetail.title} />
                    <div className={css.wrapper}>
                        <h2>{`${movieDetail.original_title} (${movieDetail.release_date.slice(0, 4)})`}</h2>
                        <p>{`User score: ${movieDetail.popularity}`}</p>
                        <p>{ `Overview: ${movieDetail.overview}`}</p>
                        <p>Genres: {movieDetail.genres.map((genre) => genre.name).join(", ")}</p>
                    </div>
                </div>
            )}
            <p>Additional information</p>
            <ul>
                <li>
                    <NavLink to="cast">Cast</NavLink>
                </li>
                 <li>
                    <NavLink to="reviews">Reviews</NavLink>
                </li>
            </ul>
            <Outlet/>
        </div>
    )
}