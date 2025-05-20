import css from './MovieList.module.css'
import { Link, useLocation } from "react-router-dom"

export default function MovieList({ movies }) {
    const location = useLocation()
    return (
        <div>
                <ul className={css.container}>
                    {movies.map(item => (
                        <li key={item.id} className={css.item}>
                            <Link to={`/movies/${item.id}`} state={location}>
                            <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title} />
                            {/* <h2>{`${item.original_title} (${item.release_date.slice(0, 4)})`}</h2> */}
                            </Link>
                        </li>
                    ))}
                </ul>
        </div>

    )
}