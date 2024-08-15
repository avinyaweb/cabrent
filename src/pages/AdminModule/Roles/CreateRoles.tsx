import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import { createRoleData } from '@/services/RolesService';
import RolesModule from './RolesModule';
import PermissionModule from './PermissionModule';

interface FormValues {
    roleName: string;
    archive: string;
}

const CreateRoles: React.FC = () => {
    const dispatch = useDispatch();
    // future code --->>>
    // const navigate = useNavigate();

    useEffect(() => {
        dispatch(setPageTitle('Create Roles'));
    }, [dispatch]);

    // future code --->>>
    // const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const initialFormValues: FormValues = {
        roleName: '',
        archive: 'PENDING',
    };

    const [formData, setFormData] = useState<FormValues>(initialFormValues);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await createRoleData(formData);
            console.log('API Response:', response);
            console.log('Roles created successfully!');
            setFormData(initialFormValues);
        } catch (error: any) {
            console.error('Error creating roles data:', error.message);
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
                    className={`before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${currentPath === '/AdminModule/Roles/ViewRoles' ? 'text-blue-600' : ''}`}
                >
                    <Link to="/AdminModule/Roles/ViewRoles" className={currentPage === '/AdminModule/Roles/ViewRoles' ? 'active' : ''} onClick={() => setCurrent('/viewRoles')}>
                        Roles
                    </Link>
                </li>
                <li
                    className={`before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${currentPath === '/AdminModule/Roles/CreateRoles' ? 'text-blue-600' : ''}`}
                >
                    Create Roles
                </li>
            </ol>

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <RolesModule details={formData} onInputChange={handleInputChange} showStatus={false} viewSpecific={false} />

                    <PermissionModule />

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

export default CreateRoles;
