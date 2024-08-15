import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import TicketsModule from './TicketsModule';
import { staticTicketsData } from './ViewTickets';

interface FormValues {
    id: string;
    raisedBy: string;
    raisedAgainst: string;
    initiatedDate: string;
    status: string;
    remarks: string;
    category: string;
    archive: string;
}

const EditTickets: React.FC = () => {
    const { ticketsId } = useParams();
    const initialFormValues: FormValues = {
        id: '',
        raisedBy: '',
        raisedAgainst: '',
        initiatedDate: '',
        status: '',
        remarks: '',
        category: '',
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
        const specificData = staticTicketsData.find((data) => data.id === ticketsId);

        // If specificData is found, update the formData state with its values
        if (specificData) {
            setFormData(specificData); // Set the entire form data
        }
    }, [ticketsId]);

    const navItems = [
        {
            label: 'Home',
            to: '/',
            className: '',
        },
        {
            label: 'Tickets',
            to: '/TripModule/Tickets/ViewTickets',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${currentPath === '/TripModule/Tickets/ViewTickets' ? 'text-blue-600' : ''}`,
        },
        {
            label: 'Edit Tickets',
            to: '',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${currentPath === `` ? 'text-blue-600' : ''}`,
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
                    <TicketsModule details={formData} onInputChange={handleInputChange} showStatus={true} />

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

export default EditTickets;
