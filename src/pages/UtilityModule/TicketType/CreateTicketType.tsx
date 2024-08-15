import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import TicketTypeModule from './TicketTypeModule';
import { createTicketType } from '@/services/UtilityServices/TicketTypeService';
import toast from 'react-hot-toast';

interface FormValues {
    ticketName: string;
    archive: string;
}

const CreateTicketType: React.FC = () => {
    const initialFormValues: FormValues = {
        ticketName: '',
        archive: '',
    };

    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormValues>(initialFormValues);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // handle form submit.
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await createTicketType(formData);
            if (response?.message) {
                toast.success(response?.message);
                setTimeout(() => {
                    navigate('/UtilityModule/TicketType/ViewTicketType');
                }, 2000);
            }

            setFormData(initialFormValues);
        } catch (error: any) {
            console.error('Error creating admin tickets:', error.message);
        }
    };

    const handleCancel = () => {
        window.location.reload();
    };

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to set the current page based on the path
    // const setCurrent = (path: string) => {
    //     setCurrentPage(path);
    // };

    const navItems = [
        {
            label: 'Home',
            to: '/',
            className: '',
        },
        {
            label: 'Ticket Type',
            to: '/UtilityModule/TicketType/ViewTicketType',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/UtilityModule/TicketType/ViewTicketType' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Create Ticket Type',
            to: '/UtilityModule/TicketType/CreateTicketType',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/UtilityModule/TicketType/CreateTicketType' ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <TicketTypeModule details={formData} onInputChange={handleInputChange} showStatus={false} />

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

export default CreateTicketType;
