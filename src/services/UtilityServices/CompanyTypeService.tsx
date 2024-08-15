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

const CompanyTypeService = {
    // create City
    createCompanyType: async (companyTypeData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/companyType`, {
                method: 'POST',
                ...fetchOptions(),
                body: JSON.stringify(companyTypeData),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseData = await response.json();
            return responseData;
        } catch (error: any) {
            console.error('Error creating company type:', error.message);
            throw error;
        }
    },

    // get all Citys.
    getAllCompanyType: async (): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/companyType`, fetchOptions());

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);

            return data;
        } catch (error: any) {
            console.error('Error fetching company type data:', error.message);
            throw error;
        }
    },

    // getAllCompanyTypeById
    getAllCompanyTypeById: async (companyTypeId: string): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/companyType/${companyTypeId}`, fetchOptions());
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error: any) {
            console.error('Error fetching company type by ID:', error.message);
            throw error;
        }
    },

    updateCompanyType: async (CompanyTypeId: string, updatedData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/companyType/${CompanyTypeId}`, {
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
            console.error('Error updating company type data:', error.message);
            throw error;
        }
    },
};
export const { createCompanyType, getAllCompanyType, getAllCompanyTypeById, updateCompanyType } = CompanyTypeService;
