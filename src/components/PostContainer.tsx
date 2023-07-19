import React from 'react';
import { postApi } from '../services/PostService';
import PostItem from './PostItem';
import { IPost } from '../models/IPost';

const PostContainer = () => {
    const {data: posts, error, isLoading} = postApi.useFetchAllPostsQuery(100);
    const [createPost, {}] = postApi.useCreatePostMutation();
    const [removePost, {}] = postApi.useDeletePostMutation();
    const [updatePost, {}] = postApi.useUpdatePostMutation();

    const handleCreatePost = async () => {
        const title = prompt();
        await createPost({title, body: title} as IPost)
    }

    const handleRemovePost = (post: IPost) => {
        removePost(post);
    }

    const handleUpdatePost = (post: IPost) => {
        updatePost(post);
    }

    return (
        <div>
            <div className="post-list">
                <button onClick={handleCreatePost}>Add new post</button>
                {isLoading && <h1>Loading...</h1>}
                {error && <h1>Something went wrong</h1>}
                {posts && posts.map(post =>
                    <PostItem remove={handleRemovePost} update={handleUpdatePost} key={post.id} post={post}/>
                )}
            </div>
        </div>
    );
};

export default PostContainer;
