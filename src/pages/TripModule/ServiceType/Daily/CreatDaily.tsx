import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import DailyModule from './DailyModule';

interface FormValues {
    packageName: string;
    packageDistunce: string;
    packageDuration: string;
    fk_serviceCity: string;
}

const CreatDaily: React.FC = () => {
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
            const response = await CreatDaily(formData);
            console.log('API Response:', response);
            console.log('Admin Tickets created successfully!');
            setFormData(initialFormValues);
            navigate('/TripModule/ServiceType/Daily/ViewDaily');
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
            label: 'Daily Package',
            to: '/TripModule/ServiceType/Daily/ViewDaily',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/TripModule/ServiceType/Daily/ViewDaily' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Create Daily Package',
            to: '/TripModule/ServiceType/Daily/CreatDaily',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/TripModule/ServiceType/Daily/CreatDaily' ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <DailyModule details={formData} onInputChange={handleInputChange} showStatus={false} isEditPage={false} />

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

export default CreatDaily;
