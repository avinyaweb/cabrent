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

const ServiceCityService = {
    // create ServiceCity
    createServiceCityData: async (ticketTypeData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/ServiceCity`, {
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

    // get all ServiceCitys.
    getAllServiceCityData: async (): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/ServiceCity`, fetchOptions());
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

    // get ServiceCity by id.
    getServiceCityById: async (ServiceCityId: string): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/ServiceCity/${ServiceCityId}`, fetchOptions());
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error: any) {
            console.error('Error fetching ServiceCity by ID:', error.message);
            throw error;
        }
    },

    // update ServiceCity data.
    updateServiceCity: async (ServiceCityId: string, updatedData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/ServiceCity/${ServiceCityId}`, {
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
export const { createServiceCityData, getAllServiceCityData, getServiceCityById, updateServiceCity } = ServiceCityService;
