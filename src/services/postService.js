const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/posts`;

const getAllUsersPosts = async () => {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE_URL}`);
        const data = await res.json();
        if (data.err) {
        throw new Error(data.err);
        }
        return data;
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
}

const getAllPosts = async () => {
    try {
        const token = localStorage.getItem('token');
        const headers = {}
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
        const res = await fetch(`${BASE_URL}`, 
            headers
          );
        const data = await res.json();
        if (data.err) {
        throw new Error(data.err);
        }
        return data;
    }
    catch (err) {
        console.log(err);
        throw new Error(err);
    }
}

const getTopPosts = async () => {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE_URL}/top`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        const data = await res.json();
        if (data.err) {
        throw new Error(data.err);
        }
        return data;
    }
    catch (err) {
        console.log(err);
        throw new Error(err);
    }   
}

const getRecentPosts = async () => {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE_URL}/recent`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        const data = await res.json();
        if (data.err) {
        throw new Error(data.err);
        }
        return data;
    }
    catch (err) {
        console.log(err);
        throw new Error(err);
    }
}

const createPost = async (formData) => {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.err) {
        throw new Error(data.err);
        }
        return getAllPosts();
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};

const vote = async (postId, voteType) => {
    try {
        const token = localStorage.getItem('token');
        const voteValue = voteType === 'upvote' ? 1 : -1;
        const res = await fetch(`${BASE_URL}/${postId}/vote`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ voteValue }),
        });
        const data = await res.json();
        if (data.err) {
        throw new Error(data.err);
        }
        return data;
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
}

export {
    getAllUsersPosts,
    createPost,
    getAllPosts,
    getTopPosts,
    getRecentPosts,
    vote
};
