import { validateForm } from '@/utils/validate';

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

const AdminService = {
    // // get all admin
    // getAdminData: async (): Promise<any> => {
    //     try {
    //         const response = await fetch(`${API_URL}/admin`, fetchOptions());

    //         if (!response.ok) {
    //             throw new Error(`HTTP error! Status: ${response.status}`);
    //         }

    //         const data = await response.json();
    //         return data;
    //     } catch (error: any) {
    //         console.error('Error fetching admin data:', error.message);
    //         throw error;
    //     }
    // },

    getAdminData: async (page: number, pageSize: number): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/admin?page=${page}&itemsPerPage=${pageSize}`, fetchOptions());

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            return data;
        } catch (error: any) {
            console.error('Error fetching admin data:', error.message);
            throw error;
        }
    },

    // create admin data
    createAdminData: async (adminData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/admin`, {
                method: 'POST',
                ...fetchOptions(),
                body: JSON.stringify(adminData),
            });
            console.log(response);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseData = await response.json();
            return responseData;
        } catch (error: any) {
            console.error('Error creating admin data:', error.message);
            throw error;
        }
    },

    // get a specific admin by ID
    getAdminById: async (adminId: string): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/admin/${adminId}`, fetchOptions());

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Fetched Admin by ID:', data);
            return data;
        } catch (error: any) {
            console.error('Error fetching admin by ID:', error.message);
            throw error;
        }
    },

    // updated admin data
    updateAdmin: async (adminId: string, updatedData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/admin/${adminId}`, {
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

export const { getAdminData, createAdminData, getAdminById, updateAdmin } = AdminService;
