import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import ChannelPartnerAPIModule from './ChannelPartnerAPIModule';

interface FormValues {
    id: string;
    cpAPIKey: string;
    apiName: string;
    apiURL: string;
    permissions: string;
    archive: string;
    status: string;
    accessKey: string;
    bookingType: string;
    serviceType: string;
    limitedCalls: string;
    serviceCity: string;
    leadCharges: string;
    tax: string;
    channelPartnerId: string;
    totalCalls: string;
}

const CreateChannelPartnerAPI: React.FC = () => {
    const initialFormValues: FormValues = {
        id: ' ',
        cpAPIKey: ' ',
        apiName: ' ',
        apiURL: ' ',
        permissions: ' ',
        archive: ' ',
        status: ' ',
        accessKey: ' ',
        bookingType: ' ',
        serviceType: ' ',
        limitedCalls: ' ',
        serviceCity: ' ',
        leadCharges: ' ',
        tax: ' ',
        channelPartnerId: ' ',
        totalCalls: ' ',
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
            label: 'Channel Partner API',
            to: '/AdminModule/ChannelPartnerAPI/ViewChannelPartnerAPI',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/AdminModule/ChannelPartnerAPI/ViewChannelPartnerAPI' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Create Channel Partner API',
            to: '/AdminModule/ChannelPartnerAPI/CreateChannelPartnerAPI',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/AdminModule/ChannelPartnerAPI/CreateChannelPartnerAPI' ? 'text-blue-600' : ''
            }`,
        },
    ];

    const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            navigate('/AdminModule/ChannelPartnerAPI/ViewSpecificChannelPartnerAPI/1');
            // const response = await createAdminTicketsData(formData);
            // console.log('API Response:', response);
            // console.log('Admin Tickets created successfully!');
            // setFormData(initialFormValues);
        } catch (error: any) {
            console.error('Error creating admin tickets:', error.message);
        }
    };

    const navigate = useNavigate();

    const handleCancel = () => {
        navigate('/AdminModule/ChannelPartnerAPI/ViewChannelPartnerAPI');
    };

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <ChannelPartnerAPIModule details={formData} onInputChange={handleInputChange} showStatus={false} viewSpecific={false} />

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

export default CreateChannelPartnerAPI;
