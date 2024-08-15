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

const UtilityStateService = {
    // create state
    createStateData: async (ticketTypeData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/state`, {
                method: 'POST',
                ...fetchOptions(),
                body: JSON.stringify(ticketTypeData),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseData = await response.json();
            return responseData;
        } catch (error: any) {
            console.error('Error creating ticket type:', error.message);
            throw error;
        }
    },

    // get all states.
    getAllStateData: async (): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/state`, fetchOptions());

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            return data;
        } catch (error: any) {
            console.error('Error fetching Role data:', error.message);
            throw error;
        }
    },

    // get state by id
    getStateById: async (stateId: string): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/state/${stateId}`, fetchOptions());
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error: any) {
            console.error('Error fetching state by ID:', error.message);
            throw error;
        }
    },

    updateState: async (stateId: string, updatedData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/state/${stateId}`, {
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
            console.error('Error updating admin data:', error.message);
            throw error;
        }
    },
};
export const { createStateData, getAllStateData, getStateById, updateState } = UtilityStateService;
