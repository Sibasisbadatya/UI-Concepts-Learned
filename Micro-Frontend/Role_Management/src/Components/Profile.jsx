import React from 'react'
import { useParams } from 'react-router'

const Profile = () => {
    const { id } = useParams();
    return (
        <div>Profile Page of {id}</div>
    )
}
export default Profile
