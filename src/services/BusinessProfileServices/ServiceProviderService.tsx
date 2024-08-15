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

const BprofileS_ProviderService = {
    // create S_Provider
    createS_ProviderData: async (ticketTypeData: any): Promise<any> => {
        try {
            // const response = await fetch(`${API_URL2}/S_Provider`, {
            //     method: 'POST',
            //     ...fetchOptions(),
            //     body: JSON.stringify(ticketTypeData),
            // });
            // if (!response.ok) {
            //     throw new Error(`HTTP error! Status: ${response.status}`);
            // }
            // const responseData = await response.json();
            // return responseData;
        } catch (error: any) {
            console.error('Error creating ticket type:', error.message);
            throw error;
        }
    },

    // get all S_Providers.
    getAllS_ProviderData: async (): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/S_Provider`, fetchOptions());

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

    // get S_Provider by id
    getS_ProviderById: async (S_ProviderId: string): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/S_Provider/${S_ProviderId}`, fetchOptions());
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error: any) {
            console.error('Error fetching S_Provider by ID:', error.message);
            throw error;
        }
    },

    updateS_Provider: async (S_ProviderId: string, updatedData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/S_Provider/${S_ProviderId}`, {
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
export const { createS_ProviderData, getAllS_ProviderData, getS_ProviderById, updateS_Provider } = BprofileS_ProviderService;
