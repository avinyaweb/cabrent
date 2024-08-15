import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateAdminRole, getAdminRoleById } from '@/services/UtilityServices/AdminRoleServices';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import AdminRoleModule from './AdminRoleModule';

interface FormValues {
    roleKey: string;
    adminRoleName: string;
    adminRoleLevel: string;
    archive: string;
}

const EditAdminRoleModule: React.FC = () => {
    // future code -->>
    // const dispatch = useDispatch();
    const navigate = useNavigate();

    const { adminRoleId }: { adminRoleId?: any } = useParams();

    const initialFormValues: FormValues = {
        roleKey: '',
        adminRoleName: '',
        adminRoleLevel: '',
        archive: '',
    };

    const [AdminRoleDetails, setAdminRoleDetails] = useState<FormValues>(initialFormValues);

    useEffect(() => {
        const fetchChannelPartnerDetails = async () => {
            try {
                const response = await getAdminRoleById(adminRoleId);
                console.log('Fetched Data', response);
                setAdminRoleDetails(response.data.AdminRole);
            } catch (error: any) {
                console.error('Error fetching channel partner details:', error.message);
            }
        };

        fetchChannelPartnerDetails();
    }, [adminRoleId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAdminRoleDetails({ ...AdminRoleDetails, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await updateAdminRole(adminRoleId, AdminRoleDetails);
            console.log('Channel Partner details updated successfully!');
            navigate('/UtilityModule/AdminRole/ViewAdminRole');
        } catch (error: any) {
            console.error('Error updating channel partner details:', error.message);
        }
    };

    // const handleSubmit = () => {
    //     window.location.reload();
    // };

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

    const navItems = [
        {
            label: 'Home',
            to: '/',
            className: '',
        },
        {
            label: 'Admin Role',
            to: '/UtilityModule/AdminRole/ViewAdminRole',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/UtilityModule/AdminRole/ViewAdminRole' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Edit Admin Role',
            to: '/UtilityModule/AdminRole/EditAdminRole',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `/UtilityModule/AdminRole/EditAdminRole/${adminRoleId}` ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <AdminRoleModule details={AdminRoleDetails} onInputChange={handleInputChange} showStatus={true} />
                    <div className="flex justify-center mt-6">
                        <button type="submit" className="btn btn-primary !mt-6 mr-4">
                            Submit
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

export default EditAdminRoleModule;
