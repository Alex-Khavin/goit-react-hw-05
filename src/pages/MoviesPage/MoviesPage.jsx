import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import { useDebounce } from 'use-debounce';
import MovieList from '../../components/MovieList/MovieList'

export default function MoviesPage() {
    const [movieSearch, setMovieSearch] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query") ?? "";

    const [debounceQuery] = useDebounce(query, 1000)

    const changeSearhParams = (event) => {
        const newQuery = event.target.value;
        const nextSearchParams = new URLSearchParams(searchParams);

        if (newQuery !== "") {
            nextSearchParams.set("query", newQuery);
        } else {
            nextSearchParams.delete("query");
        }
        setSearchParams(nextSearchParams);
    }

      const url = `https://api.themoviedb.org/3/search/movie?query=${debounceQuery}&include_adult=false&language=en-US&page=1`;
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
                return setMovieSearch(response.data.results);
            } catch {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData()
        
    }, [debounceQuery])

    


    return (
        <div>
            {isError && <p>Something went wrong</p>}
            {isLoading && <strong>Loading...</strong>}
            <input type="text" value={query} onChange={changeSearhParams} />

            {movieSearch.length > 0 && (<MovieList movies={movieSearch} />)}

            {/* {movieSearch.length > 0 && (
                <ul>
                    {movieSearch.map(item => (
                        <li key={item.id}>
                            <Link to={`/movies/${item.id}`} state={location}>
                            <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title} />
                            <h2>{`${item.original_title} (${item.release_date.slice(0, 4)})`}</h2>
                            </Link>
                        </li>
                    ))}
                </ul>
            )} */}

        </div>
    )
}

