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

const BankAccountService = {
    // create BankAccount
    createBankAccountData: async (ticketTypeData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/BankAccount`, {
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

    // get all BankAccounts.
    getAllBankAccountData: async (): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/BankAccount`, fetchOptions());
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

    // get BankAccount by id.
    getBankAccountById: async (BankAccountId: string): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/BankAccount/${BankAccountId}`, fetchOptions());
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error: any) {
            console.error('Error fetching BankAccount by ID:', error.message);
            throw error;
        }
    },

    // update BankAccount data.
    updateBankAccount: async (BankAccountId: string, updatedData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/BankAccount/${BankAccountId}`, {
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

    // addUserToBank: async (userId: string, userData: any): Promise<any> => {
    //     try {
    //         if (userId === 'chPartner') {
    //             const response = await fetch(`${API_URL}/addUserToBank`, fetchOptions());
    //             if (!response.ok) {
    //                 throw new Error(`HTTP error! Status: ${response.status}`);
    //             }
    //             const data = await response.json();
    //             return data;
    //         } else if (userId === 'driver') {
    //         } else if (userId === 'fleetOwner') {
    //         }
    //     } catch (error: any) {
    //         console.error('Error adding user to bank account:', error.message);
    //         throw error;
    //     }
    // },
};
export const { createBankAccountData, getAllBankAccountData, getBankAccountById, updateBankAccount } = BankAccountService;
