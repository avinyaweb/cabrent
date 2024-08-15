import React, { useState, ChangeEvent } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Link, useLocation } from 'react-router-dom';

interface ManualTaxiDispatchProps {
    details: {
        riderPhoneNumber: string;
        riderName: string;
        email: string;
        tripType: string;
        isACTurnedOn: string;
        pickupLocation: string;
        dropLocation: string;
        vehicleType: string;
        bookingType: string;
        driverAssignmentType: string;
        promocode: string;
        manuallyAddCallCentreBookingCharge: string;
    };
    onInputChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    showStatus?: boolean;
    viewSpecific?: boolean;
}

const ManualTaxiDispatch = () => {
    const details = {
        riderPhoneNumber: '',
        riderName: '',
        email: '',
        tripType: '',
        isACTurnedOn: '',
        pickupLocation: '',
        dropLocation: '',
        vehicleType: '',
        bookingType: '',
        driverAssignmentType: '',
        promocode: '',
        manuallyAddCallCentreBookingCharge: '',
    };

    const rideDetailsData = [
        { label: 'Total Distance:', value: '10.25 KM' },
        { label: 'Estimated Time:', value: '15 Mins' },
        { label: 'Base Fee:', value: '₹ 50.00' },
        { label: 'Lead Charge:', value: '₹ 20.00' },
        { label: 'Pickup Charge:', value: '₹ 10.00' },
        { label: 'Minimum Fare (10.00 ₹):', value: '₹ 100.00' },
        { label: 'Distance Fare (8.00 ₹/KM):', value: '₹ 82.00 (N/A)' },
        { label: 'Time Fare (5.00 ₹/Min):', value: '₹ 75.00' },
        { label: 'Waiting Charge (2.00 ₹/Min):', value: '₹ 30.00' },
        { label: 'Promo Code:', value: '₹ 25.00' },
        { label: 'Call center Fee:', value: '₹ 5.00' },
        { label: 'Surge Amount:', value: '₹ 0.00' },
        { label: 'Surge Reason:', value: 'Peak Hours' },
        { label: 'Tax Amount (5.00 %):', value: '₹ 18.25' },
        { label: 'Gateway Charge (2.00 %):', value: '₹ 7.30' },
        { label: 'Total Fare:', value: '₹ 472.55' },
    ];

    const viewSpecific = false;
    const [moduleDetails, setModuleDetails] = useState(details);
    const [value, setValue] = useState('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setModuleDetails({ ...moduleDetails, [name]: value });
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
                        currentPath === '/TripModule/Dispatch/ManualTaxiDispatch/ManualTaxiDispatch' ? 'text-blue-600' : ''
                    }`}
                >
                    <Link
                        to="/TripModule/Dispatch/ManualTaxiDispatch/ManualTaxiDispatch"
                        className={currentPage === '/TripModule/Dispatch/ManualTaxiDispatch/ManualTaxiDispatch' ? 'active' : ''}
                        onClick={() => setCurrent('/viewAdmin')}
                    >
                        Dispatch
                    </Link>
                </li>
                <li
                    className={`before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                        currentPath === '/TripModule/Dispatch/ManualTaxiDispatch/ManualTaxiDispatch' ? 'text-blue-600' : ''
                    }`}
                >
                    Create Manual Taxi Dispatch
                </li>
            </ol>

            <div className="flex gap-4">
                <div className="panel mt-6 w-[70%]">
                    <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                        <div className="lg:w-1/2">
                            <label htmlFor="riderPhoneNumber" className="block mb-1">
                                Rider Phone Number
                            </label>
                            <input
                                name="riderPhoneNumber"
                                type="text"
                                id="riderPhoneNumber"
                                placeholder="Enter Rider Phone Number"
                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                readOnly={viewSpecific}
                                value={details?.riderPhoneNumber}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="lg:w-1/2">
                            <label htmlFor="riderName" className="block mb-1">
                                Rider Name
                            </label>
                            <input
                                name="riderName"
                                type="text"
                                id="riderName"
                                placeholder="Enter Rider Name"
                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                readOnly={viewSpecific}
                                value={details?.riderName}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                        <div className="lg:w-1/3">
                            <label htmlFor="email" className="block mb-1">
                                Email
                            </label>
                            <input
                                name="email"
                                type="text"
                                id="email"
                                placeholder="Enter Email Address"
                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                readOnly={viewSpecific}
                                value={details?.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="tripType" className="block mb-1">
                                Trip Type
                            </label>
                            {viewSpecific ? (
                                <input
                                    name="tripType"
                                    type="text"
                                    id="tripType"
                                    className={`form-input w-full pointer-events-none`}
                                    readOnly={viewSpecific}
                                    value={details?.tripType}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <select id="tripType" className="form-select text-white-dark">
                                    <option value="">Select your Trip Type</option>
                                    <option value={'Daily'}>Daily</option>
                                    <option value={'Rental'}>Rental</option>
                                    <option value={'OutStation'}>OutStation</option>
                                </select>
                            )}
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="isACTurnedOn" className="block mb-1">
                                AC / Non AC
                            </label>
                            {viewSpecific ? (
                                <input
                                    name="isACTurnedOn"
                                    type="text"
                                    id="isACTurnedOn"
                                    className={`form-input w-full pointer-events-none`}
                                    readOnly={viewSpecific}
                                    value={details?.isACTurnedOn}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <select id="isACTurnedOn" className="form-select text-white-dark">
                                    <option value="">Select AC / Non AC</option>
                                    <option value={'AC'}>AC</option>
                                    <option value={'Non AC'}>Non AC</option>
                                </select>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                        <div className="lg:w-1/3">
                            <label htmlFor="pickupLocation" className="block mb-1">
                                Pickup Location
                            </label>
                            <input
                                name="pickupLocation"
                                type="text"
                                id="pickupLocation"
                                placeholder="Enter Pickup Location"
                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                readOnly={viewSpecific}
                                value={details?.pickupLocation}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="lg:w-1/3">
                            <label htmlFor="dropLocation" className="block mb-1">
                                Drop Location
                            </label>
                            <input
                                name="dropLocation"
                                type="text"
                                id="dropLocation"
                                placeholder="Enter Drop Location"
                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                readOnly={viewSpecific}
                                value={details?.dropLocation}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="lg:w-1/3">
                            <label htmlFor="getAvailableVehicle" className="block mb-1">
                                Get Available Vehicle
                            </label>
                            <button type="button" className="btn btn-primary w-full">
                                Search
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                        <div className="lg:w-1/3">
                            <label htmlFor="vehicleType" className="block mb-1">
                                Vehicle Type
                            </label>
                            {viewSpecific ? (
                                <input
                                    name="vehicleType"
                                    type="text"
                                    id="vehicleType"
                                    className={`form-input w-full pointer-events-none`}
                                    readOnly={viewSpecific}
                                    value={details?.vehicleType}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <select id="vehicleType" className="form-select text-white-dark">
                                    <option value="">Select Your Vehicle Type</option>
                                    <option value={'Sedan'}>Sedan</option>
                                    <option value={'Mini'}>Mini</option>
                                    <option value={'Hatchback'}>Hatchback</option>
                                    <option value={'XUV'}>XUV</option>
                                </select>
                            )}
                        </div>

                        <div className="lg:w-1/3">
                            <label htmlFor="bookingType" className="block mb-1">
                                Booking Type
                            </label>
                            {viewSpecific ? (
                                <input
                                    name="bookingType"
                                    type="text"
                                    id="bookingType"
                                    className={`form-input w-full pointer-events-none`}
                                    readOnly={viewSpecific}
                                    value={details?.bookingType}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <select id="bookingType" className="form-select text-white-dark">
                                    <option value="">Select your Booking Type</option>
                                    <option value={'Ride Now'}>Ride Now</option>
                                    <option value={'Ride Later'}>Ride Later</option>
                                </select>
                            )}
                        </div>

                        <div className="lg:w-1/3">
                            <label htmlFor="driverAssignmentType" className="block mb-1">
                                Driver Assignment Type
                            </label>
                            {viewSpecific ? (
                                <input
                                    name="driverAssignmentType"
                                    type="text"
                                    id="driverAssignmentType"
                                    className={`form-input w-full pointer-events-none`}
                                    readOnly={viewSpecific}
                                    value={details?.driverAssignmentType}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <select id="driverAssignmentType" className="form-select text-white-dark">
                                    <option value="">Select Driver Assignment Type</option>
                                    <option value={'Manual'}>Manual</option>
                                    <option value={'Auto Assign'}>Auto Assign</option>
                                </select>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                        <div className="lg:w-1/2">
                            <label htmlFor="promocode" className="block mb-1">
                                Promocode
                            </label>
                            <input
                                name="promocode"
                                type="text"
                                id="promocode"
                                placeholder="Enter Promocode"
                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                readOnly={viewSpecific}
                                value={details?.promocode}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="lg:w-1/2">
                            <label htmlFor="manuallyAddCallCentreBookingCharge" className="block mb-1">
                                Call Centre Booking Charge
                            </label>
                            <input
                                name="manuallyAddCallCentreBookingCharge"
                                type="text"
                                id="manuallyAddCallCentreBookingCharge"
                                placeholder="Enter Call Centre Booking Charge"
                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                readOnly={viewSpecific}
                                value={details?.manuallyAddCallCentreBookingCharge}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="panel mt-6 w-[30%] border border-gray-300 border-dashed">
                    <h1 className="text-xl font-bold my-2">Fare Details</h1>
                    <div className="ride-details">
                        {rideDetailsData?.map((item, index) => (
                            <div className="detail my-1" key={item?.value}>
                                <span>{item?.label}</span>
                                <span>{item?.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ManualTaxiDispatch;
