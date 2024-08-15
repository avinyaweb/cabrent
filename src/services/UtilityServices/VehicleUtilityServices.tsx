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

const VehicleUtilityServices = {
    // create document type
    createVehicleUtility: async (VehicleUtilityData: any): Promise<any> => {
        try {
            console.log(VehicleUtilityData, 'vehicle create data');

            const response = await fetch(`${API_URL2}/vehicleUtility`, {
                method: 'POST',
                ...fetchOptions(),
                body: JSON.stringify(VehicleUtilityData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('Success, the response data');
            return responseData;
        } catch (error: any) {
            console.error('Error creating document type:', error.message);
            throw error;
        }
    },

    // get all document types
    getAllVehicleUtility: async (): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/vehicleUtility`, fetchOptions());

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data, 'get all vehicles');
            return data;
        } catch (error: any) {
            console.error('Error fetching document type data:', error.message);
            throw error;
        }
    },

    // get document type by id
    getVehicleUtilityById: async (VehicleUtilityId: string): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/vehicleUtility/${VehicleUtilityId}`, fetchOptions());

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error: any) {
            console.error('Error fetching document type by ID:', error.message);
            throw error;
        }
    },

    // update document type
    updateVehicleUtility: async (VehicleUtilityId: string, updatedData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/vehicleUtility/${VehicleUtilityId}`, {
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
            console.error('Error updating document type data:', error.message);
            throw error;
        }
    },

    // delete document type
    deleteVehicleUtility: async (VehicleUtilityId: string): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/vehicleUtility/${VehicleUtilityId}`, {
                method: 'DELETE',
                ...fetchOptions(),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            return responseData;
        } catch (error: any) {
            console.error('Error deleting document type:', error.message);
            throw error;
        }
    },
    updateVehicleUtilityArchive: async (VehicleUtilityId: string, updatedData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/vehicleUtility/updateArchive/${VehicleUtilityId}`, {
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
            console.error('Error updating module archive:', error.message);
            throw error;
        }
    },
};

export const { createVehicleUtility, getAllVehicleUtility, getVehicleUtilityById, updateVehicleUtility, updateVehicleUtilityArchive, deleteVehicleUtility } = VehicleUtilityServices;
