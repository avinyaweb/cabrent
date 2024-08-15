import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { updateTicketType, getTicketTypeById } from '@/services/UtilityServices/TicketTypeService';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import TicketTypeModule from './TicketTypeModule';

interface FormValues {
    ticketName: string;
    archive: string;
}

const EditTicketTypeModule: React.FC = () => {
    const navigate = useNavigate();

    const { ticketTypeId }: { ticketTypeId?: any } = useParams();

    const initialFormValues: FormValues = {
        ticketName: '',
        archive: '',
    };

    const [ticketTypeDetails, setTicketTypeDetails] = useState<FormValues>(initialFormValues);

    useEffect(() => {
        const fetchChannelPartnerDetails = async () => {
            try {
                const response = await getTicketTypeById(ticketTypeId);
                console.log('Fetched Data', response);
                setTicketTypeDetails(response.data.TicketType);
            } catch (error: any) {
                console.error('Error fetching channel partner details:', error.message);
            }
        };

        fetchChannelPartnerDetails();
    }, [ticketTypeId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTicketTypeDetails({ ...ticketTypeDetails, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await updateTicketType(ticketTypeId, ticketTypeDetails);
            console.log('Channel Partner details updated successfully!');
            navigate('/UtilityModule/TicketType/ViewTicketType');
        } catch (error: any) {
            console.error('Error updating channel partner details:', error.message);
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
            label: 'Edit Ticket Type',
            to: '/UtilityModule/TicketType/EditTicketType',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `/UtilityModule/TicketType/EditTicketType/${ticketTypeId}` ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <TicketTypeModule details={ticketTypeDetails} onInputChange={handleInputChange} showStatus={true} />

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

export default EditTicketTypeModule;
