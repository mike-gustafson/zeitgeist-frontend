// src/components/Dashboard/Dashboard.jsx

import { useContext, useEffect, useState } from 'react';

import { index } from '../../services/userService';
import { UserContext } from '../../contexts/UserContext';
import { getAllUsersPosts } from '../../services/postService';
import NewPost from '../NewPost/NewPost';
import Post from '../Post/Post';


const Dashboard = () => {
    const { user } = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [usersPosts, setUsersPosts] = useState([]);

    useEffect(() => {
      const fetchUsers = async () => {
          const allUsers = await index();
          setUsers(Array.isArray(allUsers) ? allUsers : []);
      };
      const fetchPosts = async () => {
          const allPosts = await getAllUsersPosts();
          setUsersPosts(Array.isArray(allPosts.posts) ? allPosts.posts : []);
      }
      fetchUsers();
      fetchPosts();
    }
    , []);

  return (
    <main>
        <h1>Welcome, {user.username}</h1>
        <p>
            This is the dashboard page where you can see a list of all the users.
        </p>
        <ul>
            {users.map((user) => (
                <li key={user._id}>{user.username}</li>
            ))}
        </ul>
        <NewPost />
        <h2>Posts</h2>
        <ul>
            {usersPosts.map((post) => (
                <Post key={post._id} post={post} />
            ))}
        </ul>
    </main>
  );
};

export default Dashboard;

