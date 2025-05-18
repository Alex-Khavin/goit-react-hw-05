import { Link } from 'react-router-dom'

export default function NotFoundPage() {
    return (
        <div>
            <p>Error 404. Page not found!</p>
            <Link to="/">Back Home Page!</Link>
        </div>
    )
}