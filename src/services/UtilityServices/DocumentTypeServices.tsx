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

const DocumentTypeService = {
    // create document type
    createDocumentType: async (documentTypeData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/documentType`, {
                method: 'POST',
                ...fetchOptions(),
                body: JSON.stringify(documentTypeData),
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
    getAllDocumentTypes: async (): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/documentType`, fetchOptions());

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            return data;
        } catch (error: any) {
            console.error('Error fetching document type data:', error.message);
            throw error;
        }
    },

    // get document type by id
    getDocumentTypeById: async (documentTypeId: string): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/documentType/${documentTypeId}`, fetchOptions());

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
    updateDocumentType: async (documentTypeId: string, updatedData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/documentType/${documentTypeId}`, {
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
    deleteDocumentType: async (documentTypeId: string): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/documentType/${documentTypeId}`, {
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
    updateModuleArchive: async (documentId: string, updatedData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/documentType/updateArchive/${documentId}`, {
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

export const { createDocumentType, getAllDocumentTypes, getDocumentTypeById, updateDocumentType, deleteDocumentType } = DocumentTypeService;
