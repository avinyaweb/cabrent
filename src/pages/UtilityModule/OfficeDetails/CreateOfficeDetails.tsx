import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import OfficeDetailsModule from './OfficeDetailsModule';

interface FormValues {
    id: string;
    Actions: string;
    line_1: string;
    line_2: string;
    landmark: string;
    state: string;
    city: string;
    zip: string;
    Mail: string;
    Phone: string;
}

const CreateOfficeDetails: React.FC = () => {
    const initialFormValues: FormValues = {
        id: '',
        Actions: '',
        line_1: '', // Corrected field name from 'Address' to 'line_1'
        line_2: '', // Assuming this is the second line of the address
        landmark: '', // Assuming this is a landmark near the office
        state: '',
        city: '',
        zip: '',
        Mail: '',
        Phone: '',
    };

    const [formData, setFormData] = useState<FormValues>(initialFormValues);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const navigate = useNavigate();

    // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();

    //     try {
    //         const response = await createCompanyType(formData);
    //         console.log('API Response:', response);
    //         console.log('company type created successfully!');
    //         setFormData(initialFormValues);
    //         navigate('/UtilityModule/CompanyType/ViewCompanyType')
    //     } catch (error: any) {
    //         console.error('Error creating admin tickets:', error.message);
    //     }
    // };

    const handleSubmit = () => {
        window.location.reload();
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
            label: 'Office Details',
            to: '/UtilityModule/OfficeDetails/ViewOfficeDetails',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/UtilityModule/OfficeDetails/ViewOfficeDetails' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Create Office Details',
            to: '/UtilityModule/OfficeDetails/CreateOfficeDetails',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/UtilityModule/OfficeDetails/CreateOfficeDetails' ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <OfficeDetailsModule details={formData} onInputChange={handleInputChange} showStatus={false} />

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

export default CreateOfficeDetails;
