import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createVehicleUtility } from '@/services/UtilityServices/VehicleUtilityServices';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import VehicleUtilityModule from './VehicleUtilityModule';

interface FormValues {
    id: string;
    vehicleCategory: string;
    VehicleBrand: string;
    vehicleType: string;
    vehicleModel: string;
    archive: string;
}

const CreateVehicleUtility: React.FC = () => {
    const navigate = useNavigate();

    const initialFormValues: FormValues = {
        id: '',
        vehicleCategory: '',
        VehicleBrand: '',
        vehicleType: '',
        vehicleModel: '',
        archive: '',
    };

    const [formData, setFormData] = useState<FormValues>(initialFormValues);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await createVehicleUtility(formData);
            console.log('API Response:', response);
            console.log('vehicle utility created successfully!');
            setFormData(initialFormValues);
            navigate('/UtilityModule/VehicleUtility/ViewVehicleUtility');
        } catch (error: any) {
            console.error('Error creating admin tickets:', error.message);
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
            label: 'Vehicle Utility',
            to: '/UtilityModule/VehicleUtility/ViewVehicleUtility',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/UtilityModule/VehicleUtility/ViewVehicleUtility' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Create Vehicle Utility',
            to: '/UtilityModule/VehicleUtility/CreateVehicleUtility',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/UtilityModule/VehicleUtility/CreateVehicleUtility' ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <VehicleUtilityModule details={formData} onInputChange={handleInputChange} showStatus={false} />

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

export default CreateVehicleUtility;
