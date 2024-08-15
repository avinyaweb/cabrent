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

const VehicleTypesService = {
    // create VehicleTypes
    createVehicleTypesData: async (ticketTypeData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/VehicleTypes`, {
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

    // get all VehicleTypess.
    getAllVehicleTypesData: async (): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/VehicleTypes`, fetchOptions());
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

    // get VehicleTypes by id.
    getVehicleTypesById: async (VehicleTypesId: string): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/VehicleTypes/${VehicleTypesId}`, fetchOptions());
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error: any) {
            console.error('Error fetching VehicleTypes by ID:', error.message);
            throw error;
        }
    },

    // update VehicleTypes data.
    updateVehicleTypes: async (VehicleTypesId: string, updatedData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/VehicleTypes/${VehicleTypesId}`, {
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
export const { createVehicleTypesData, getAllVehicleTypesData, getVehicleTypesById, updateVehicleTypes } = VehicleTypesService;
