import React, { useState, ChangeEvent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import SubscriptionInvoiceModule from './SubscriptionInvoiceModule';
import { staticSubscriptionInvoiceData } from './ViewSubscriptionInvoice';

interface FormValues {
    id: string;
    subHistoryId: string;
    amount: string;
    paymentStatus: string;
    fk_serviceCity: string;
    archive: string;
}

const EditSubscriptionInvoice: React.FC = () => {
    const { subscriptionInvoiceId } = useParams();
    const initialFormValues: FormValues = {
        id: '',
        subHistoryId: '',
        amount: '',
        paymentStatus: '',
        fk_serviceCity: '',
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

    // useEffect(() => {
    //     // Find the specific data based on the serviceProviderId
    //     const specificData = staticSubscriptionInvoiceData.find((data) => data.id === subscriptionInvoiceId);

    //     if (specificData) {
    //         setFormData(specificData); // Set the entire form data
    //     }
    // }, [subscriptionInvoiceId]);

    useEffect(() => {
        // Find the specific data based on the subscriptionInvoiceId
        const specificData = staticSubscriptionInvoiceData.find((data) => data.id === subscriptionInvoiceId);
        // If specificData is found, update the formData state with its values
        if (specificData) {
            // Ensure specificData matches the FormValues interface
            const formDataCopy: FormValues = {
                ...initialFormValues, // Start with initialFormValues
                ...specificData, // Override with specificData
            };
            setFormData(formDataCopy);
        }
    }, [subscriptionInvoiceId]);

    const navItems = [
        {
            label: 'Home',
            to: '/',
            className: '',
        },
        {
            label: 'Subscription Invoice',
            to: '/SubscriptionModule/SubscriptionInvoice/ViewSubscriptionInvoice',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/SubscriptionModule/SubscriptionInvoice/ViewSubscriptionInvoice' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Edit Subscription Invoice',
            to: '/subscriptionModule/subscriptionInvoice/EditSubscriptionInvoice',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `/SubscriptionModule/SubscriptionInvoice/EditSubscriptionInvoice/${subscriptionInvoiceId}` ? 'text-blue-600' : ''
            }`,
        },
    ];

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    //This function will use in future

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
                    <SubscriptionInvoiceModule details={formData} onInputChange={handleInputChange} showStatus={true} />

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

export default EditSubscriptionInvoice;
