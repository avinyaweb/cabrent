import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';

interface BookingsProps {
    details: {
        id: string;
        driver: string;
        vehicle: string;
        bookingAmtDistribution: string;
        user: string;
        ride: string;
        promocode: string;
        reviews: string; // New field
        ratings: string;
        coupon: string; // New
        driverratings: string; // New
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
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean; // New prop to conditionally show/hide status
    viewSpecific?: boolean;
}

const BookingsModule: React.FC<BookingsProps> = ({ details, onInputChange, showStatus = true, viewSpecific }) => {
    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    // Add your dropdown options here
    const statusOptions = ['APPROVED', 'REJECTED', 'SUSPENDED', 'ONHOLD', 'PENDING'];

    // Dynamic roles data fetching
    // useEffect(() => {
    //     const fetchRoles = async () => {
    //         try {
    //             const response = await getRoleData();
    //             const rolesData = response.data.roles;
    //             if (Array.isArray(rolesData)) {
    //                 // Extract role names from the fetched data and update roleOptions state
    //                 const roles = rolesData.map((fk_roleType: any) => ({
    //                     label: fk_roleType.roleName,
    //                     value: fk_roleType.roleId // Assuming roleId exists to uniquely identify the role
    //                 }));
    //                 setRoleOptions(roles);
    //             } else {
    //                 console.error('Invalid data format:', rolesData);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching roles:', error);
    //         }
    //     };
    //     fetchRoles();
    // }, []);

    return (
        <>
            <div className="grid grid-divs-1 sm:flex justify-between gap-5">
                <div className="lg:w-1/3">
                    <label htmlFor="driver" className="block mb-1">
                        Driver
                    </label>
                    <input
                        name="driver"
                        type="text"
                        id="driver"
                        placeholder="Enter Driver Name "
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.driver}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="vehicle" className="block mb-1">
                        Vehicle
                    </label>
                    <input
                        name="vehicle"
                        type="text"
                        id="vehicle"
                        placeholder="Enter Vehicle No "
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.vehicle}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="bookingAmtDistribution" className="block mb-1">
                        Booking Amount Distribution
                    </label>
                    <input
                        name="bookingAmtDistribution"
                        type="text"
                        id="bookingAmtDistribution"
                        placeholder="Enter Booking Amount Distribution "
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.bookingAmtDistribution}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3">
                    <label htmlFor="user" className="block mb-1">
                        User
                    </label>
                    <input
                        name="user"
                        type="text"
                        id="user"
                        placeholder="Enter User Name "
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.user}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="ride" className="block mb-1">
                        Ride
                    </label>
                    <input
                        name="ride"
                        type="text"
                        id="ride"
                        placeholder="Enter Ride Name "
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.ride}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="promocode" className="block mb-1">
                        Promocode
                    </label>
                    <input
                        name="promocode"
                        type="text"
                        id="promocode"
                        placeholder="Enter Promocode ID"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.promocode}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3">
                    <label htmlFor="coupen" className="block mb-1">
                        Coupen
                    </label>
                    <input
                        name="coupen"
                        type="text"
                        id="coupen"
                        placeholder={`${viewSpecific ? `` : `Enter coupen`}`}
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.coupon}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="driverratings" className="block mb-1">
                        Driver Ratings
                    </label>
                    <input
                        name="driverratings"
                        type="text"
                        id="driverratings"
                        placeholder="Enter driver ratings"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.driverratings}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="riderratings" className="block mb-1">
                        Rider Ratings
                    </label>
                    <input
                        name="riderratings"
                        type="text"
                        id="riderratings"
                        placeholder="Enter rider ratings"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.riderratings}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3">
                    <label htmlFor="invoice" className="block mb-1">
                        Invoice
                    </label>
                    <input
                        name="invoice"
                        type="text"
                        id="invoice"
                        placeholder={`${viewSpecific ? `` : `Enter Incovice`}`}
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        // value={details.invoice}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="bookingInitiationTime" className="block mb-1">
                        Booking Initiation Time
                    </label>
                    <input
                        name="bookingInitiationTime"
                        type="text"
                        id="bookingInitiationTime"
                        placeholder="Enter Booking Initiation Time"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.bookingInitiationTime}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="bookingConfirmedTime" className="block mb-1">
                        Booking Confirmed Time
                    </label>
                    <input
                        name="bookingConfirmedTime"
                        type="text"
                        id="bookingConfirmedTime"
                        placeholder="Enter Booking Confirmed Time"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.bookingConfirmedTime}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3">
                    <label htmlFor="bookingCancelledTime" className="block mb-1">
                        Booking Cancelled Time
                    </label>
                    <input
                        name="bookingCancelledTime"
                        type="text"
                        id="bookingCancelledTime"
                        placeholder="Enter Booking Cancelled Time"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.bookingCancelledTime}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="bookingCancelledBy" className="block mb-1">
                        Booking Cancelled By
                    </label>
                    <input
                        name="bookingCancelledBy"
                        type="text"
                        id="bookingCancelledBy"
                        placeholder="Enter Booking Cancelled By"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.bookingCancelledBy}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="cancellationReason" className="block mb-1">
                        Cancellation Reason
                    </label>
                    <input
                        name="cancellationReason"
                        type="text"
                        id="cancellationReason"
                        placeholder="Enter Cancellation Reason"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.cancellationReason}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3">
                    <label htmlFor="bookingConfirmedHistory" className="block mb-1">
                        Booking Confirmed History
                    </label>
                    <input
                        name="bookingConfirmedHistory"
                        type="text"
                        id="bookingConfirmedHistory"
                        placeholder="Enter Booking Confirmed History"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.bookingConfirmedHistory}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="bookingCancelledHistory" className="block mb-1">
                        Booking Cancelled History
                    </label>
                    <input
                        name="bookingCancelledHistory"
                        type="text"
                        id="bookingCancelledHistory"
                        placeholder="Enter Booking Cancelled History"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.bookingCancelledHistory}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="isDestinationChanged" className="block mb-1">
                        Is Destination Changed
                    </label>
                    <input
                        name="isDestinationChanged"
                        type="text"
                        id="isDestinationChanged"
                        placeholder="Enter Is Destination Changed"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.isDestinationChanged}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3">
                    <label htmlFor="changedDestination" className="block mb-1">
                        Changed Destination
                    </label>
                    <input
                        name="changedDestination"
                        type="text"
                        id="changedDestination"
                        placeholder="Enter Changed Destination"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.changedDestination}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="paymentHistory" className="block mb-1">
                        Payment History
                    </label>
                    <input
                        name="paymentHistory"
                        type="text"
                        id="paymentHistory"
                        placeholder="Enter Payment History"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.paymentHistory}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="isSOSUsed" className="block mb-1">
                        Is SOS Used
                    </label>
                    <input
                        name="isSOSUsed"
                        type="text"
                        id="isSOSUsed"
                        placeholder="Enter Is SOS Used"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.isSOSUsed}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3">
                    <label htmlFor="SOSTimestamp" className="block mb-1">
                        SOS Timestamp
                    </label>
                    <input
                        name="SOSTimestamp"
                        type="text"
                        id="SOSTimestamp"
                        placeholder={`${viewSpecific ? `` : `Enter SOS Timestamp`}`}
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.SOSTimestamp}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="paymentStatus" className="block mb-1">
                        Payment Status
                    </label>
                    {viewSpecific ? (
                        <input name="status" type="text" id="status" className={`form-input w-full pointer-events-none`} value={details.archive} onChange={onInputChange} />
                    ) : (
                        <select id="status" className="form-select text-white-dark" required>
                            <option value="">Select your Status</option>
                            <option value={'PENDING'}>PENDING</option>
                            <option value={'APPROVED'}>APPROVED</option>
                            <option value={'REJECTED'}>REJECTED</option>
                            <option value={'HOLD'}>HOLD</option>
                            <option value={'SUSPENDED'}>SUSPENDED</option>
                        </select>
                    )}
                </div>

                <div className="lg:w-1/3">
                    <label htmlFor="charges" className="block mb-1">
                        Charges
                    </label>
                    <input
                        name="charges"
                        type="text"
                        id="charges"
                        placeholder="Enter Charges"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.charges}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3">
                    <label htmlFor="otpVerification" className="block mb-1">
                        OTP Verification
                    </label>
                    <input
                        name="otpVerification"
                        type="text"
                        id="otpVerification"
                        placeholder="Enter OTP Verification"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.otpVerification}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="status" className="block mb-1">
                        Status
                    </label>
                    <input
                        name="status"
                        type="text"
                        id="status"
                        placeholder="Enter Status"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.status}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="bookingMode" className="block mb-1">
                        Booking Mode
                    </label>
                    <input
                        name="bookingMode"
                        type="text"
                        id="bookingMode"
                        placeholder="Enter Booking Mode"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.bookingMode}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3">
                    <label htmlFor="additionalCharges" className="block mb-1">
                        Additional Charges
                    </label>
                    <input
                        name="additionalCharges"
                        type="text"
                        id="additionalCharges"
                        placeholder="Enter Additional Charges"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.additionalCharges}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="acAvailable" className="block mb-1">
                        AC Available
                    </label>
                    <input
                        name="acAvailable"
                        type="text"
                        id="acAvailable"
                        placeholder="Enter AC Available"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.acAvailable}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="bookingType" className="block mb-1">
                        Booking Type
                    </label>
                    <input
                        name="bookingType"
                        type="text"
                        id="bookingType"
                        placeholder="Enter Booking Type"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.bookingType}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3">
                    <label htmlFor="driverAssignmentByType" className="block mb-1">
                        Driver Assignment By Type
                    </label>
                    <input
                        name="driverAssignmentByType"
                        type="text"
                        id="driverAssignmentByType"
                        placeholder="Enter Driver Assignment By Type"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.driverAssignmentByType}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="driverAssignmentBy" className="block mb-1">
                        Driver Assignment By
                    </label>
                    <input
                        name="driverAssignmentBy"
                        type="text"
                        id="driverAssignmentBy"
                        placeholder="Enter Driver Assignment By"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.driverAssignmentBy}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="serviceType" className="block mb-1">
                        Service Type
                    </label>
                    <input
                        name="serviceType"
                        type="text"
                        id="serviceType"
                        placeholder="Enter Service Type"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.serviceType}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3">
                    <label htmlFor="tickets" className="block mb-1">
                        Tickets
                    </label>
                    <input
                        name="tickets"
                        type="text"
                        id="tickets"
                        placeholder="Enter Tickets"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.tickets}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="leadSource" className="block mb-1">
                        Lead Source
                    </label>
                    <input
                        name="leadSource"
                        type="text"
                        id="leadSource"
                        placeholder="Enter Lead Source"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.leadSource}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="archive" className="block mb-1">
                        Archive
                    </label>
                    <input name="status" type="text" id="status" className={`form-input w-full pointer-events-none `} value={details.archive} onChange={onInputChange} />
                </div>
            </div>
        </>
    );
};

export default BookingsModule;
