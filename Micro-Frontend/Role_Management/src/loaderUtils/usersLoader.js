

const fetchUsers = async () => {
    const users = fetch('https://jsonplaceholder.typicode.com/users')
        .then((res) => res.json())
        .catch((err) => console.log("error", err)
        );
    return {
        users
    };
}

export {
    fetchUsers
}