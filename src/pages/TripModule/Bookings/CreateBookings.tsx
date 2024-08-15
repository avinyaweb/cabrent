import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import BookingsModule from './BookingsModule';

interface FormValues {
    id: string;
    driver: string;
    vehicle: string;
    bookingAmtDistribution: string;
    user: string;
    ride: string;
    promocode: string;
    reviews: string;
    ratings: string;
    coupon: string;
    driverratings: string;
    riderratings: string;
    tickets: string;
    invoice: string;
    bookingInitiationTime: string;
    bookingConfirmedTime: string;
    bookingCancelledTime: string;
    bookingCancelledBy: string;
    cancellationReason: string;
    bookingConfirmedHistory: string;
    bookingCancelledHistory: string;
    isDestinationChanged: string;
    changedDestination: string;
    paymentHistory: string;
    isSOSUsed: string;
    SOSTimestamp: string;
    paymentStatus: string;
    charges: string;
    otpVerification: string;
    status: string;
    bookingMode: string;
    additionalCharges: string;
    acAvailable: string;
    bookingType: string;
    driverAssignmentByType: string;
    driverAssignmentBy: string;
    serviceType: string;
    leadSource: string;
    archive: string;
}

const CreateBookings: React.FC = () => {
    const initialFormValues: FormValues = {
        id: '',
        driver: '',
        vehicle: '',
        bookingAmtDistribution: '',
        user: '',
        ride: '',
        promocode: '',
        reviews: '',
        ratings: '',
        coupon: '',
        driverratings: '',
        riderratings: '',
        tickets: '',
        invoice: '',
        bookingInitiationTime: '',
        bookingConfirmedTime: '',
        bookingCancelledTime: '',
        bookingCancelledBy: '',
        cancellationReason: '',
        bookingConfirmedHistory: '',
        bookingCancelledHistory: '',
        isDestinationChanged: '',
        changedDestination: '',
        paymentHistory: '',
        isSOSUsed: '',
        SOSTimestamp: '',
        paymentStatus: '',
        charges: '',
        otpVerification: '',
        status: '',
        bookingMode: '',
        additionalCharges: '',
        acAvailable: '',
        bookingType: '',
        driverAssignmentByType: '',
        driverAssignmentBy: '',
        serviceType: '',
        leadSource: '',
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

    const navItems = [
        {
            label: 'Home',
            to: '/',
            className: '',
        },
        {
            label: 'Bookings',
            to: '/TripModule/Bookings/ViewBookings',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${currentPath === '/TripModule/Bookings/ViewBookings' ? 'text-blue-600' : ''}`,
        },
        {
            label: 'Create Bookings',
            to: '/TripModule/Bookings/CreateBookings',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${currentPath === '/TripModule/Bookings/CreateBookings' ? 'text-blue-600' : ''}`,
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
                    <BookingsModule details={formData} onInputChange={handleInputChange} showStatus={false} />

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

export default CreateBookings;
