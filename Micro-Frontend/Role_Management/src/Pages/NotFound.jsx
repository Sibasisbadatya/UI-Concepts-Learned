import React from 'react'
import { NavLink } from 'react-router'

const NotFound = () => {
    return (
        <>
            Page Not Found
            <NavLink to={"/"}>Go To Home Page</NavLink>
        </>
    )
}
export default NotFound
