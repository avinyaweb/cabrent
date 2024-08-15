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

const CountryService = {
    // create country
    createCountry: async (countryData: any): Promise<any> => {
        try {
            console.log('countryData' + countryData);

            const response = await fetch(`${API_URL2}/country`, {
                method: 'POST',
                ...fetchOptions(),
                body: JSON.stringify(countryData),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseData = await response.json();
            console.log('Success, the response data');
            return responseData;
        } catch (error: any) {
            console.error('Error creating country:', error.message);
            throw error;
        }
    },

    // get all countries
    getAllCountries: async (): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/country`, fetchOptions());

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            console.log(data);

            return data;
        } catch (error: any) {
            console.error('Error fetching country data:', error.message);
            throw error;
        }
    },

    // get country by id
    getCountryById: async (countryId: string): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/country/${countryId}`, fetchOptions());
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error: any) {
            console.error('Error fetching country by ID:', error.message);
            throw error;
        }
    },

    updateCountry: async (countryId: string, updatedData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/country/${countryId}`, {
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
            console.error('Error updating country data:', error.message);
            throw error;
        }
    },

    deleteCountry: async (countryId: string): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/country/${countryId}`, {
                method: 'DELETE',
                ...fetchOptions(),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            return responseData;
        } catch (error: any) {
            console.error('Error deleting country:', error.message);
            throw error;
        }
    },
};

export const { createCountry, getAllCountries, getCountryById, updateCountry, deleteCountry } = CountryService;
