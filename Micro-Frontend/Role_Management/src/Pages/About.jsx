import React, { Suspense } from 'react'
import { useLocation, useLoaderData, Await } from 'react-router';
const About = () => {
    console.log("About component loaded");
    const location = useLocation();
    console.log("LOcation", location);

    const { users } = useLoaderData();
    console.log("Users", users);
    return (
        <>
            <div>About</div>
            <Suspense fallback={<h2>Loading users...</h2>}>
            {/* Suspense for Purpose: Show a loading UI while waiting for async data. */}
                <Await resolve={users}>
                {/* Await is a React Router component.
                It waits for the Promise passed in resolve. */}
                    {(data) =>
                        data.map(user => (
                            <div key={user.id}>
                                <h3>{user.name}</h3>
                            </div>
                        ))
                    }
                </Await>
            </Suspense>
        </>
    )
}

export default About