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

const EmployeeLevelServices = {
    // create employee level
    createEmployeeLevel: async (employeeLevelData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/employeeLevel`, {
                method: 'POST',
                ...fetchOptions(),
                body: JSON.stringify(employeeLevelData),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseData = await response.json();
            console.log('Success, the response data');
            return responseData;
        } catch (error: any) {
            console.error('Error creating employee level:', error.message);
            throw error;
        }
    },

    // get all employee levels
    getAllEmployeeLevels: async (): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/employeeLevel`, fetchOptions());

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);

            return data;
        } catch (error: any) {
            console.error('Error fetching employee level data:', error.message);
            throw error;
        }
    },

    // get employee level by id
    getEmployeeLevelById: async (employeeLevelId: string): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/employeeLevel/${employeeLevelId}`, fetchOptions());
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error: any) {
            console.error('Error fetching employee level by ID:', error.message);
            throw error;
        }
    },

    updateEmployeeLevel: async (employeeLevelId: string, updatedData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/employeeLevel/${employeeLevelId}`, {
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
            console.error('Error updating employee level data:', error.message);
            throw error;
        }
    },

    deleteEmployeeLevel: async (employeeLevelId: string): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/employeeLevel/${employeeLevelId}`, {
                method: 'DELETE',
                ...fetchOptions(),
            });
            console.log(response);

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

export const { createEmployeeLevel, getAllEmployeeLevels, getEmployeeLevelById, updateEmployeeLevel, deleteEmployeeLevel } = EmployeeLevelServices;
