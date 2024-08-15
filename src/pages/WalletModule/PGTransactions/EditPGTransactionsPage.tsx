import React, { useState, ChangeEvent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import PGTransactionsModulePage from './PGTransactionsModulePage';
import { staticPGTransactionsData } from './ViewPGTransactionsPage';

interface FormValues {
    id: string;
    amount: string;
    fk_userid: string;
    transactionMode: string;
    archive: string;
    purposeOfTransaction: string;
    creditAndDebit: string;
    paymentModule: string;
    paymentStatus: string;
    coupon: string;
    thirdParty: string;
}

const EditPGTransactionsPage: React.FC = () => {
    const { pgTransactionsId } = useParams();
    const viewSpecific = true;
    const initialFormValues: FormValues = {
        id: '',
        amount: '',
        fk_userid: '',
        transactionMode: '',
        archive: '',
        purposeOfTransaction: '',
        creditAndDebit: ' ',
        paymentModule: '',
        paymentStatus: '',
        coupon: '',
        thirdParty: '',
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
        const specificData = staticPGTransactionsData.find((data) => data.id === pgTransactionsId);

        // If specificData is found, update the formData state with its values
        if (specificData) {
            setFormData(specificData as unknown as FormValues); // Set the entire form data
        }
    }, [pgTransactionsId]);

    const navItems = [
        {
            label: 'Home',
            to: '/',
            className: '',
        },
        {
            label: 'PG Transactions',
            to: '/TransactionModule/PGTransactions/ViewPGTransactions',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/TransactionModule/PGTransactions/ViewPGTransactions' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Edit PG Transactions',
            to: '/TransactionModule/PGTransactions/EditPGTransactions',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `/TransactionModule/PGTransactions/EditPGTransactions/${pgTransactionsId}` ? 'text-blue-600' : ''
            }`,
        },
    ];

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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
                    <PGTransactionsModulePage details={formData} onInputChange={handleInputChange} showStatus={true} viewSpecificEdit={viewSpecific} viewSpecific={false} />

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

export default EditPGTransactionsPage;
