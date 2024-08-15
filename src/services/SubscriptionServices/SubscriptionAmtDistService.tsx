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

const SubsAmtDistributionService = {
    // create SubsAmtDistribution
    createSubsAmtDistributionData: async (ticketTypeData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/SubsAmtDistribution`, {
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

    // get all SubsAmtDistributions.
    getAllSubsAmtDistributionData: async (): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/SubsAmtDistribution`, fetchOptions());
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

    // get SubsAmtDistribution by id.
    getSubsAmtDistributionById: async (SubsAmtDistributionId: string): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/SubsAmtDistribution/${SubsAmtDistributionId}`, fetchOptions());
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error: any) {
            console.error('Error fetching SubsAmtDistribution by ID:', error.message);
            throw error;
        }
    },

    // update SubsAmtDistribution data.
    updateSubsAmtDistribution: async (SubsAmtDistributionId: string, updatedData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/SubsAmtDistribution/${SubsAmtDistributionId}`, {
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
export const { createSubsAmtDistributionData, getAllSubsAmtDistributionData, getSubsAmtDistributionById, updateSubsAmtDistribution } = SubsAmtDistributionService;
