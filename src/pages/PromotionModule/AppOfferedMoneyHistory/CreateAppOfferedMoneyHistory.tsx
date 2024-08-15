import React, { useState, ChangeEvent } from 'react';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import AppOfferedMoneyHistoryModule from './AppOfferedMoneyHistoryModule';

interface FormValues {
    id: string;
    fk_applicationOfferedMoney: string;
    fk_couponHistoryId: string;
    fk_bonusHistoryId: string;
    fk_refferalHistoryId: string;
    fk_promocodeHistoryId: string;
    amount: string;
    paymentType: string;
    paidToRefrence: string;
    paidToRefrenceType: string;
    paidByRefrence: string;
    paidByRefrenceType: string;
    transactionStatus: string;
    transactionMode: string;
    archive: string;
}

const CreateAppOfferedMoneyHistory: React.FC = () => {
    const initialFormValues: FormValues = {
        id: '',
        fk_applicationOfferedMoney: '',
        fk_couponHistoryId: '',
        fk_bonusHistoryId: '',
        fk_refferalHistoryId: '',
        fk_promocodeHistoryId: '',
        amount: '',
        paymentType: '',
        paidToRefrence: '',
        paidToRefrenceType: '',
        paidByRefrence: '',
        paidByRefrenceType: '',
        transactionStatus: '',
        transactionMode: '',
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
            label: 'Application Offered Money History',
            to: '/TransactionModule/AppOfferedMoneyHistory/ViewAppOfferedMoneyHistory',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/TransactionModule/AppOfferedMoneyHistory/ViewAppOfferedMoneyHistory' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Create Application Offered Money History',
            to: '/TransactionModule/AppOfferedMoneyHistory/CreateAppOfferedMoneyHistory',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/TransactionModule/AppOfferedMoneyHistory/CreateAppOfferedMoneyHistory' ? 'text-blue-600' : ''
            }`,
        },
    ];

    const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
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
                    <AppOfferedMoneyHistoryModule details={formData} onInputChange={handleInputChange} showStatus={false} />

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

export default CreateAppOfferedMoneyHistory;
