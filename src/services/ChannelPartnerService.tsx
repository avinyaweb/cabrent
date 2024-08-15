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

const ChannelPartnerService = {
    getChannelPartnerData: async (): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/channelPartners`, fetchOptions());

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Fetched Data:', data);
            return data;
        } catch (error: any) {
            console.error('Error fetching channel partner data:', error.message);
            throw error;
        }
    },

    createChannelPartnerData: async (channelPartnerData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/channelPartner`, {
                method: 'POST',
                ...fetchOptions(),
                body: JSON.stringify(channelPartnerData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('Created Data:', responseData);
            return responseData;
        } catch (error: any) {
            console.error('Error creating channel partner data:', error.message);
            throw error;
        }
    },

    getChannelPartnerById: async (channelPartnerId: string): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/channelPartner/${channelPartnerId}`, fetchOptions());
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Fetched channel partner by ID:', data);
            return data;
        } catch (error: any) {
            console.error('Error fetching channel partner by ID:', error.message);
            throw error;
        }
    },

    updateChannelPartner: async (channelPartnerId: string, updatedData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/channelPartners/${channelPartnerId}`, {
                method: 'PUT',
                ...fetchOptions(),
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('Updated channel partner Data:', responseData);
            return responseData;
        } catch (error: any) {
            console.error('Error updating channel partner data:', error.message);
            throw error;
        }
    },
};

export const { getChannelPartnerData, createChannelPartnerData, getChannelPartnerById, updateChannelPartner } = ChannelPartnerService;
