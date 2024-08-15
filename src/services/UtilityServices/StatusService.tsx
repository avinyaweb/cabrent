const API_URL2 = import.meta.env.VITE_ADMIN_API_URL2;

// Retrieve the bearer token from local storage on page load
const fetchOptions = () => {
    const bearerToken = localStorage.getItem('bearerToken');
    return {
        headers: {
            Authorization: `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',
        },
    };
};

const StatusService = {
    // create state
    createStatus: async (statusData: any): Promise<any> => {
        try {
            console.log('statusData' + statusData);

            const response = await fetch(`${API_URL2}/archive`, {
                method: 'POST',
                ...fetchOptions(),
                body: JSON.stringify(statusData),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseData = await response.json();
            console.log('Sucsuss the response data');
            return responseData;
        } catch (error: any) {
            console.error('Error creating status type:', error.message);
            throw error;
        }
    },

    // get all states.
    getAllStatus: async (): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/archive`, fetchOptions());

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            return data;
        } catch (error: any) {
            console.error('Error fetching status data:', error.message);
            throw error;
        }
    },

    // get state by id
    getStatusById: async (statusId: string): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/archive/${statusId}`, fetchOptions());
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error: any) {
            console.error('Error fetching status by ID:', error.message);
            throw error;
        }
    },

    updateStatus: async (statusId: string, updatedData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/archive/${statusId}`, {
                method: 'PUT',
                ...fetchOptions(),
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseData = await response.json();
            return responseData;
        } catch (error: any) {
            console.error('Error updating status data:', error.message);
            throw error;
        }
    },
};
export const { createStatus, getAllStatus, getStatusById, updateStatus } = StatusService;
