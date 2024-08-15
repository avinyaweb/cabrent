import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import { getStateById } from '@/services/UtilityServices/StateService';
import TransactionHistoryModule from './TransactionHistoryModule';
// import EmailTemplateModule from './EmailTemplateModule';
// import { staticEmailTemplateData } from './ViewEmailTemplate';

interface FormValues {
    id: string;
    fromUser: string;
    toUser: string;
    toUserPhoneNumber: string;
    userId: string;
    purpose: string;
    amount: string;
    walletType: string;
    bankAccountIFSCFrom: string;
    bankAccountIFSCTo: string;
    pgTransactionId: string;
    transactionMode: string;
    walletStatus: string;
    appTransactionId: string;
    platformTransactionId: string;
    bankVerification: string;
    bankLabel: string;
    walletTransactionId: string;
    virtualTransactionId: string;
    paymentStatus: string;
    dateTime: string;
    distributorName: string;
    walletProfileStatus: string;
    walletIdFromUser: string;
    walletIdToUser: string;
    source: string;
}

const ViewSpecificTransactionHistory: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { EmailTemplateId } = useParams();

    const initialFormValues: FormValues = {
        id: '',
        fromUser: '',
        toUser: '',
        toUserPhoneNumber: '',
        userId: '',
        purpose: '',
        amount: '',
        walletType: '',
        bankAccountIFSCFrom: '',
        bankAccountIFSCTo: '',
        pgTransactionId: '',
        transactionMode: '',
        walletStatus: '',
        appTransactionId: '',
        platformTransactionId: '',
        bankVerification: '',
        bankLabel: '',
        walletTransactionId: '',
        virtualTransactionId: '',
        paymentStatus: '',
        dateTime: '',
        distributorName: '',
        walletProfileStatus: '',
        walletIdFromUser: '',
        walletIdToUser: '',
        source: '',
    };

    const [stateDetails, setStateDetails] = useState<FormValues>(initialFormValues);

    // fetch state data by ID.
    // useEffect(() => {
    //     // Find the specific data based on the serviceProviderId
    //     const specificData = staticEmailTemplateData.find((data) => data.id === EmailTemplateId);

    //     // If specificData is found, update the formData state with its values
    //     if (specificData) {
    //         setStateDetails(specificData as unknown as FormValues);
    //     }
    // }, [EmailTemplateId]);

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
            label: 'Transaction History',
            to: '/SettingsModule/EmailTemplate/ViewEmailTemplate',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/SettingsModule/EmailTemplate/ViewEmailTemplate' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'View Specific Transaction History',
            to: '/SettingsModule/EmailTemplate/ViewSpecificTransactionHistory',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `/SettingsModule/EmailTemplate/ViewSpecificTransactionHistory/${EmailTemplateId}` ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form>
                    {/* <EmailTemplateModule details={stateDetails} onInputChange={handleInputChange} showStatus={true} viewSpecific={true} /> */}
                    <TransactionHistoryModule details={stateDetails} onInputChange={handleInputChange} showStatus={true} viewSpecific={true} />
                    <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                        <div className="lg:w-1/3">
                            <label htmlFor="approvedAt" className="block mb-1">
                                Approved At
                            </label>
                            <input name="approvedAt" type="text" id="approvedAt" placeholder="Enter Approved At" className="form-input w-full" value={'admin'} />
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="approvedBy" className="block mb-1">
                                Approved By
                            </label>
                            <input name="approvedBy" type="text" id="approvedBy" placeholder="Enter Approved By" className="form-input w-full" value={'Tovino'} />
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="createdAt" className="block mb-1">
                                Created At
                            </label>
                            <input name="createdAt" type="text" id="createdAt" placeholder="Enter Created At" className="form-input w-full" value={'2024-01-07T10:15:00Z'} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                        <div className="lg:w-1/3">
                            <label htmlFor="createdBy" className="block mb-1">
                                Created By
                            </label>
                            <input name="createdBy" type="text" id="createdBy" placeholder="Enter Created By" className="form-input w-full" value={'2024-01-06T14:00:00Z'} />
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="updatedAt" className="block mb-1">
                                Updated At
                            </label>
                            <input name="updatedAt" type="text" id="updatedAt" placeholder="Enter Updated At" className="form-input w-full" value={'34789'} />
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="updatedBy" className="block mb-1">
                                Updated By
                            </label>
                            <input
                                name="updatedBy"
                                type="text"
                                id="updatedBy"
                                placeholder="Enter Updated By"
                                className="form-input w-full"
                                // value={stateDetails?.updatedBy}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ViewSpecificTransactionHistory;
