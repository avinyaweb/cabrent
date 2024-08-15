import React, { useState, ChangeEvent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import BankAccountModule from './BankAccountModule';
import { staticBankAccountData } from './ViewBankAccount';
import BankAccountDocumentModule from './BankAccountDocumentModule';

interface FormValues {
    id: string;
    bankName: string;
    fk_userId: string;
    accountHolderName: string;
    accountNumber: string;
    ifscCode: string;
    branchName: string;
    panNumber: string;
    voterId: string;
    aadhar: string;
    gst: string;
    accountType: string;
    verificationHistory: string;
    archive: string;
    approvedBy: string;
    approvedAt: string;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
    bankVerify: string;
    pgLabel: string;
    pgVerify: string;

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

const EditBankAccount: React.FC = () => {
    const { bankAccountId } = useParams();
    const initialFormValues: FormValues = {
        id: '',
        bankName: '',
        fk_userId: '',
        accountHolderName: '',
        accountNumber: '',
        ifscCode: '',
        branchName: '',
        panNumber: '',
        voterId: '',
        aadhar: '',
        gst: '',
        accountType: '',
        verificationHistory: '',
        archive: '',
        approvedBy: '',
        approvedAt: '',
        createdBy: '',
        createdAt: '',
        updatedBy: '',
        updatedAt: '',
        bankVerify: '',
        pgLabel: '',
        pgVerify: '',

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
        const specificData = staticBankAccountData.find((data) => data.id === bankAccountId);

        // If specificData is found, update the formData state with its values
        if (specificData) {
            setFormData(specificData); // Set the entire form data
        }
    }, [bankAccountId]);

    const navItems = [
        {
            label: 'Home',
            to: '/',
            className: '',
        },
        {
            label: 'Bank Account',
            to: '/TransactionModule/BankAccount/ViewBankAccount',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/TransactionModule/BankAccount/ViewBankAccount' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Edit Bank Account',
            to: '/TransactionModule/BankAccount/EditBankAccount',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `/TransactionModule/BankAccount/EditBankAccount/${bankAccountId}` ? 'text-blue-600' : ''
            }`,
        },
    ];

    const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

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
                    <div className="panel mt-3">
                        <BankAccountModule details={formData} onInputChange={handleInputChange} showStatus={true} isEdit={true} />

                        <h1 className="text-2xl font-bold mt-10">Documents</h1>
                        <BankAccountDocumentModule details={formData} onInputChange={handleInputChange} showStatus={false} />
                        <div className="flex justify-center mt-6">
                            <button type="submit" className="btn btn-primary !mt-6 mr-4">
                                Submit
                            </button>
                            <button type="button" className="btn btn-danger !mt-6" onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditBankAccount;
