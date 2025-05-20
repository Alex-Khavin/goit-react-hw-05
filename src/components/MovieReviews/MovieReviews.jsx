import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from '../Loader/Loader'

export default function MovieReviews() {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`;
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
                return setReviews(response.data.results);
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
            {!isLoading && !isError && reviews.length === 0 && (<p>No reviews found</p>)}
            {reviews.length > 0 && (
                <ul>
                    {reviews.map(item => (
                        <li key={item.id}>
                            <h3>Author: {item.author} ({item.updated_at.slice(0, 10)})</h3>
                            <p>{item.content}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}


