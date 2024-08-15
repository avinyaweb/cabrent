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

const BprofileVehicleProfileService = {
    // create VehicleProfile
    createVehicleProfileData: async (ticketTypeData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/VehicleProfile`, {
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

    // get all VehicleProfiles.
    getAllVehicleProfileData: async (): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/VehicleProfile`, fetchOptions());
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

    // get VehicleProfile by id
    getVehicleProfileById: async (VehicleProfileId: string): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/VehicleProfile/${VehicleProfileId}`, fetchOptions());
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error: any) {
            console.error('Error fetching VehicleProfile by ID:', error.message);
            throw error;
        }
    },

    updateVehicleProfile: async (VehicleProfileId: string, updatedData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/VehicleProfile/${VehicleProfileId}`, {
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
export const { createVehicleProfileData, getAllVehicleProfileData, getVehicleProfileById, updateVehicleProfile } = BprofileVehicleProfileService;
