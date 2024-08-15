import React, { useState, ChangeEvent } from 'react';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import SubscriptionHistoryModule from './SubscriptionHistoryModule';

interface FormValues {
    id: string;
    planId: string;
    purchasedBy: string;
    purchasedByRolesId: string;
    driverId: string;
    vehicleId: string;
    planStatus: string;
    startDate: string;
    endDate: string;
    couponHistoryId: string;
    walletHistoryId: string;
    transactionHistoryId: string;
    transactionStatus: string;
    paymentType: string;
    archive: string;
}

const CreateSubscriptionHistory: React.FC = () => {
    const initialFormValues: FormValues = {
        id: '',
        planId: '',
        purchasedBy: '',
        purchasedByRolesId: '',
        driverId: '',
        vehicleId: '',
        planStatus: '',
        startDate: '',
        endDate: '',
        couponHistoryId: '',
        walletHistoryId: '',
        transactionHistoryId: '',
        transactionStatus: '',
        paymentType: '',
        archive: '',
    };

    const [formData, setFormData] = useState<FormValues>(initialFormValues);
    const [currentPage, setCurrentPage] = useState<string>('');

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
            label: 'Subscription History',
            to: '/SubscriptionModule/SubscriptionHistory/ViewSubscriptionHistory',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/SubscriptionModule/SubscriptionHistory/ViewSubscriptionHistory' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Create Subscription History',
            to: '/subscriptionModule/subscriptionHistory/createSubscriptionHistory',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/subscriptionModule/subscriptionHistory/createSubscriptionHistory' ? 'text-blue-600' : ''
            }`,
        },
    ];

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    //will use in future
    // {
    // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     try {
    //         const response = await createAdminTicketsData(formData);
    //         console.log('API Response:', response);
    //         console.log('Admin Tickets created successfully!');
    //         setFormData(initialFormValues);
    //     } catch (error: any) {
    //         console.error('Error creating admin tickets:', error.message);
    //     }
    // };
    // }

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
                    <SubscriptionHistoryModule details={formData} onInputChange={handleInputChange} showStatus={false} />

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

export default CreateSubscriptionHistory;
