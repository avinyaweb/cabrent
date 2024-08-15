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

const ModuleMasterServices = {
    // create module
    createModule: async (moduleData: any): Promise<any> => {
        try {
            // console.log("moduleData" + moduleData);

            const response = await fetch(`${API_URL2}/module`, {
                method: 'POST',
                ...fetchOptions(),
                body: JSON.stringify(moduleData),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseData = await response.json();
            console.log('Success, the response data');
            return responseData;
        } catch (error: any) {
            console.error('Error creating module:', error.message);
            throw error;
        }
    },

    // get all modules
    getAllModules: async (): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/module`, fetchOptions());

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data, '----> response');
            return data;
        } catch (error: any) {
            console.error('Error fetching module data:', error.message);
            throw error;
        }
    },

    // get module by id
    getModuleById: async (moduleId: string): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/module/${moduleId}`, fetchOptions());

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            return data;
        } catch (error: any) {
            console.error('Error fetching module by ID:', error.message);
            throw error;
        }
    },

    // update module
    updateModule: async (moduleId: string, updatedData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/module/${moduleId}`, {
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
            console.error('Error updating module data:', error.message);
            throw error;
        }
    },

    // delete module
    deleteModule: async (moduleId: string): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/module/${moduleId}`, {
                method: 'DELETE',
                ...fetchOptions(),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseData = await response.json();
            console.log('sucssesfully deleted');

            return responseData;
        } catch (error: any) {
            console.error('Error deleting module:', error.message);
            throw error;
        }
    },
    updateModuleArchive: async (moduleId: string, updatedData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/module/updateArchive/${moduleId}`, {
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
    // delete Module
    deleteModuleeUtility: async (moduleId: string): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/module/${moduleId}`, {
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
};

export const { createModule, getAllModules, getModuleById, updateModule, deleteModule, updateModuleArchive, deleteModuleeUtility } = ModuleMasterServices;
