import { NavLink } from "react-router-dom"
import css from './Navigation.module.css'
import clsx from 'clsx'

export default function Navigation() {

    const isActiveClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.isActive)
}
    return (
        <div>
            <header>
                <nav className={css.nav}>
                    <NavLink to="/" className={isActiveClass}>Home</NavLink>
                    <NavLink to="/movies" className={isActiveClass}>Movies</NavLink>
                </nav>
            </header>
        </div>
    )
}