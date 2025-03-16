import React, { useState, useEffect, useRef, useContext } from 'react';
import "./Post.css";
import io from 'socket.io-client';
const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;
import { vote } from "../../services/postService";
import { FaThumbsUp, FaThumbsDown, FaEdit, FaTrash } from 'react-icons/fa';
import { UserContext } from '../../contexts/UserContext';

const Post = ({ post, onUpdatePost }) => {

  const [votes, setVotes] = useState(post.currentVoteTotal);
  const [userVoted, setUserVoted] = useState(post.currentUserVote);
  const [usersVote, setUsersVote] = useState(post.currentUserVote !== null);
  const { user } = useContext(UserContext);

  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(BASE_URL);
    socketRef.current.on('vote', (data) => {
      if (data.postId === post._id) {
        setVotes(data.newVoteTotal);
        onUpdatePost({ ...post, currentVoteTotal: data.newVoteTotal });
      }
    });
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [post._id, post, onUpdatePost]);

  useEffect(() => {
    setVotes(post.currentVoteTotal);
  }, [post.currentVoteTotal]);

  useEffect(() => {
    if(post.currentUserVote) { 
        setUsersVote(post.currentUserVote);
        setUserVoted(true); 
    }
  }, [post.votes]);

  const handleUpvote = async () => {
    if (userVoted && usersVote === 1) return;
    try {
      const updatedPost = await vote(post._id, 'upvote');
      onUpdatePost(updatedPost);
      setUserVoted(true);
      setUsersVote(1);
    } catch (error) {
      console.error("Error upvoting the post:", error);
    }
  };

  const handleDownvote = async () => {
    if (userVoted && usersVote === -1) return;
    try {
      const updatedPost = await vote(post._id, 'downvote');
      onUpdatePost(updatedPost);
      setUserVoted(true);
      setUsersVote(-1);
    } catch (error) {
      console.error("Error downvoting the post:", error);
    }
  };

  const linkUrl = /^https?:\/\//i.test(post.link) ? post.link : `http://${post.link}`;
   
  return (
    <main key={post._id} className="post">
      <div className="post-header">
        <a href={linkUrl} className="post-title" target="_blank" rel="noopener noreferrer">
          {post.title}
        </a>
        {
        user && (post.user._id === user._id) && (
          <div className="post-actions">
            <span className="post-edit action-icon">
              <FaEdit />
            </span>
            <span className="post-delete action-icon">
              <FaTrash />
            </span>
          </div>
        )
        }
        
        
      </div>
      <div className="post-body">
        <div className="post-left">
          <div className="post-votes-container">
            <p className="post-votes">{votes}</p>
            { user && (
                <>
                    <span
                    className={`vote-icon ${usersVote === 1 ? 'voted' : ''}`}
                    onClick={(!userVoted || (userVoted && usersVote === -1)) ? handleUpvote : undefined}
                    >
                    <FaThumbsUp />
                    </span>
                    <span
                    className={`vote-icon ${usersVote === -1 ? 'voted' : ''}`}
                    onClick={(!userVoted || (userVoted && usersVote === 1)) ? handleDownvote : undefined}
                    >
                    <FaThumbsDown />
                    </span>
                </>
            )}
          </div>
        </div>
        <div className="post-right">
          <p>{post.description}</p>
          <p>Posted by: {post.user.username}</p>
        </div>
      </div>
    </main>
  );
};

export default Post;
