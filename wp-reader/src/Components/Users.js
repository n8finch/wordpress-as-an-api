import React, { useState } from 'react'
import axios from 'axios';

function Users(props) {
    const initialUsers = [];
	const [ users, setUsers ] = useState(initialUsers);

    const getUsers = () => {
		// GraphQL
		axios({
			url: 'https://wpapi.local/graphql',
			method: 'post',
			data: {
				query: `{
                    users {
                        edges {
                            node {
                                firstName
                                name
                                slug
                                username
                            }
                        }
                    }
                }`
			},
            headers: {
                Authorization: `Bearer: ${props.signedIn.authToken}`
            }
		})
			.then((response) => {
                console.log(response.data.data.users.edges)
                const userList = props.user.edges.map(({node}) => {
                    return {...node};
                })
                console.log(userList)
                setUsers(response);
			})
			.catch((error) => {
				let errorPosts = [];
				errorPosts.message = '🤷‍♀️ Looks like we couldn\'t get the users... 🤷‍♂️';
			});    
    }

    getUsers();
    return(
        <>
        </>
    );
    // return( 
    //     <div className="Users">
    //         <br/>
    //         <h3>Users:</h3>
    //         <br/>
    //         { users.map((user, index) => {
    //             return <User key={index} user={user}/>;
    //         })}
    //     </div>
    // );
}

export default Users;