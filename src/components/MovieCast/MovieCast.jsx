import css from './MovieCast.module.css'
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";


export default function MovieCast() {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;
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
                return setCast(response.data.cast);
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
            {isLoading && <Loader/>}
            {cast.length > 0 && (
                <ul>
                    {cast.map((item) => (
                        <li key={item.cast_id}>
                            <img className={css.img} src={`https://image.tmdb.org/t/p/w500${item.profile_path}`} alt={item.original_name} />
                            <h3>{item.original_name}</h3>
                            <p>Character: {item.character}</p>
                        </li>
                    
                    ))}
                </ul>)}

        </div>
    )
}