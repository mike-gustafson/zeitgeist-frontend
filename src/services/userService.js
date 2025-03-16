const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;

const index = async () => {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE_URL}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
    };

    export {
        index,
    };