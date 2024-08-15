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

const SubscriptionService = {
    // create Subscription
    createSubscriptionData: async (ticketTypeData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/Subscription`, {
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

    // get all Subscriptions.
    getAllSubscriptionData: async (): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/Subscription`, fetchOptions());
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

    // get Subscription by id.
    getSubscriptionById: async (SubscriptionId: string): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/Subscription/${SubscriptionId}`, fetchOptions());
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error: any) {
            console.error('Error fetching Subscription by ID:', error.message);
            throw error;
        }
    },

    // update Subscription data.
    updateSubscription: async (SubscriptionId: string, updatedData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/Subscription/${SubscriptionId}`, {
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
export const { createSubscriptionData, getAllSubscriptionData, getSubscriptionById, updateSubscription } = SubscriptionService;
