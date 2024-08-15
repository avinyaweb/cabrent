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

const BprofileFleetOwnerService = {
    // create FleetOwner
    createFleetOwnerData: async (ticketTypeData: any): Promise<any> => {
        try {
            // const response = await fetch(`${API_URL2}/FleetOwner`, {
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

    // get all FleetOwners.
    getAllFleetOwnerData: async (): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/FleetOwner`, fetchOptions());
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

    // get FleetOwner by id
    getFleetOwnerById: async (FleetOwnerId: string): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/FleetOwner/${FleetOwnerId}`, fetchOptions());
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error: any) {
            console.error('Error fetching FleetOwner by ID:', error.message);
            throw error;
        }
    },

    updateFleetOwner: async (FleetOwnerId: string, updatedData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/FleetOwner/${FleetOwnerId}`, {
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
export const { createFleetOwnerData, getAllFleetOwnerData, getFleetOwnerById, updateFleetOwner } = BprofileFleetOwnerService;
