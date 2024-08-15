import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import toast from 'react-hot-toast';
import EmailTemplateModule from './EmailTemplateModule';

interface FormValues {
    id: string;
    title: string;
    email: string;
    emailSubject: string;
    message: string;
    archive: string;
}

const CreateEmailTemplate: React.FC = () => {
    const initialFormValues: FormValues = {
        id: '',
        title: '',
        email: '',
        emailSubject: '',
        message: '',
        archive: 'PENDING',
    };

    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormValues>(initialFormValues);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    // handle submit.
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        // e.preventDefault();
        // try {
        //     const response = await createEmailTemplateData(formData);
        //     if (response?.message) {
        //         toast.success(response?.message);
        //         setTimeout(() => {
        //             navigate('/UtilityModule/State/ViewState');
        //         }, 2000);
        //     }
        // } catch (error: any) {
        //     console.error('Error creating admin tickets:', error.message);
        // }
    };

    const handleCancel = () => {
        const confirmation = window.confirm('Are you sure you want to cancel?');
        if (confirmation) {
            window.location.href = '/SettingsModule/EmailTemplate/ViewEmailTemplate';
        }
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
            label: 'Email Template',
            to: '/SettingsModule/EmailTemplate/ViewEmailTemplate',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/SettingsModule/EmailTemplate/ViewEmailTemplate' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Create Email Template',
            to: '/SettingsModule/EmailTemplate/CreateEmailTemplate',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/SettingsModule/EmailTemplate/CreateEmailTemplate' ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <EmailTemplateModule details={formData} onInputChange={handleInputChange} showStatus={false} />

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

export default CreateEmailTemplate;
