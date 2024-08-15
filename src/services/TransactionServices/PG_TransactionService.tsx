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

const PGTransactionService = {
    // create PGTransaction
    createPGTransactionData: async (ticketTypeData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/PGTransaction`, {
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

    // get all PGTransactions.
    getAllPGTransactionData: async (): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/PGTransaction`, fetchOptions());
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

    // get PGTransaction by id.
    getPGTransactionById: async (PGTransactionId: string): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/PGTransaction/${PGTransactionId}`, fetchOptions());
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error: any) {
            console.error('Error fetching PGTransaction by ID:', error.message);
            throw error;
        }
    },

    // update PGTransaction data.
    updatePGTransaction: async (PGTransactionId: string, updatedData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/PGTransaction/${PGTransactionId}`, {
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
export const { createPGTransactionData, getAllPGTransactionData, getPGTransactionById, updatePGTransaction } = PGTransactionService;
