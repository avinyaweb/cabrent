import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { createAdminTicketsData } from '@/services/AdminTicketsService';
import AdminTicketsModule from './AdminTicketsModule';
import toast from 'react-hot-toast';

interface FormValues {
    ticketIdKey: string;
    title: string;
    ticketType: string;
    priority: string;
    raisedBy: string;
    archive: string;
    adminTeamsType: string;
    description: string;
    fk_raisedBy: string;
    raisedAgainst: string;
    fk_raisedAgainstType: string;
    closedAt: string;
    closedBy: string;
    status: string;
    remarks: string;
}

const CreateAdminTickets: React.FC = () => {
    const initialFormValues: FormValues = {
        ticketIdKey: '',
        title: '',
        ticketType: '',
        priority: '',
        raisedBy: '',
        archive: 'PENDING',
        adminTeamsType: '',
        description: '',
        fk_raisedBy: '',
        raisedAgainst: '',
        fk_raisedAgainstType: '',
        closedAt: '',
        closedBy: '',
        status: '',
        remarks: '',
    };

    const [formData, setFormData] = useState<FormValues>(initialFormValues);
    const navigate = useNavigate();
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // const response = await createAdminTicketsData(formData);
            // if (response?.message) {
            //     toast.success('Admin Ticket Created Successfully.');
            //     setTimeout(() => {
            //         navigate('/adminModule/adminTickets/viewAdminTickets');
            //     }, 2000);
            // }
            // setFormData(initialFormValues);
            navigate('/adminModule/adminTickets/viewSpecificAdminTickets/1');
        } catch (error: any) {
            console.error('Error creating admin tickets:', error.message);
        }
    };
    const handleCancel = () => {
        navigate('/adminModule/adminTickets/viewAdminTickets');
    };

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to set the current page based on the path
    const setCurrent = (path: string) => {
        setCurrentPage(path);
    };

    return (
        <>
            <ol className="flex text-gray-500 font-semibold dark:text-white-dark flex-wrap">
                <li className="">
                    <Link to="/" className={currentPage === '/' ? 'active' : ''} onClick={() => setCurrent('/')}>
                        Home
                    </Link>
                </li>
                <li
                    className={`before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                        currentPath === '/adminModule/adminTickets/viewAdminTickets' ? 'text-blue-600' : ''
                    }`}
                >
                    <Link
                        to="/adminModule/adminTickets/viewAdminTickets"
                        className={currentPage === '/adminModule/adminTickets/viewAdminTickets' ? 'active' : ''}
                        onClick={() => setCurrent('/viewAdminTickets')}
                    >
                        Admin Tickets
                    </Link>
                </li>
                <li
                    className={`before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                        currentPath === '/adminModule/adminTickets/createAdminTickets' ? 'text-blue-600' : ''
                    }`}
                >
                    Create Admin Tickets
                </li>
            </ol>

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <AdminTicketsModule details={formData} onInputChange={handleInputChange} showStatus={false} viewSpecific={false} redirect={false} isEditPage={false} />
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

export default CreateAdminTickets;
