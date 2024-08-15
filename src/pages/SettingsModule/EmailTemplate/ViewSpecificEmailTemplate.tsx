import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import { getStateById } from '@/services/UtilityServices/StateService';
import EmailTemplateModule from './EmailTemplateModule';
import { staticEmailTemplateData } from './ViewEmailTemplate';

interface FormValues {
    title: string;
    email: string;
    archive: string;
    emailSubject: string;
    message: string;
    approvedAt: string;
    approvedBy: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
}

const ViewSpecificEmailTemplate: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { EmailTemplateId } = useParams();

    const initialFormValues: FormValues = {
        title: '',
        email: '',
        archive: '',

        emailSubject: '',
        message: '',
        approvedAt: '',
        approvedBy: '',
        createdAt: '',
        createdBy: '',
        updatedAt: '',
        updatedBy: '',
    };

    const [stateDetails, setStateDetails] = useState<FormValues>(initialFormValues);

    // fetch state data by ID.
    useEffect(() => {
        // Find the specific data based on the serviceProviderId
        const specificData = staticEmailTemplateData.find((data) => data.id === EmailTemplateId);

        // If specificData is found, update the formData state with its values
        if (specificData) {
            setStateDetails(specificData as unknown as FormValues);
        }
    }, [EmailTemplateId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        //setChannelPartnerDetails({ ...channelPartnerDetails, [name]: value });
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
            label: 'Specific Email Template',
            to: '/SettingsModule/EmailTemplate/ViewSpecificEmailTemplate',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `/SettingsModule/EmailTemplate/ViewSpecificEmailTemplate/${EmailTemplateId}` ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form>
                    <EmailTemplateModule details={stateDetails} onInputChange={handleInputChange} showStatus={true} viewSpecific={true} />

                    <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                        <div className="lg:w-1/3">
                            <label htmlFor="approvedAt" className="block mb-1">
                                Approved At
                            </label>
                            <input name="approvedAt" type="text" id="approvedAt" placeholder="Enter Approved At" className="form-input w-full" value={stateDetails?.approvedAt} />
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="approvedBy" className="block mb-1">
                                Approved By
                            </label>
                            <input name="approvedBy" type="text" id="approvedBy" placeholder="Enter Approved By" className="form-input w-full" value={stateDetails?.approvedBy} />
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="createdAt" className="block mb-1">
                                Created At
                            </label>
                            <input name="createdAt" type="text" id="createdAt" placeholder="Enter Created At" className="form-input w-full" value={stateDetails?.createdAt} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                        <div className="lg:w-1/3">
                            <label htmlFor="createdBy" className="block mb-1">
                                Created By
                            </label>
                            <input name="createdBy" type="text" id="createdBy" placeholder="Enter Created By" className="form-input w-full" value={stateDetails?.createdBy} />
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="updatedAt" className="block mb-1">
                                Updated At
                            </label>
                            <input name="updatedAt" type="text" id="updatedAt" placeholder="Enter Updated At" className="form-input w-full" value={stateDetails?.updatedAt} />
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="updatedBy" className="block mb-1">
                                Updated By
                            </label>
                            <input name="updatedBy" type="text" id="updatedBy" placeholder="Enter Updated By" className="form-input w-full" value={stateDetails?.updatedBy} />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ViewSpecificEmailTemplate;
