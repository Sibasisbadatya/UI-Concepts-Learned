import React from 'react'
import { NavLink, Outlet } from 'react-router'

const DashLayout = () => {
    return (
        <>
            <h2>Dashboard</h2>
            <nav>
                <NavLink to={"profile/3180"}>Profile</NavLink> | {""}
                <NavLink to={"setting"}>Setting</NavLink>
            </nav>
            <Outlet />
        </>
    )
}
export default DashLayout
