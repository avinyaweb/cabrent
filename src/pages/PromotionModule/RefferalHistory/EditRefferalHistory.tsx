import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import RefferalHistoryModule from './RefferalHistoryModule';
import { staticRefferalHistoryData } from './ViewRefferalHistory';

interface FormValues {
    id: string;
    invitedByType: string;
    invitedToType: string;
    refferalMaster: string;
    invitedByUser: string;
    invitedToUser: string;
    archive: string;
}

const EditRefferalHistory: React.FC = () => {
    const { refferalHistoryId } = useParams();
    const initialFormValues: FormValues = {
        id: '',
        invitedByType: '',
        invitedToType: '',
        refferalMaster: '',
        invitedByUser: '',
        invitedToUser: '',
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

    // useEffect(() => {
    //     // Find the specific data based on the serviceProviderId
    //     const specificData = staticRefferalHistoryData.find(data => data.id === refferalHistoryId);

    //     // If specificData is found, update the formData state with its values
    //     if (specificData) {
    //         setFormData(specificData); // Set the entire form data
    //     }
    // }, [refferalHistoryId]);

    useEffect(() => {
        // Find the specific data based on the refferalHistoryId
        const specificData = staticRefferalHistoryData.find((data) => data.id === refferalHistoryId);

        // If specificData is found, update the formData state with its values
        if (specificData) {
            // Ensure specificData matches the FormValues interface
            const formDataCopy: FormValues = {
                ...initialFormValues, // Start with initialFormValues
                ...specificData, // Override with specificData
            };
            setFormData(formDataCopy);
        }
    }, [refferalHistoryId]);

    const navItems = [
        {
            label: 'Home',
            to: '/',
            className: '',
        },
        {
            label: 'Refferal History',
            to: '/PromotionModule/RefferalHistory/ViewRefferalHistory',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${currentPath === '/PromotionModule/RefferalHistory/ViewRefferalHistory' ? 'text-blue-600' : ''}`,
        },
        {
            label: 'Edit Refferal History',
            to: '',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${currentPath === `` ? 'text-blue-600' : ''}`,
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
                    <RefferalHistoryModule details={formData} onInputChange={handleInputChange} showStatus={true} />

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

export default EditRefferalHistory;
