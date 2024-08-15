import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import SMSConfigurationsModule from './SMSConfigurationsModule';

interface FormValues {
    id: string;
    bookingId: string;
    amount: string;
    archive: string;
    smsGateway: string;
    twilioAccountSid: string;
    twilioAuthToken: string;
    twilioNumber: string;
    nexmoApiKey: string;
    nexmoApiSecret: string;
    nexmoApiNumber: string;
}

const CreateSMSConfigurations: React.FC = () => {
    const initialFormValues: FormValues = {
        id: '',
        bookingId: '',
        amount: '',
        archive: '',
        smsGateway: '', // Added missing properties
        twilioAccountSid: '',
        twilioAuthToken: '',
        twilioNumber: '',
        nexmoApiKey: '',
        nexmoApiSecret: '',
        nexmoApiNumber: '',
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
            label: 'Trips Invoice',
            to: '/TripModule/TripsInvoice/ViewTripsInvoice',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${currentPath === '/TripModule/TripsInvoice/ViewTripsInvoice' ? 'text-blue-600' : ''}`,
        },
        {
            label: 'Create General',
            to: '',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${currentPath === '/TripModule/TripsInvoice/CreateTripsInvoice' ? 'text-blue-600' : ''}`,
        },
    ];

    const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
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
                    <SMSConfigurationsModule details={formData} onInputChange={handleInputChange} showStatus={false} />

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

export default CreateSMSConfigurations;
