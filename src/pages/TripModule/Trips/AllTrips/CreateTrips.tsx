import React, { useState, ChangeEvent } from 'react';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import TripsModule from './TripsModule';
import CreateBookings from '../../Bookings/CreateBookings';
import CreateBookingAmtDistribution from '../../BookingAmtDistribution/CreateBookingAmtDistribution';

interface FormValues {
    id: string;
    driverId: string;
    vehicleId: string;
    diverPhone: string;
    riderId: string;
    riderPhone: string;
    driverAcceptLocation: string;
    tripStatus: string;
    expectedDuration: string;
    actualDuration: string;
    distance: string;
    startTime: string;
    endTime: string;
    rideType: string;
    chargeExtraKM: string;
    extraTime: string;
    driverFacialVerificationStatus: string;
    expectedDriverArrivalTime: string;
    actualDriverArrivalTime: string;
    expectedDriverArrivalDuration: string;
    actualDriverArrivalDuration: string;
    pickupLocation: string;
    dropLocation: string;
    intermediateStop: string;
    routeDirection: string;
    realTimelocation: string;
    waitingTimeDuration: string;
    bookingAmtDistribution: string;
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
    serviceType: string;
    leadSource: string;
    promocode: string;
    reviews: string;
    coupon: string;
    tickets: string;
    fk_Servicecity: string;
    fk_vehicleType: string;
    driverProfilePic: string;
    driverSince: string;
    driverName: string;
    vehicleNumber: string;
    vehicleModel: string;
    riderratings: string;
    riderName: string;
    riderSince: string;
    riderProfilePic: string;
    estimationFareDetails: string;
    requerstedTime: string;
    acceptedTime: string;
    calls: string;
    messages: string;
    isriderTrackedDriver: string;
    paymentMode: string;
    discount: string;
    convenienceCharge: string;
    isInvoiceShared: string;
    vehicleRatings: string;
    driverAssignmentByType: string;
    driverAssignmentBy: string;
    driverratings: string;
    archive: string;
    approvedBy: string;
    approvedAt: string;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
}

const CreateTrips: React.FC = () => {
    const initialFormValues: FormValues = {
        id: '',
        driverId: '',
        vehicleId: '',
        diverPhone: '',
        riderId: '',
        riderPhone: '',
        driverAcceptLocation: '',
        tripStatus: '',
        expectedDuration: '',
        actualDuration: '',
        distance: '',
        startTime: '',
        endTime: '',
        rideType: '',
        chargeExtraKM: '',
        extraTime: '',
        driverFacialVerificationStatus: '',
        expectedDriverArrivalTime: '',
        actualDriverArrivalTime: '',
        expectedDriverArrivalDuration: '',
        actualDriverArrivalDuration: '',
        pickupLocation: '',
        dropLocation: '',
        intermediateStop: '',
        routeDirection: '',
        realTimelocation: '',
        waitingTimeDuration: '',
        bookingAmtDistribution: '',
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
        serviceType: '',
        leadSource: '',
        promocode: '',
        reviews: '',
        coupon: '',
        tickets: '',
        fk_Servicecity: '',
        fk_vehicleType: '',
        driverProfilePic: '',
        driverSince: '',
        driverName: '',
        vehicleNumber: '',
        vehicleModel: '',
        riderratings: '',
        riderName: '',
        riderSince: '',
        riderProfilePic: '',
        estimationFareDetails: '',
        requerstedTime: '',
        acceptedTime: '',
        calls: '',
        messages: '',
        isriderTrackedDriver: '',
        paymentMode: '',
        discount: '',
        convenienceCharge: '',
        isInvoiceShared: '',
        vehicleRatings: '',
        driverAssignmentByType: '',
        driverAssignmentBy: '',
        driverratings: '',
        archive: '',
        approvedBy: '',
        approvedAt: '',
        createdBy: '',
        createdAt: '',
        updatedBy: '',
        updatedAt: '',
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
            label: 'Trips',
            to: '/TripModule/Trips/ViewTrips',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${currentPath === '/TripModule/Trips/ViewTrips' ? 'text-blue-600' : ''}`,
        },
        {
            label: 'Create Trips',
            to: '/TripModule/Trips/CreateTrips',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${currentPath === '/TripModule/Trips/CreateTrips' ? 'text-blue-600' : ''}`,
        },
    ];

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

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
                    <TripsModule details={formData} onInputChange={handleInputChange} showStatus={false} />
                    <CreateBookings />
                    <CreateBookingAmtDistribution />

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

export default CreateTrips;
