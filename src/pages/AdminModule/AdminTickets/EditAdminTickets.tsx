import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateAdminTickets, getAdminTicketsById } from '@/services/AdminTicketsService';
import AdminTicketsModule from './AdminTicketsModule';
import { staticTicketData } from './ViewAdminTickets';

interface FormValues {
    _id: string;
    ticketIdKey: string;
    title: string;
    ticketType: string;
    priority: string;
    fk_raisedBy: string;
    raisedAgainst: string;
    city: string;
    archive: string;
    adminTeamsType: string;
    description: string;
    remarks: string;
    fk_raisedAgainstType: string;
    closedAt: string;
    closedBy: string;
    status: string;
}

const EditAdminTickets: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { adminTicketsId } = useParams();
    const initialFormValues: FormValues = {
        _id: '',
        ticketIdKey: '',
        title: '',
        ticketType: '',
        priority: '',
        fk_raisedBy: '',
        raisedAgainst: '',
        city: '',
        archive: '',
        adminTeamsType: '',
        description: '',
        remarks: '',
        fk_raisedAgainstType: '',
        closedAt: '',
        closedBy: '',
        status: '',
    };

    const [adminTicketsDetails, setAdminTicketsDetails] = useState<FormValues>(initialFormValues);

    useEffect(() => {
        // Find the specific data based on the serviceProviderId
        const specificData: any = staticTicketData.find((data) => data.id === adminTicketsId);

        // If specificData is found, update the formData state with its values
        if (specificData) {
            setAdminTicketsDetails(specificData); // Set the entire form data
        }
    }, [adminTicketsId]);

    // useEffect(() => {
    //     const fetchAdminTicketsDetails = async () => {
    //         try {
    //             const response = await getAdminTicketsById(adminTicketsId);
    //             console.log('Fetched Data', response);
    //             setAdminTicketsDetails(response);
    //         } catch (error: any) {
    //             console.error('Error fetching admin Tickets details:', error.message);
    //         }
    //     };

    //     fetchAdminTicketsDetails();
    // }, [adminTicketsId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAdminTicketsDetails({ ...adminTicketsDetails, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            navigate('/adminModule/adminTickets/viewSpecificAdminTickets/1');
            // await updateAdminTickets(adminTicketsId, adminTicketsDetails);
            // console.log('Admin team details updated successfully!');
        } catch (error: any) {
            console.error('Error updating admin team details:', error.message);
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
                        currentPath === `/adminModule/adminTickets/editAdminTickets/${adminTicketsId}` ? 'text-blue-600' : ''
                    }`}
                >
                    Edit Admin Tickets
                </li>
            </ol>

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <AdminTicketsModule details={adminTicketsDetails} onInputChange={handleInputChange} showStatus={true} viewSpecific={false} isEditPage={true} />
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

export default EditAdminTickets;
