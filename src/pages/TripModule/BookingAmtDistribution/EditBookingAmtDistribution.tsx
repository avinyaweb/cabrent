import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import BookingAmtDistributionModule from './BookingAmtDistributionModule';
import { staticBookingAmtDistributionData } from './ViewBookingAmtDistribution';

interface FormValues {
    id: string;
    actualTripCost: string;
    cgst: string;
    sgst: string;
    leadCharges1: string;
    leadCharges2: string;
    convinenceCharge: string;
    adminCharge: string;
    tax: string;
    techCharges: string;
    promotionDiscount: string;
    SPDiscount: string;
    archive: string;
}

const EditBookingAmtDistribution: React.FC = () => {
    const { bookingAmtDistributionId } = useParams();
    const initialFormValues: FormValues = {
        id: '',
        actualTripCost: '',
        cgst: '',
        sgst: '',
        leadCharges1: '',
        leadCharges2: '',
        convinenceCharge: '',
        adminCharge: '',
        tax: '',
        techCharges: '',
        promotionDiscount: '',
        SPDiscount: '',
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
        const specificData = staticBookingAmtDistributionData.find((data) => data.id === bookingAmtDistributionId);

        // If specificData is found, update the formData state with its values
        if (specificData) {
            setFormData(specificData); // Set the entire form data
        }
    }, [bookingAmtDistributionId]);

    const navItems = [
        {
            label: 'Home',
            to: '/',
            className: '',
        },
        {
            label: 'Booking Amt Distribution',
            to: '/TripModule/BookingAmtDistribution/ViewBookingAmtDistribution',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${currentPath === '/TripModule/BookingAmtDistribution/ViewBookingAmtDistribution' ? 'text-blue-600' : ''}`,
        },
        {
            label: 'Edit Booking Amt Distribution',
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
            {/* <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} /> */}

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <BookingAmtDistributionModule details={formData} onInputChange={handleInputChange} showStatus={true} />

                    {/* <div className="flex justify-center mt-6">
                        <button type="submit" className="btn btn-primary !mt-6 mr-4">
                            Submit
                        </button>
                        <button type="button" className="btn btn-danger !mt-6" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div> */}
                </form>
            </div>
        </>
    );
};

export default EditBookingAmtDistribution;
