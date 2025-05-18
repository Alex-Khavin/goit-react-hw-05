import axios from 'axios';
import { useEffect, useState } from "react";

export default function HomePage() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);


    const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
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
        <div>
            {isError && { isError }}
            {isLoading && <strong>Loading...</strong>}
            <ul>
                {movies.map(movie => (
                    <li key={movie.id}>
                        <a href="#">{movie.title}</a>
                    </li>
                )
                )}
            </ul>
        </div>
    )
}