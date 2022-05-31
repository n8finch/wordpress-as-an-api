import React, { useState } from 'react'
import axios from 'axios';
import '../App.css';

function NewPost(props) {

    const initialTitle = '';
    const initialContent = '';
    const initialStatus = 'DRAFT';
    const initialErrors = [];
	const [ title, setTitle ] = useState(initialTitle);
	const [ content, setContent ] = useState(initialContent);
	const [ status, setStatus ] = useState(initialStatus);
	const [ errors, setErrors ] = useState(initialErrors);
    
    const updateTitle = (event) => {
        setTitle(event.target.value);
    }

    const updateContent = (event) => {
        setContent(event.target.value);
    }

    const updateStatus = (event) => {
        setStatus((event.target.checked) ? 'PUBLISH' : 'DRAFT');
    }

    const createPost = (event) => {
        event.preventDefault();

		axios({
			url: 'https://wpapi.local/graphql',
			method: 'post',
			data: {
				query: `mutation CREATE_POST {
                    createPost(input: {
                        clientMutationId: "CreatePost"
                        title: "${title}"
                        content: "${content}"
                        status: ${status}
                    }) {
                        post {
                            id
                            title
                            content
                            status
                        }
                    }
                }`
			},
            headers: { 
                'Authorization': `Bearer ${props.signedIn.authToken}`, 
                'Content-Type': 'application/json'
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
			})
			.catch((error) => {
				let errorPublish = [];
				errorPublish.message = '🤷‍♀️ Looks like we couldn\'t create a post... 🤷‍♂️';
                console.log(error)
			});
	}

    return (
        <>
            {props.signedIn &&
            <div className="card">
                <div className="card-body dark-bg">
                    <h3>New Post</h3>
                    <form className="input-group">
                        <label 
                            htmlFor="title" 
                            className="form-label">Title</label>
                        <input 
                            id="title"
                            className="form-control" 
                            name="title" 
                            type="text" 
                            placeholder="Title" 
                            onChange={updateTitle}
                            value={title}/>{" "}
                        <label 
                            htmlFor="content" 
                            className="form-label">Content</label>
                        <textarea 
                            id="content"
                            className="form-control" 
                            name="content" 
                            type="content" 
                            rows="10"
                            placeholder="Content" 
                            onChange={updateContent}
                            value={content}
                            ></textarea>{" "}
                        <label 
                            htmlFor="status" 
                            className="form-label">Publish?
                            <input
                                id="status"
                                className="form-control" 
                                name="status" 
                                type="checkbox" 
                                onChange={updateStatus}
                                value={status}/>{" "}
                            </label>
                        <button 
                            className="btn btn-primary" 
                            type="submit"
                            style={{margin: 'auto'}}
                            onClick={createPost}>Post!</button>
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

export default NewPost