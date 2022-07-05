import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import './MainNavigation.css'

export default function MainNavigation() {
    const token = localStorage.getItem('token')
    const logout = () => localStorage.clear()
    const expiryDate = +localStorage.getItem('expiryDate')
    const today = new Date()
    const todayDate = today.getTime()

    useEffect(() => {
        if (expiryDate < todayDate) {
            logout()
        }
    }, [expiryDate, todayDate])

    return (
        <header className='main-navigation'>
            <div className='main-navigation__logo'>
                <h2>Events Bookings</h2>
            </div>
            <nav className='main-navigation__items'>
                <ul>
                    {!token && <li>< NavLink to="/auth">Authenticate</NavLink></li>}
                    <li>< NavLink to="/events">Events</NavLink></li>
                    {token && <li>< NavLink to="/bookings">Bookings</NavLink></li>}
                    {token && <li><NavLink to="/" exact><div onClick={logout}>Logout</div></NavLink></li>}
                </ul>
            </nav>
        </header>
    )
}
