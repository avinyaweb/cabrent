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

const UtilityTicketTypeService = {
    // create ticket type
    createTicketType: async (ticketTypeData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/ticketType`, {
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

    // get all ticket types
    getTicketTypeData: async (): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/ticketType`, fetchOptions());
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

    // get a specific ticket type
    getTicketTypeById: async (ticketTypeId: string): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/ticketType/${ticketTypeId}`, fetchOptions());
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

    // update ticket type
    updateTicketType: async (ticketTypeId: string, updatedData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/ticketType/${ticketTypeId}`, {
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
            console.error('Error updating ticket type data:', error.message);
            throw error;
        }
    },
};

export const { createTicketType, getTicketTypeData, getTicketTypeById, updateTicketType } = UtilityTicketTypeService;
