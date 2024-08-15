import React, { useState, ChangeEvent } from 'react';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import BankAccountModule from './BankAccountModule';
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

const CreateBankAccount: React.FC = () => {
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
    const setCurrent = (path: string) => {
        setCurrentPage(path);
    };

    // const navItems = [
    //     {
    //         label: 'Home',
    //         to: '/',
    //         className: '',
    //     },
    //     {
    //         label: 'Bank Account',
    //         to: '/TransactionModule/BankAccount/ViewBankAccount',
    //         className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
    //             currentPath === '/TransactionModule/BankAccount/ViewBankAccount' ? 'text-blue-600' : ''
    //         }`,
    //     },
    //     {
    //         label: 'Create Bank Account',
    //         to: '/TransactionModule/BankAccount/CreateBankAccount',
    //         className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
    //             currentPath === '/TransactionModule/BankAccount/CreateBankAccount' ? 'text-blue-600' : ''
    //         }`,
    //     },
    // ];

    const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    //will use in future
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
            {/* <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} /> */}

            <div className="panel mt-3">
                <form onSubmit={handleSubmit}>
                    <BankAccountModule details={formData} onInputChange={handleInputChange} showStatus={false} />
                    <h1 className="text-2xl font-bold mt-10">Documents</h1>
                    <BankAccountDocumentModule details={formData} onInputChange={handleInputChange} showStatus={false} />
                </form>
            </div>
        </>
    );
};

export default CreateBankAccount;
