import React, { useState, ChangeEvent } from 'react';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import SubscriptionLayout from './SubscriptionLayout';
import CreateSubscriptionAmtDistribution from '../SubscriptionAmtDistribution/CreateSubscriptionAmtDistribution';

interface FormValues {
    id: string;
    fk_serviceCity: string;
    planName: string;
    planDetails: string;
    planAmount: string;
    fk_subscriptionAmountDistribution: string;
    planDescription: string;
    couponAmount: string;
    NumberOfDay: string;
    planLiveStartTime: string;
    planLiveEndTime: string;
    archive: string;
    city: string;
    newUser: string;
    countOfUse: string;
    couponIsApplicable: string;
    useWalletMoney: string;
    vehicleType: string;
    type: string;
    remainingDaysString: string;
    categoryString: string;
}

const CreateSubscription: React.FC = () => {
    const initialFormValues: FormValues = {
        id: '',
        fk_serviceCity: '',
        planName: '',
        planDetails: '',
        planAmount: '',
        fk_subscriptionAmountDistribution: '',
        planDescription: '',
        couponAmount: '',
        NumberOfDay: '',
        planLiveStartTime: '',
        planLiveEndTime: '',
        archive: '',
        city: '',
        newUser: '',
        countOfUse: ' ',
        couponIsApplicable: ' ',
        useWalletMoney: ' ',
        vehicleType: ' ',
        type: ' ',
        remainingDaysString: '',
        categoryString: '',
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
            label: 'Subscription',
            to: '/SubscriptionModule/Subscription/ViewSubscription',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/SubscriptionModule/Subscription/ViewSubscription' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Create Subscription',
            to: '/SubscriptionModule/Subscription/CreateSubscription',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/SubscriptionModule/Subscription/CreateSubscription' ? 'text-blue-600' : ''
            }`,
        },
    ];

    const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    //Will add this in Future
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

            <div className="flex justify-end mt-4">
                <span className="text-lg font-bold">Total Amount: {0}</span>
            </div>

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <SubscriptionLayout details={formData} onInputChange={handleInputChange} showStatus={false} />
                    <CreateSubscriptionAmtDistribution />

                    {/* <div className="flex justify-center mt-6">
                        <button type="submit" className="btn btn-primary !mt-6 mr-4">
                            Submit
                        </button>
                        <button type="button" className="btn btn-danger !mt-6" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div> */}
                </form>
            </div>
        </>
    );
};

export default CreateSubscription;
