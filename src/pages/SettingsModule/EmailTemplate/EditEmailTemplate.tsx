import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
//import { updateChannelPartner, getChannelPartnerById } from '@/services/ChannelPartnerService';
import { getStateById, updateState } from '@/services/UtilityServices/StateService';
import toast from 'react-hot-toast';
import { staticEmailTemplateData } from './ViewEmailTemplate';
import EmailTemplateModule from './EmailTemplateModule';

interface FormValues {
    id: string;
    title: string;
    email: string;
    emailSubject: string;
    message: string;
    archive: string;
}

const EditEmailTemplate: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { EmailTemplateId } = useParams();

    const initialFormValues: FormValues = {
        id: '',
        title: '',
        email: '',
        emailSubject: '',
        message: '',
        archive: 'PENDING',
    };

    const [stateDetails, setStateDetails] = useState<FormValues>(initialFormValues);

    // fetch state data by ID.
    // useEffect(() => {
    //     // Find the specific data based on the serviceProviderId
    //     const specificData = staticEmailTemplateData.find((data) => data.id === EmailTemplateId);

    //     // If specificData is found, update the formData state with its values
    //     if (specificData) {
    //         setStateDetails(specificData); // Set the entire form data
    //     }
    // }, [EmailTemplateId]);

    useEffect(() => {
        // Find the specific data based on the serviceProviderId
        const specificData = staticEmailTemplateData.find((data) => data.id === EmailTemplateId);

        // If specificData is found, update the formData state with its values
        if (specificData) {
            // Ensure specificData matches the FormValues interface
            const formDataCopy: FormValues = {
                ...initialFormValues, // Start with initialFormValues
                ...specificData, // Override with specificData
            };
            setStateDetails(formDataCopy);
        }
    }, [EmailTemplateId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setStateDetails({ ...stateDetails, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // try {
        //     const response = await updateState(EmailTemplateId, stateDetails);
        //     if (response?.message) {
        //         toast.success(response?.message);
        //         setTimeout(() => {
        //             navigate('/UtilityModule/State/ViewState');
        //         }, 2000);
        //     }
        //     console.log('Channel Partner details updated successfully!');
        // } catch (error: any) {
        //     console.error('Error updating channel partner details:', error.message);
        // }
    };

    const handleCancel = () => {
        window.location.reload();
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
            label: 'Edit Email Template',
            to: '/SettingsModule/EmailTemplate/EditEmailTemplate',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `/SettingsModule/EmailTemplate/EditEmailTemplate/${EmailTemplateId}` ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <EmailTemplateModule details={stateDetails} onInputChange={handleInputChange} showStatus={true} />
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

export default EditEmailTemplate;
