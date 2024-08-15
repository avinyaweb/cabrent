import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
//import { createAdminTicketsData } from '@/services/AdminTicketsService';
import { createPriority } from '@/services/UtilityServices/PriorityService';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import PriorityModule from '@/pages/UtilityModule/Priority/PriorityModule';

interface FormValues {
    id: string;
    PriorityName: string;
    archive: string;
}

const CreatePriority: React.FC = () => {
    const initialFormValues: FormValues = {
        id: '',
        PriorityName: '',
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

        try {
            console.log(formData, 'jhhk');

            const response = await createPriority(formData);
            console.log('Priority created successfully!');
            setFormData(initialFormValues);
            navigate('/UtilityModule/Priority/ViewPriority');
        } catch (error: any) {
            console.error('Error creating Priority:', error.message);
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

    const navItems = [
        {
            label: 'Home',
            to: '/',
            className: '',
        },
        {
            label: 'Priority',
            to: '/UtilityModule/Priority/ViewPriority',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/UtilityModule/Priority/ViewPriority' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Create Priority',
            to: '/UtilityModule/Priority/CreatePriority',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/UtilityModule/Priority/CreatePriority' ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <PriorityModule details={formData} onInputChange={handleInputChange} showStatus={false} create="create" />
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

export default CreatePriority;
