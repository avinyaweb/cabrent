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

const AdminTeamsService = {
    getAdminTeamsData: async (): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/adminTeams`, fetchOptions());

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Fetched Data:', data);
            return data;
        } catch (error: any) {
            console.error('Error fetching admin data:', error.message);
            throw error;
        }
    },

    createAdminTeamsData: async (adminTeamsData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/adminTeams`, {
                method: 'POST',
                ...fetchOptions(),
                body: JSON.stringify(adminTeamsData),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseData = await response.json();
            return responseData;
        } catch (error: any) {
            console.error('Error creating admin data:', error.message);
            throw error;
        }
    },

    getAdminTeamsById: async (adminTeamsId: string): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/adminTeams/${adminTeamsId}`, fetchOptions());

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Fetched Admin by ID:', data);
            return data;
        } catch (error: any) {
            console.error('Error fetching admin by ID:', error.message);
            throw error;
        }
    },

    updateAdminTeams: async (adminTeamsId: string, updatedData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/adminTeams/${adminTeamsId}`, {
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

    // add a spcifid admin in to admin team list.
    assignTeamToMultipleAdmin: async (adminTeamsId: string, updatedData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/adminTeams/assignTeamToMultipleAdmin/${adminTeamsId}`, {
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

    // get all admin data's from admin team list.
    getAdminListData: async (adminTeamsId: string): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/adminTeams/adminList/${adminTeamsId}`, fetchOptions());

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error: any) {
            console.error('Error fetching admin data:', error.message);
            throw error;
        }
    },

    // remove admin from admin team list
    deleteAdminListFromTeams: async (adminTeamsId: string, adminData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/adminTeams/deleteAdminList/${adminTeamsId}`, {
                method: 'DELETE',
                ...fetchOptions(),
                body: JSON.stringify(adminData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error: any) {
            console.error('Error fetching admin data:', error.message);
            throw error;
        }
    },

    // create admin ticket against team.
    createAdminTicketAgainstTeam: async (formData: any, adminTeamsId: string): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/adminTeams/createAdminTicketAgainstTeam`, {
                method: 'POST',
                ...fetchOptions(),
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseData = await response.json();
            return responseData;
        } catch (error: any) {
            console.error('Error creating admin data:', error.message);
            throw error;
        }
    },
};

export const { getAdminTeamsData, createAdminTeamsData, getAdminTeamsById, updateAdminTeams, assignTeamToMultipleAdmin, getAdminListData, deleteAdminListFromTeams, createAdminTicketAgainstTeam } =
    AdminTeamsService;
