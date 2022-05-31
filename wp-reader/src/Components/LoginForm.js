import React, { useState } from 'react'
import axios from 'axios';
import '../App.css';

function LoginForm() {

    const initialLogin = '';
    const initialPassword = '';
    const initialUser = (window.localStorage.loggedInUser) ? JSON.parse(window.localStorage.loggedInUser) : {};
	const [ login, setLogin ] = useState(initialLogin);
	const [ password, setPassword ] = useState(initialPassword);
	const [ user, setUser ] = useState(initialUser);

    console.log(user)

    const updateLogin = (event) => {
        setLogin(event.target.value)
    }

    const updatePassword = (event) => {
        setPassword(event.target.value)
    }

    const loginUser = (event) => {
        event.preventDefault();
        console.log(login)
        console.log(password)

		// GraphQL
		axios({
			url: 'https://wpapi.local/graphql',
			method: 'post',
			data: {
				query: `mutation LoginUser{
                    login( input: {
                        clientMutationId: "uniqueId",
                        username: "asdf",
                        password: "asdf"
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
                if(response.data.data.login) {
                    window.localStorage.loggedInUser = JSON.stringify(response.data.data.login);
                    setUser(response.data.data.login);
                }
			})
			.catch((error) => {
				let errorPosts = [];
				errorPosts.message = '🤷‍♀️ Looks like we couldn\'t login you in... 🤷‍♂️';
			});
	}


    return (
        <div className="card">
            <div className="card-body">
                <h3>Login</h3>
                <form className="input-group">
                    <label 
                        htmlFor="login" 
                        className="form-label">Login</label>
                    <input 
                        className="form-control" 
                        name="login" 
                        type="text" 
                        placeholder="Login" 
                        onChange={updateLogin}
                        value={login}/>{" "}
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
            </div>
        </div>
    )
}

export default LoginForm