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

const AdminRoleService = {
    // create admin role
    createAdminRole: async (adminRoleData: any): Promise<any> => {
        try {
            console.log('adminRoleData' + adminRoleData);

            const response = await fetch(`${API_URL2}/adminRole`, {
                method: 'POST',
                ...fetchOptions(),
                body: JSON.stringify(adminRoleData),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseData = await response.json();
            console.log('Success, the response data');
            return responseData;
        } catch (error: any) {
            console.error('Error creating admin role:', error.message);
            throw error;
        }
    },

    // get all admin roles
    getAllAdminRoles: async (): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/adminRole`, fetchOptions());

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);

            return data;
        } catch (error: any) {
            console.error('Error fetching admin role data:', error.message);
            throw error;
        }
    },

    // get admin role by id
    getAdminRoleById: async (adminRoleId: string): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/adminRole/${adminRoleId}`, fetchOptions());
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error: any) {
            console.error('Error fetching admin role by ID:', error.message);
            throw error;
        }
    },

    updateAdminRole: async (adminRoleId: string, updatedData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/adminRole/${adminRoleId}`, {
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
            console.error('Error updating admin role data:', error.message);
            throw error;
        }
    },

    deleteEmployeeLevel: async (employeeLevelId: string): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/employeeLevel/${employeeLevelId}`, {
                method: 'DELETE',
                ...fetchOptions(),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            return responseData;
        } catch (error: any) {
            console.error('Error deleting employee level:', error.message);
            throw error;
        }
    },
};

export const { createAdminRole, getAllAdminRoles, getAdminRoleById, updateAdminRole } = AdminRoleService;
