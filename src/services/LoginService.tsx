const API_URL = import.meta.env.VITE_ADMIN_API_URL;

// Retrieve the bearer token from local storage on page load
let accessToken: string;

const storedToken = localStorage.getItem('bearerToken');
if (storedToken !== null) {
    accessToken = storedToken;
}

const createAuthHeader = () => {
    let accessToken: string | null = localStorage.getItem('bearerToken');

    if (!accessToken) {
        console.error('Access token is undefined during logout.');
        accessToken = ''; // Set it to an empty string or any default value if needed
    }

    const headers = new Headers();
    headers.append('Authorization', `Bearer ${accessToken}`);
    return headers;
};

const LoginService = {
    login: async (phoneNumber: string, password: string) => {
        try {
            const formdata = new FormData();
            formdata.append('phoneNumber', phoneNumber);
            formdata.append('passwordHash', password);

            const requestOptions: RequestInit = {
                method: 'POST',
                headers: createAuthHeader(),
                body: formdata,
                redirect: 'follow',
            };

            const response = await fetch(`${API_URL}/admin/login`, requestOptions);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            // Update the accessToken with the new token received during login
            accessToken = data.bearerToken;

            // Store the new token in local storage
            localStorage.setItem('bearerToken', accessToken);

            // Process the data if needed
            return data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    logout: async () => {
        try {
            const requestOptions: RequestInit = {
                method: 'POST',
                headers: createAuthHeader(),
                redirect: 'follow',
            };

            const response = await fetch(`${API_URL}/admin/logout`, requestOptions);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            // Remove the token from local storage on logout
            localStorage.removeItem('bearerToken');

            return data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },
};

export default LoginService;
