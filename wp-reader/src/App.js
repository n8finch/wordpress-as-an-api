import React, { useState } from 'react'
import axios from 'axios';
import './App.css';
import wpImg from './assets/wp.png';
import PostList from './Components/PostList';

function App() {
	
	// Setup some initial variables and states.
	const url = 'https://wpapi.local/wp-json/wp/v2/posts';
	const initialPosts = [];
	const initialSource = '';

	const [ fetching, setFetching ] = useState(false);
	const [ posts, setPosts ] = useState(initialPosts);
	const [ source, setSource ] = useState(initialSource);

	const resetPosts = () => {
		// Setting this to true gives us the fun bone and dog spinner.	
		setFetching(true);
		setPosts(initialPosts);
		setSource(initialSource);
	}

	/**
	 * Get the posts.
	 * 
	 * @param {string} searchString string from the SearchBox component. 
	 * @param {string} extras suffix for adding the before/after and count to the request.
	 * @param {string} pagination whether this is a new request from the searchbox or a previous or next page request.
	 */
	const getPosts = ({searchString}, extras = '', pagination = 'new' ) => {
		resetPosts();

		axios.get( url )
			.then((response) => {
				console.log(response);
				setPosts(response.data);			
				setSource('rest');
				setFetching(false);

				window.scrollTo(0, 0);
			})
			.catch((error) => {
				let errorPosts = initialPosts;
				errorPosts.message = '🤷‍♀️ Looks like there were no results for that one... 🤷‍♂️';

				setPosts(errorPosts);
				setFetching(false);
			});
	}

	const getPostsGQL = ({searchString}, extras = '', pagination = 'new' ) => {
		resetPosts();

		// GraphQL
		axios({
			url: 'https://wpapi.local/graphql',
			method: 'post',
			data: {
				query: `{
				    posts {
						edges {
							node {
							id
							title
							content
							databaseId
							featuredImage {
								node {
								altText
								sourceUrl(size: MEDIUM_LARGE)
								}
							}
							}
						}
						pageInfo {
							hasNextPage
							startCursor
							endCursor
						}
					}
				}`
			}
		})
			.then((response) => {
				console.log(response.data.data.posts.edges);
				setPosts(transformGraphQL(response.data.data.posts.edges));			
				setSource('graphql');			
				setFetching(false);
			})
			.catch((error) => {
				let errorPosts = initialPosts;
				errorPosts.message = '🤷‍♀️ Looks like there were no results for that one... 🤷‍♂️';
				setPosts(errorPosts);
				setFetching(false);
			});
	}

	const transformGraphQL = (data) => {
		const posts = data.map(({node}) => {
			return {...node};
		})
		console.log(posts);
		return posts;
	}

	return (
		<div className="App">
			<header className="App-header">
				<img src={wpImg} className="logo" alt="logo"/>
				<h1 className="App-logo" alt="logo"> WP Reader</h1>
				<button className="btn btn-primary" data-testid="searchPosts" onClick={getPosts} disabled={fetching ? 'disabled' : ''}>🔍 REST FetchIt</button>
				{" "}
				<button className="btn btn-primary" data-testid="searchPosts" onClick={getPostsGQL} disabled={fetching ? 'disabled' : ''}>🔍 GraphQL FetchIt</button>
			</header>

			{fetching && <p className="fetching-text"> <span className="bone-fetch">🦴</span> Going fetch 🐶</p>}

			{posts.length > 0 && 
				<>
					<PostList posts={posts} source={source}/>
				</>
			}

			{ ( !posts.children || 0 === posts.length )  && posts.message !== '' && 
				<p className="no-results-message">{posts.message}</p>
			}
			
		</div>
	);
}

export default App;
