import React, { useState, ChangeEvent } from 'react';
import { useLocation } from 'react-router-dom';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import AppLanguageModule from './AppLanguageModule';

interface FormValues {
    id: string;
    companyTypeName: string;
    appResLanCode: string;
}

const ViewSpecificAppLan: React.FC = () => {
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
            to: '/utilityModule/AppLaguage/ViewSpecificAppLan',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/utilityModule/AppLaguage/ViewSpecificAppLan' ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form>
                    <AppLanguageModule details={formData} onInputChange={handleInputChange} showStatus={false} />
                </form>
            </div>
        </>
    );
};

export default ViewSpecificAppLan;
