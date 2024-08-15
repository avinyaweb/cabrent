import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createStatus } from '@/services/UtilityServices/StatusService';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import StatusModule from './StatusModule';

interface FormValues {
    id: string;
    archiveName: string;
    archive: string;
}

const CreateStatus: React.FC = () => {
    const initialFormValues: FormValues = {
        id: '',
        archiveName: '',
        archive: '',
    };

    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormValues>(initialFormValues);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // future code -->>
        // try {
        //     console.log(formData, 'jhhk');
        //     const response = await createStatus(formData);
        //     console.log('status created successfully!');
        //     setFormData(initialFormValues);
        //     navigate('/UtilityModule/Status/ViewStatus');
        // } catch (error: any) {
        //     console.error('Error creating status:', error.message);
        // }
    };

    const handleCancel = () => {
        window.location.reload();
    };

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to set the current page based on the path
    // const setCurrent = (path: string) => {
    //     setCurrentPage(path);
    // };

    const navItems = [
        {
            label: 'Home',
            to: '/',
            className: '',
        },
        {
            label: 'Status',
            to: '/UtilityModule/Status/ViewStatus',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/UtilityModule/Status/ViewStatus' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Create Status',
            to: '/UtilityModule/Status/CreateStatus',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/UtilityModule/Status/CreateStatus' ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <StatusModule details={formData} onInputChange={handleInputChange} showStatus={false} create="create" />
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

export default CreateStatus;
