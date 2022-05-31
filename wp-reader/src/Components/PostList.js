import Post from "./Post";
import PostQL from "./PostQL";

function PostList(props) {

    const posts = props.posts;

    return( 
        <div className="RedditList">
            <br/>
            <h3>Showing results for {posts.length} Posts</h3>
            <br/>
            { posts.map((post, index) => {
                let item;
                if('rest' === props.source) {
                    item = <Post key={index} post={post}/>
                }
                if('graphql' === props.source) {
                    item = <PostQL key={index} post={post}/>
                }
                return item;
            })}
        </div>
    );

}

export default PostList;