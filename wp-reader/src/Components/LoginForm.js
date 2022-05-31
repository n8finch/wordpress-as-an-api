
function LoginForm(props) {

    const post = props.post;
    
    // We probably don't need to show the whoooooooooooole text.
    const trimmedText = ( 500 < post.content.rendered.length ) ? post.content.rendered.substring(0, 450) + "..." : post.content.rendered;

    return (
        <div className="card">
            <div className="card-body">
                { post.featured_image_src &&
                    <img src={post.featured_image_src} className="card-img-top" alt={post.title.rendered} />
                }
                <h5 className="card-title" data-testid="cardTitle">{post.title.rendered}</h5>
                <p>Rating: {post.rating} </p>
                <div dangerouslySetInnerHTML={{__html: trimmedText}} />
                <br/>
                <a href={post.permalink} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Read More...</a>
            </div>
        </div>
    )
}

export default LoginForm