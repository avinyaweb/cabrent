import React, { useState, ChangeEvent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import SubscriptionLayout from './SubscriptionLayout';
import { staticSubscriptionData } from './ViewSubscription';

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
    optionalProperty?: string;
    anotherOptionalProperty?: number;

    //new fields:
    remainingDaysString: string;
    categoryString: string;
    newUser: string;
    countOfUse: string;
    couponIsApplicable: string;
    useWalletMoney: string;
    vehicleType: string;
    type: string;
}

const EditSubscription: React.FC = () => {
    const { subscriptionId } = useParams();
    const viewSpecificEdit = true;
    const initialFormValues: FormValues = {
        id: '',
        fk_serviceCity: '',
        planName: '',
        planDetails: '',
        NumberOfDay: '',
        planAmount: '',
        planDescription: '',
        couponAmount: '',
        planLiveStartTime: '',
        planLiveEndTime: '',
        archive: '',
        fk_subscriptionAmountDistribution: '', // Add this property
        city: '', // Add this property

        //new fields:
        remainingDaysString: '',
        categoryString: '',
        newUser: ' ',
        countOfUse: ' ',
        couponIsApplicable: ' ',
        useWalletMoney: ' ',
        vehicleType: ' ',
        type: ' ',
    };

    const [formData, setFormData] = useState<FormValues>(initialFormValues);
    const [currentPage, setCurrentPage] = useState<string>('');

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to set the current page based on the path
    // const setCurrent = (path: string) => {
    //     setCurrentPage(path);
    // };

    useEffect(() => {
        // Find the specific data based on the serviceProviderId
        const specificData = staticSubscriptionData.find((data) => data.id === subscriptionId);

        // If specificData is found, update the formData state with its values
        if (specificData) {
            setFormData(specificData as unknown as FormValues);
        }
    }, [subscriptionId]);

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
            label: 'Edit Subscription',
            to: '',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `` ? 'text-blue-600' : ''
            }`,
        },
    ];

    const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    //Will use in future
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
                    <SubscriptionLayout details={formData} onInputChange={handleInputChange} showStatus={true} viewSpecificEdit={viewSpecificEdit} isEditPage={true} />

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

export default EditSubscription;
