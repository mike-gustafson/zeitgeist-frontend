import React, { useState, useEffect, useContext, useRef } from 'react';
import { getAllPosts } from '../../services/postService';
import Post from '../Post/Post';
import NewPost from '../NewPost/NewPost';
import EditPost from '../EditPost/EditPost';
import SignInForm from '../SignInForm/SignInForm';
import { UserContext } from '../../contexts/UserContext';
import io from 'socket.io-client';
const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;
import "./Feed.css";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('mostLiked');
  const [editingPost, setEditingPost] = useState(null);
  const { user } = useContext(UserContext);

  const sortByRef = useRef(sortBy);
  useEffect(() => {
    sortByRef.current = sortBy;
  }, [sortBy]);

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

  useEffect(() => {
    const socket = io(BASE_URL);
    socket.on('newPost', (data) => {
      if (data.post) {
        setPosts(prevPosts => sortPosts([data.post, ...prevPosts], sortByRef.current));
      }
    });
    socket.on('postUpdated', (data) => {
      if (data.post) {
        updatePost(data.post);
      }
    });
    socket.on('postDeleted', (data) => { 
      if (data.postId) {
        setPosts(prevPosts => prevPosts.filter(post => post._id !== data.postId));
      }
    });
    return () => socket.disconnect();
  }, []);

  return (
    <main className="main">
      <div className="feed">
        {posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            onUpdatePost={updatePost}
            onEditPost={(post) => setEditingPost(post)}
          />
        ))}
      </div>
      <div className="sidebar">
        {user ? (
          editingPost ? (
            <EditPost
              post={editingPost}
              onCancel={() => setEditingPost(null)}
              onUpdatePost={(updatedPost) => {
                updatePost(updatedPost);
                setEditingPost(null);
              }}
            />
          ) : (
            <NewPost />
          )
        ) : (
          <SignInForm />
        )}
      </div>
    </main>
  );
};

export default Feed;
