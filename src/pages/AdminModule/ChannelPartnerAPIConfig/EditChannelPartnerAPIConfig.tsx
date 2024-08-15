import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import ChannelPartnerAPIConfigModule from './ChannelPartnerAPIConfigModule';
import { staticChannelPartnerAPIConfigData } from './ViewChannelPartnerAPIConfig';

interface FormValues {
    id: string;
    cpAPIID: string;
    cpID: string;
    maxCalls: string;
    totalCalls: string;
    archive: string;
}

const EditChannelPartnerAPIConfig: React.FC = () => {
    const { channelPartnerAPIConfigId } = useParams();
    const initialFormValues: FormValues = {
        id: '',
        cpAPIID: '',
        cpID: '',
        maxCalls: '',
        totalCalls: '',
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

    useEffect(() => {
        // Find the specific data based on the serviceProviderId
        const specificData = staticChannelPartnerAPIConfigData.find((data) => data.id === channelPartnerAPIConfigId);

        // If specificData is found, update the formData state with its values
        if (specificData) {
            setFormData(specificData); // Set the entire form data
        }
    }, [channelPartnerAPIConfigId]);

    const navItems = [
        {
            label: 'Home',
            to: '/',
            className: '',
        },
        {
            label: 'Channel Partner API Config',
            to: '/AdminModule/ChannelPartnerAPIConfig/ViewChannelPartnerAPIConfig',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/AdminModule/ChannelPartnerAPIConfig/ViewChannelPartnerAPIConfig' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Edit Channel Partner API Config',
            to: '/AdminModule/ChannelPartnerAPIConfig/EditChannelPartnerAPIConfig',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `/AdminModule/ChannelPartnerAPIConfig/EditChannelPartnerAPIConfig/${channelPartnerAPIConfigId}` ? 'text-blue-600' : ''
            }`,
        },
    ];

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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
        navigate('/AdminModule/ChannelPartnerAPIConfig/ViewSpecificChannelPartnerAPIConfig/1');
    };
    const navigate = useNavigate();
    const handleCancel = () => {
        navigate('AdminModule/ChannelPartnerAPIConfig/ViewchannelPartnerAPIConfig');
    };

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <ChannelPartnerAPIConfigModule details={formData} onInputChange={handleInputChange} showStatus={true} />

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

export default EditChannelPartnerAPIConfig;
