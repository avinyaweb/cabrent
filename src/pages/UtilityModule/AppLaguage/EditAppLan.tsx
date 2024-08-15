import React, { useState, ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import AppLanguageModule from './AppLanguageModule';

interface FormValues {
    id: string;
    companyTypeName: string;
    appResLanCode: string;
}

const EditAppLan: React.FC = () => {
    const initialFormValues: FormValues = {
        id: '',
        companyTypeName: '',
        appResLanCode: '',
    };

    const [formData, setFormData] = useState<FormValues>(initialFormValues);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Future code --->>>
    // const navigate = useNavigate();

    // Future code --->>>
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
            label: 'View App Laguage',
            to: '/UtilityModule/AppLaguage/ViewAppLaguage',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/UtilityModule/CompanyType/ViewCompanyType' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Create App Language',
            to: '/utilityModule/AppLaguage/CreateAppLanguage',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/utilityModule/AppLaguage/CreateAppLanguage' ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <AppLanguageModule details={formData} onInputChange={handleInputChange} showStatus={false} />

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

export default EditAppLan;
