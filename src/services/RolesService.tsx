const API_URL = import.meta.env.VITE_ADMIN_API_URL;
const API_URL2 = import.meta.env.VITE_ADMIN_API_URL2;

// Retrieve the bearer token from local storage on page load
const fetchOptions = () => {
    const bearerToken = localStorage.getItem('bearerToken');
    return {
        headers: {
            Authorization: bearerToken ? `Bearer ${bearerToken}` : '',
            'Content-Type': 'application/json',
        },
    };
};

const RolesService = {
    getRoleData: async (): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/role`, fetchOptions());

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

    getAllTeams: async (): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/adminTeams`, fetchOptions());

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

    getAllCountry: async (): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/country`, fetchOptions());

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

    getAllState: async (): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/state`, fetchOptions());
            console.log(response);

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

    getAllCity: async (): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/city`, fetchOptions());

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

    createRoleData: async (roleData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/role`, {
                method: 'POST',
                ...fetchOptions(),
                body: JSON.stringify(roleData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('Created Data:', responseData);
            return responseData;
        } catch (error: any) {
            console.error('Error creating Role data:', error.message);
            throw error;
        }
    },

    getRoleById: async (roleId: string): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/role/${roleId}`, fetchOptions());

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Fetched Role by ID:', data);
            return data;
        } catch (error: any) {
            console.error('Error fetching Role by ID:', error.message);
            throw error;
        }
    },

    updateRole: async (roleId: string, updatedData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/role/${roleId}`, {
                method: 'PUT',
                ...fetchOptions(),
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('Updated Role Data:', responseData);
            return responseData;
        } catch (error: any) {
            console.error('Error updating Role data:', error.message);
            throw error;
        }
    },
};

export const { getRoleData, getAllTeams, getAllCountry, getAllState, getAllCity, createRoleData, getRoleById, updateRole } = RolesService;
