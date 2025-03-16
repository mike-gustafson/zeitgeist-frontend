import React, { useState, useEffect, useContext } from 'react';
import { getAllPosts } from '../../services/postService';
import Post from '../Post/Post';
import NewPost from '../NewPost/NewPost';
import SignInForm from '../SignInForm/SignInForm';
import { UserContext } from '../../contexts/UserContext';

import "./Feed.css";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('mostLiked');
  const [filter, setFilter] = useState('all');
  const {user} = useContext(UserContext);

  const sortPosts = (posts, method) => {
    const postsCopy = [...posts];
    if (method === 'mostLiked') {
      return postsCopy.sort((a, b) => b.currentVoteTotal - a.currentVoteTotal);
    } else if (method === 'newest') {
      return postsCopy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return postsCopy;
  };

  const updatePost = (updatedPost) => {
    setPosts((prevPosts) => {
      const newPosts = prevPosts.map(post =>
        post._id === updatedPost._id ? updatedPost : post
      );
      return sortPosts(newPosts, sortBy);
    });
  };

  useEffect(() => {
    const fetchAndSortPosts = async () => {
      const allPosts = await getAllPosts();
      const postsData = Array.isArray(allPosts.posts) ? allPosts.posts : [];
      const sortedPosts = sortPosts(postsData, sortBy);
      setPosts(sortedPosts);
    };
    fetchAndSortPosts();
  }, [sortBy]);

    return (
      <main className="feed">
        <div className="feed-main">
          <ul>
              {posts.map((post) => (
                <Post key={post._id} post={post} onUpdatePost={updatePost} />
              ))}
          </ul>
        </div>
        <div className="feed-sidebar">
          {user && (
            <NewPost />
          )}
          {!user && (
            <SignInForm />
          )}
        </div>
      </main>
    );
  };
  
  export default Feed;
  
  