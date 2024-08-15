import React, { useState, FormEvent, useEffect, ChangeEvent } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import { updateRole, getRoleById } from '@/services/RolesService';
import RolesModule from './RolesModule';
import PermissionModule from './PermissionModule';

interface FormValues {
    roleName: string;
    archive: string;
}

const EditRoles: React.FC = () => {
    const dispatch = useDispatch();
    // future code -->>
    // const navigate = useNavigate();

    useEffect(() => {
        dispatch(setPageTitle('Edit Roles'));
    }, [dispatch]);

    const { roleId }: { roleId?: any } = useParams();
    const initialFormValues: FormValues = {
        roleName: '',
        archive: '',
    };

    const [roleDetails, setRoleDetails] = useState<FormValues>(initialFormValues);

    useEffect(() => {
        const fetchRoleDetails = async () => {
            try {
                const response = await getRoleById(roleId);
                console.log('Fetched Data', response.role);
                setRoleDetails(response.role);
            } catch (error: any) {
                console.error('Error fetching role details:', error.message);
            }
        };

        fetchRoleDetails();
    }, [roleId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRoleDetails({ ...roleDetails, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await updateRole(roleId, roleDetails);
            console.log('Role details updated successfully!');
        } catch (error: any) {
            console.error('Error updating role details:', error.message);
        }
    };
    const handleCancel = () => {
        window.location.reload();
    };

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to set the current page based on the path
    const setCurrent = (path: string) => {
        setCurrentPage(path);
    };

    return (
        <>
            <ol className="flex text-gray-500 font-semibold dark:text-white-dark flex-wrap">
                <li className="">
                    <Link to="/" className={currentPage === '/' ? 'active' : ''} onClick={() => setCurrent('/')}>
                        Home
                    </Link>
                </li>
                <li
                    className={`before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                        currentPath === '/AdminModule/Roles/ViewRoles' ? 'text-blue-600' : ''
                    }`}
                >
                    <Link to="/AdminModule/Roles/ViewRoles" className={currentPage === 'AdminModule/Roles/ViewRoles' ? 'active' : ''} onClick={() => setCurrent('/viewRoles')}>
                        Roles
                    </Link>
                </li>
                <li
                    className={`before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                        currentPath === `/AdminModule/Roles/EditRoles/${roleId}` ? 'text-blue-600' : ''
                    }`}
                >
                    Edit Roles
                </li>
            </ol>

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <RolesModule details={roleDetails} onInputChange={handleInputChange} showStatus={true} viewSpecific={false} />

                    <PermissionModule />

                    <div className="flex justify-center mt-6">
                        <button type="submit" className="btn btn-primary !mt-6 mr-4">
                            Update
                        </button>
                        <button type="button" className="btn btn-danger !mt-6" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditRoles;
