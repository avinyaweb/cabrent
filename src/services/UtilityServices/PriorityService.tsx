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

const PriorityService = {
    // create state
    createPriority: async (PriorityData: any): Promise<any> => {
        try {
            console.log('PriorityData' + PriorityData);

            const response = await fetch(`${API_URL2}/archive`, {
                method: 'POST',
                ...fetchOptions(),
                body: JSON.stringify(PriorityData),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! priority: ${response.status}`);
            }
            const responseData = await response.json();
            console.log('Sucsuss the response data');
            return responseData;
        } catch (error: any) {
            console.error('Error creating priority type:', error.message);
            throw error;
        }
    },

    // get all states.
    getAllPriority: async (): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/archive`, fetchOptions());

            if (!response.ok) {
                throw new Error(`HTTP error! priority: ${response.status}`);
            }
            const data = await response.json();

            return data;
        } catch (error: any) {
            console.error('Error fetching priority data:', error.message);
            throw error;
        }
    },

    // get state by id
    getPriorityById: async (priorityId: string): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/archive/${priorityId}`, fetchOptions());
            if (!response.ok) {
                throw new Error(`HTTP error! priority: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error: any) {
            console.error('Error fetching priority by ID:', error.message);
            throw error;
        }
    },

    updatePriority: async (priorityId: string, updatedData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/archive/${priorityId}`, {
                method: 'PUT',
                ...fetchOptions(),
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! priority: ${response.status}`);
            }
            const responseData = await response.json();
            return responseData;
        } catch (error: any) {
            console.error('Error updating priority data:', error.message);
            throw error;
        }
    },
};
export const { createPriority, getAllPriority, getPriorityById, updatePriority } = PriorityService;
