import React, { useState } from 'react'
import axios from 'axios';
import '../App.css';
import NewPost from './NewPost';

function Login() {

    const initialUsername = '';
    const initialPassword = '';
    const initialSignedIn = (window.localStorage.loggedInUser) ? JSON.parse(window.localStorage.loggedInUser) : false;
    const initialErrors = [];
	const [ username, setUsername ] = useState(initialUsername);
	const [ password, setPassword ] = useState(initialPassword);
	const [ signedIn, setSignedIn ] = useState(initialSignedIn);
    const [ errors, setErrors ] = useState(initialErrors);
    
    const updateUsername = (event) => {
        setUsername(event.target.value)
    }

    const updatePassword = (event) => {
        setPassword(event.target.value)
    }

    const loginUser = (event) => {
        event.preventDefault();
		// GraphQL
		axios({
			url: 'https://wpapi.local/graphql',
			method: 'post',
			data: {
				query: `mutation LoginUser{
                    login( input: {
                        clientMutationId: "uniqueId",
                        username: "${username}",
                        password: "${password}"
                    } ) {
                        authToken
                        user {
                            id
                            name
                        }
                    }
                }`
			}
		})
			.then((response) => {
				console.log(response);
                if(response.data.errors) {
                    setErrors(
                        response.data.errors.map(error => {
                            return error.message;
                        })
                    );
                }
                if(response.data.data.login) {
                    window.localStorage.loggedInUser = JSON.stringify(response.data.data.login);
                    setSignedIn(response.data.data.login);
                }
			})
			.catch((error) => {
				let errorPosts = [];
				errorPosts.message = '🤷‍♀️ Looks like we couldn\'t login you in... 🤷‍♂️';
			});
	}

    return (
        <>
            {signedIn &&
                <NewPost signedIn={signedIn}/>
            }

            {!signedIn &&
            <div className="card">
                <div className="card-body dark-bg">
                    <h3>Login</h3>
                    <form className="input-group">
                        <label 
                            htmlFor="username" 
                            className="form-label">Username</label>
                        <input 
                            className="form-control" 
                            name="username" 
                            type="text" 
                            placeholder="Username" 
                            onChange={updateUsername}
                            value={username}/>{" "}
                        <label 
                            htmlFor="password" 
                            className="form-label">Password</label>
                        <input 
                            className="form-control" 
                            name="password" 
                            type="password" 
                            placeholder="Password" 
                            onChange={updatePassword}
                            value={password}/>{" "}
                        <button 
                            className="btn btn-primary" 
                            type="submit"
                            onClick={loginUser}>Login</button>
                    </form>
                    {errors.length &&
                            <p className="fetching-text">{errors.join(', ')}</p>
                    }
                </div>
            </div>
            }
        </>
    )
}

export default Login