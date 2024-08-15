import { Navigate, useLocation } from 'react-router-dom';

interface AuthHOCProps {
    roles?: string[];
    requiredPermissions?: string[];
    children: React.ReactNode;
}

const AuthHOC: React.FC<AuthHOCProps> = ({ roles, requiredPermissions, children }) => {
    let location = useLocation();

    // Retrieve necessary information from localStorage
    const isAuthenticated = localStorage.getItem('isUserAuthenticated') === 'true';
    const userRoles = JSON.parse(localStorage.getItem('roles') || '[]');
    const userPermissions = JSON.parse(localStorage.getItem('userRolesAndPermissions') || '{}');

    // Check if user is authenticated based on localStorage
    if (!isAuthenticated) {
        // Redirect to login if not authenticated
        // return <Navigate to="/login" state={{ from: location }} replace />; // ---- in future we need to un comment after impliment roles & permissions
    }

    // Check if user has required roles for the route
    if (roles && roles.length > 0 && !roles.some((role) => userRoles.includes(role))) {
        // Redirect to unauthorized access route.
        // return <div>Access Denied: User does not have required roles</div>; // ---- in future we need to un comment after impliment roles & permissions
    }

    // Check if user has required permissions for the route
    if (requiredPermissions && requiredPermissions.length > 0) {
        const hasAllPermissions = requiredPermissions.every((permission) => userPermissions[permission]);
        if (!hasAllPermissions) {
            // Redirect to unauthorized access route.
            // return <div>Access Denied: User does not have required permissions</div>; // ---- in future we need to un comment after impliment roles & permissions
        }
    }

    return <>{children}</>;
};

export default AuthHOC;
