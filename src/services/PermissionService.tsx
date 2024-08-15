const API_URL = import.meta.env.VITE_ADMIN_API_URL;

// Retrieve the bearer token from local storage on page load
const fetchOptions = () => {
    const bearerToken = localStorage.getItem('bearerToken');
    if (!bearerToken) {
        console.error('Bearer token not found in local storage');
        // You might want to handle this case based on your application requirements
        // For example, redirect the user to the login page
    }

    return {
        headers: {
            Authorization: `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',
        },
    };
};

export interface Permission {
    _id: string;
    moduleIndex: number;
    moduleName: string;
    permissionObj: PermissionObject[];
    fieldObj: FieldObject[];
    roleName: string;
    employeeLevel: string;
}

export interface PermissionObject {
    permissionIndex: number;
    permissionType: string;
    permissionName: string;
    permissionDescription: string;
    permissionStatus: boolean;
}

export interface FieldObject {
    fieldIndex: number;
    fieldName: string;
    fieldIsViewPermissionName: string;
    fieldIsEditPermissionName: string;
    fieldIsViewPermissionStatus: boolean;
    fieldIsEditPermissionStatus: boolean;
}

const PermissionService = {
    getPermissionData: async (): Promise<Permission[]> => {
        try {
            const response = await fetch(`${API_URL}/permissionMaster`, fetchOptions());

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const permissionData = await response.json();
            console.log('Fetched Permission Master Data:', permissionData);

            const permissions: Permission[] = permissionData.data?.Permissions || [];
            return permissions;
        } catch (error: any) {
            console.error(`Error fetching permission data: ${error.message}`);
            throw error;
        }
    },

    updatePermissionData: async (permissions: any): Promise<void> => {
        try {
            const { roleName, employeeLevel, permissionObj } = permissions;
            console.log('Permissions:', permissions);

            const response = await fetch(`${API_URL}/permission`, {
                method: 'POST',
                ...fetchOptions(),
                body: JSON.stringify({
                    roleName,
                    employeeLevel,
                    permissionObj,
                    fieldObj: permissions.fieldObj, // Include fieldObj in the payload
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            console.log('Permission data updated successfully');
        } catch (error: any) {
            console.error(`Error updating permissions: ${error.message}`);
            throw error;
        }
    },
};

export const { getPermissionData, updatePermissionData } = PermissionService;
