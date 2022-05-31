function PostQL(props) {

    const post = props.post;
    
    // We probably don't need to show the whoooooooooooole text.
    const trimmedText = ( 500 < post.content.length ) ? post.content.substring(0, 450) + "..." : post.content;

    return (
        <div className="card">
            <div className="card-body">
                { post.featuredImage &&
                    <img src={post.featuredImage.node.sourceUrl} className="card-img-top" alt={post.featuredImage.node.altText} />
                }
                <h5 className="card-title" data-testid="cardTitle">{post.title}</h5>
                <p>Rating: {post.rating} </p>
                <div dangerouslySetInnerHTML={{__html: trimmedText}} />
                <br/>
                <a href={post.permalink} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Read More...</a>
            </div>
        </div>
    )
}

export default PostQL