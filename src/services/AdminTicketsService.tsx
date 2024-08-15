const API_URL = import.meta.env.VITE_ADMIN_API_URL;

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

const AdminTicketsService = {
    getAdminTicketsData: async (): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/adminTickets`, fetchOptions());

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Fetched Data:', data);
            return data;
        } catch (error: any) {
            console.error('Error fetching admin tickets data:', error.message);
            throw error;
        }
    },

    createAdminTicketsData: async (adminTicketsData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/adminTicket`, {
                method: 'POST',
                ...fetchOptions(),
                body: JSON.stringify(adminTicketsData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('Created Data:', responseData);
            return responseData;
        } catch (error: any) {
            console.error('Error creating admin data:', error.message);
            throw error;
        }
    },

    getAdminTicketsById: async (adminTicketsId: string): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/adminTicket/${adminTicketsId}`, fetchOptions());

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error: any) {
            console.error('Error fetching admin by ID:', error.message);
            throw error;
        }
    },

    updateAdminTickets: async (adminTicketsId: string, updatedData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/adminTickets/${adminTicketsId}`, {
                method: 'PUT',
                ...fetchOptions(),
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('Updated Admin Data:', responseData);
            return responseData;
        } catch (error: any) {
            console.error('Error updating admin data:', error.message);
            throw error;
        }
    },
};

export const { getAdminTicketsData, createAdminTicketsData, getAdminTicketsById, updateAdminTickets } = AdminTicketsService;
