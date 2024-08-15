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

const UtilityCityService = {
    // create City
    createCityData: async (cityData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/city`, {
                method: 'POST',
                ...fetchOptions(),
                body: JSON.stringify(cityData),
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

    // get all Citys.
    getAllCityData: async (): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/city`, fetchOptions());

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

    // get City by id
    getCityById: async (CityId: string): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/city/${CityId}`, fetchOptions());
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error: any) {
            console.error('Error fetching City by ID:', error.message);
            throw error;
        }
    },

    updateCity: async (CityId: string, updatedData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/City/${CityId}`, {
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
export const { createCityData, getAllCityData, getCityById, updateCity } = UtilityCityService;
