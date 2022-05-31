import React, { useState } from 'react'

function SearchBox(props) {

	const initialSearch = { subreddit: '' };
	const [ search, setSearch ] = useState(initialSearch);

	const handleInputChange = event => {
		const { name, value } = event.target

		// Just alphanumerics and underscorse
		// I think this is all Reddit allows for... could not verify.
		const string = value.replace(/[^a-z0-9_]+/gi, '');

		setSearch({ ...search, [name]: string })
	}

	return (
		<form
			onSubmit={event => {
			event.preventDefault()
			if (!search.subreddit) return;

			props.getSubreddit(search)
			setSearch(initialSearch)
		}}
		>
			<div className="SearchBox input-group mb-3">
				<label htmlFor="subreddit">Enter the subreddit, no spaces<br/>only alphanumerics & underscores, please 🤓.</label>
				<div className="input-group-prepend">
					<span className="input-group-text">/</span>
				</div>

				<input type="text" className="form-control" placeholder="e.g: reactjs, news, wordpress_plugins, wallpapers, toys" aria-label="/wordpress" aria-describedby="button-addon2" data-testid="searchBox" id="subreddit" name="subreddit" value={search.subreddit} onChange={handleInputChange}
				/>

				<div className="input-group-append">
					<button className="btn btn-primary" data-testid="searchPosts" type="submit" disabled={props.fetching ? 'disabled' : ''}>🔍 Search</button>
				</div>
			</div>
		</form>
	);
}

export default SearchBox;