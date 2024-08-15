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

const ChannelPartnerTypeServices = {
    // create document type
    createChannelPartnerType: async (channelPartnerTypeData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/channelPartnerType`, {
                method: 'POST',
                ...fetchOptions(),
                body: JSON.stringify(channelPartnerTypeData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('Success, the response data');
            return responseData;
        } catch (error: any) {
            console.error('Error creating channelPartnerType:', error.message);
            throw error;
        }
    },

    // get all document types
    getAllchannelPartnerType: async (): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/channelPartnerType`, fetchOptions());
            //    console.log(response,"jwskjd");

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

            return data;
        } catch (error: any) {
            console.error('Error fetching channelPartnerType data:', error.message);
            throw error;
        }
    },

    // get document type by id
    getchannelPartnerTypeById: async (channelPartnerTypeId: string): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/channelPartnerType/${channelPartnerTypeId}`, fetchOptions());

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error: any) {
            console.error('Error fetching channelPartnerType type by ID:', error.message);
            throw error;
        }
    },

    // update document type
    updatechannelPartnerType: async (channelPartnerTypeId: string, updatedData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/channelPartnerType/${channelPartnerTypeId}`, {
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
            console.error('Error updating channelPartnerType type data:', error.message);
            throw error;
        }
    },

    // delete document type
    deletechannelPartnerType: async (channelPartnerTypeId: string): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/channelPartnerType/${channelPartnerTypeId}`, {
                method: 'DELETE',
                ...fetchOptions(),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            return responseData;
        } catch (error: any) {
            console.error('Error deleting channelPartnerType type:', error.message);
            throw error;
        }
    },
    updatechannelPartnerTypeArchive: async (channelPartnerTypeId: string, updatedData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL2}/channelPartnerType/updateArchive/${channelPartnerTypeId}`, {
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
            console.error('Error updating channelPartnerType archive:', error.message);
            throw error;
        }
    },
};

export const { createChannelPartnerType, getAllchannelPartnerType, getchannelPartnerTypeById, updatechannelPartnerType, deletechannelPartnerType, updatechannelPartnerTypeArchive } =
    ChannelPartnerTypeServices;
