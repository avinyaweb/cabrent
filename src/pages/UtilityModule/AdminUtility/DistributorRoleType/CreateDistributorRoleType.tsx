import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import DistributorRoleTypeModule from './DistributorRoleTypeModule';
import Breadcrumb from '@/pages/Auth/Breadcrumb';

interface FormValues {
    id: string;
    distributorTypeName: string;
    distributorLevel: string;
    archive: string;
}

const CreateDistributorRoleType: React.FC = () => {
    const initialFormValues: FormValues = {
        id: '',
        distributorTypeName: '',
        distributorLevel: '',
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
            console.log(formData, 'tdhdhsa');

            // const response = await CreateDistributorRoleType(formData);
            // console.log('API Response:', response);
            console.log('Admin Distributor type created successfully!');
            setFormData(initialFormValues);
            navigate('/UtilityModule/distributorType/ViewdistributorType');
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
            label: 'Distributor Type',
            to: '/UtilityModule/distributorType/ViewdistributorType',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/UtilityModule/distributorType/ViewdistributorType' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Create Distributor Type',
            to: '/UtilityModule/distributorType/CreateDistributorRoleType',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/UtilityModule/distributorType/CreateDistributorRoleType' ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <DistributorRoleTypeModule details={formData} onInputChange={handleInputChange} showStatus={false} />

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

export default CreateDistributorRoleType;
