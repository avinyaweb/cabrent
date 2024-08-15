import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import OutstationModule from './OutstationModule';

interface FormValues {
    packageName: string;
    packageDistunce: string;
    packageDuration: string;
    fk_serviceCity: string;
}

const CreatOutstation: React.FC = () => {
    const initialFormValues: FormValues = {
        packageName: '',
        packageDistunce: '',
        packageDuration: '',
        fk_serviceCity: '',
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
            const response = await CreatOutstation(formData);
            console.log('API Response:', response);
            console.log('Admin Tickets created successfully!');
            setFormData(initialFormValues);
            navigate('/TripModule/ServiceType/Outstation/ViewOutstation');
        } catch (error: any) {
            console.error('Error creating admin tickets:', error.message);
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
            label: 'Outstation Package',
            to: '/TripModule/ServiceType/Outstation/ViewOutstation',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/TripModule/ServiceType/Outstation/ViewOutstation' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Create Outstation Package',
            to: '/TripModule/ServiceType/Outstation/CreatOutstation',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/TripModule/ServiceType/Outstation/CreatOutstation' ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <OutstationModule details={formData} onInputChange={handleInputChange} showStatus={false} isEditPage={false} />

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

export default CreatOutstation;
