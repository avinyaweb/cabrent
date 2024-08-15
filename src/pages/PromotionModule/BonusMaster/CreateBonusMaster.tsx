import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import BonusMasterModule from './BonusMasterModule';

interface FormValues {
    id: string;
    bonusType: string;
    amount: string;
    bonusCode: string;
    startDate: string;
    endDate: string;
    description: string;
    message: string;
    archive: string;
}

const CreateBonusMaster: React.FC = () => {
    const initialFormValues: FormValues = {
        id: '',
        bonusType: '',
        amount: '',
        bonusCode: '',
        startDate: '',
        endDate: '',
        description: '',
        message: '',
        archive: '',
    };

    const [formData, setFormData] = useState<FormValues>(initialFormValues);
    const [currentPage, setCurrentPage] = useState<string>('');

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
            label: 'Bonus Master',
            to: '/PromotionModule/BonusMaster/ViewBonusMaster',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${currentPath === '/PromotionModule/BonusMaster/ViewBonusMaster' ? 'text-blue-600' : ''}`,
        },
        {
            label: 'Create Bonus Master',
            to: '/PromotionModule/BonusMaster/CreateBonusMaster',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${currentPath === '/PromotionModule/BonusMaster/CreateBonusMaster' ? 'text-blue-600' : ''}`,
        },
    ];

    // const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    // };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target as HTMLInputElement; // Use type assertion
        setFormData({ ...formData, [name]: value });
    };

    {
        /* 
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await createAdminTicketsData(formData);
            console.log('API Response:', response);
            console.log('Admin Tickets created successfully!');
            setFormData(initialFormValues);
        } catch (error: any) {
            console.error('Error creating admin tickets:', error.message);
        }
    };
    */
    }

    const handleSubmit = () => {
        window.location.reload();
    };

    const handleCancel = () => {
        window.location.reload();
    };

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <BonusMasterModule details={formData} onInputChange={handleInputChange} showStatus={false} />

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

export default CreateBonusMaster;
