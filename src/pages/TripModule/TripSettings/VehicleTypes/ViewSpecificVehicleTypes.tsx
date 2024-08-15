import React, { useState, ChangeEvent, FormEvent, useEffect, Fragment } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Dialog, Transition, Tab } from '@headlessui/react';
import { updateChannelPartner, getChannelPartnerById } from '@/services/ChannelPartnerService';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import VehicleTypesModule from './VehicleTypesModule';
import { staticVehicleTypesData } from './ViewVehicleTypes';
import AuditLogsTable from '@/components/CommonTables/AuditLogsTable';
import UpdatedHistoryTable from '@/components/CommonTables/UpdatedHistoryTable';
import { AiOutlineAudit } from 'react-icons/ai';
import { FaCarSide } from 'react-icons/fa6';
import ViewSpecificBookingAmtDistribution from '../../BookingAmtDistribution/ViewSpecificBookingAmtDistribution';

interface FormValues {
    id: string;
    vehicleType: string;
    serviceType: string;
    displayOrder: string;
    tripType: string;
    seatCapacity: string;
    fk_serviceCity: string;
    lowCatVehicle: string;
    baseFee: string;
    leadCharge: string;
    perKMRate: string;
    minimumFare: string;
    commision: string;
    timeMinRate: string;
    rideLater: string;
    isVehAvailable: string;
    description: string;
    features: string;
    vehicleIcon: string;
    conveyanceAvail: string;
    conveyanceCharge: string;
    taxApplicable: string;
    cgst: string;
    sgst: string;
    cancelChargeDriver: string;
    cancelChargeRider: string;
    peakHourStart: string;
    peakHourEnd: string;
    peakFareIncrease: string;
    peakHourStart2: string;
    peakHourEnd2: string;
    peakFare2Increase: string;
    nightHourStart: string;
    nightHourEnd: string;
    nightIncreseFare: string;
    isWaitCharge: string;
    beforeTripWaitChargeApplicable: string; //boolean
    maxWaitTime: string;
    minWaitTimeBeforeTrip: string;
    waitChargePerMin: string;
    waitingRate: string;
    archive: string;
    approvedAt: string;
    approvedBy: string;
    createdAt: string;
    createdBy: string;
    updatedHistory: {
        updatedTime: string;
        _id: string;
        updatedByObjectId?: string; // Optional field
    }[];

    //booking amt dist
    actualTripCost: string;
    leadCharges1: string;
    leadCharges2: string;
    convinenceCharge: string;
    adminCharge: string;
    tax: string;
    techCharges: string;
    promotionDiscount: string;
    SPDiscount: string;
}

const ViewSpecificVehicleTypes: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const viewSpecific = true;
    const { vehicleTypesId } = useParams();
    const initialFormValues: FormValues = {
        id: '',
        vehicleType: '',
        serviceType: '',
        displayOrder: '',
        tripType: '',
        seatCapacity: '',
        fk_serviceCity: '',
        lowCatVehicle: '',
        baseFee: '',
        leadCharge: '',
        perKMRate: '',
        minimumFare: '',
        commision: '',
        timeMinRate: '',
        rideLater: '',
        isVehAvailable: '',
        description: '',
        features: '',
        vehicleIcon: '',
        conveyanceAvail: '',
        conveyanceCharge: '',
        taxApplicable: '',
        cgst: '',
        sgst: '',
        cancelChargeDriver: '',
        cancelChargeRider: '',
        peakHourStart: '',
        peakHourEnd: '',
        peakFareIncrease: '',
        peakHourStart2: '',
        peakHourEnd2: '',
        peakFare2Increase: '',
        nightHourStart: '',
        nightHourEnd: '',
        nightIncreseFare: '',
        isWaitCharge: '',
        beforeTripWaitChargeApplicable: '',
        maxWaitTime: '',
        minWaitTimeBeforeTrip: '',
        waitChargePerMin: '',
        waitingRate: '',
        archive: '',
        approvedAt: '',
        approvedBy: '',
        createdAt: '',
        createdBy: '',
        updatedHistory: [], // Initialize as an empty array

        actualTripCost: '',
        leadCharges1: '',
        leadCharges2: '',
        convinenceCharge: '',
        adminCharge: '',
        tax: '',
        techCharges: '',
        promotionDiscount: '',
        SPDiscount: '',
    };

    const [formData, setFormData] = useState<FormValues>(initialFormValues);
    const [modal1, setModal1] = useState(false);

    // useEffect(() => {
    //     // Find the specific data based on the serviceProviderId
    //     const specificData = staticVehicleTypesData.find((data) => data.id === vehicleTypesId);

    //     // If specificData is found, update the formData state with its values
    //     if (specificData) {
    //         setFormData(specificData); // Set the entire form data
    //     }
    // }, [vehicleTypesId]);

    useEffect(() => {
        // Find the specific data based on the vehicleTypesId
        const specificData = staticVehicleTypesData.find((data) => data.id === vehicleTypesId);

        // If specificData is found, update the formData state with its values
        if (specificData) {
            // Ensure specificData matches the FormValues interface
            const formDataCopy: FormValues = {
                ...initialFormValues, // Start with initialFormValues
                ...specificData, // Override with specificData
            };
            setFormData(formDataCopy);
        }
    }, [vehicleTypesId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

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
            label: 'Vehicle Types',
            to: '/TripModule/TripSettings/VehicleTypes/ViewVehicleTypes',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/TripModule/VehicleTypes/ViewVehicleTypes' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'View Vehicle Types',
            to: '/TripModule/TripSettings/VehicleType/ViewSpecificVehicleTypes/1',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `` ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />
            <div className="panel mt-6">
                <Tab.Group>
                    <Tab.List className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'text-secondary !outline-none before:!w-full' : ''
                                    } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                >
                                    <FaCarSide className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Vehicle Type</span>
                                </button>
                            )}
                        </Tab>
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'text-secondary !outline-none before:!w-full' : ''
                                    } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                >
                                    <AiOutlineAudit className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Audit Log</span>
                                </button>
                            )}
                        </Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <div className="mt-5">
                                <VehicleTypesModule details={formData} onInputChange={handleInputChange} showStatus={true} viewSpecific={viewSpecific} isEditPage={false} />

                                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                    <div className="lg:w-1/3">
                                        <label htmlFor="approvedAt" className="block mb-1">
                                            Approved At
                                        </label>
                                        <input
                                            name="approvedAt"
                                            type="text"
                                            id="approvedAt"
                                            placeholder="Enter Approved At"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            readOnly={viewSpecific}
                                            value={formData.approvedAt}
                                        />
                                    </div>
                                    <div className="lg:w-1/3">
                                        <label htmlFor="approvedBy" className="block mb-1">
                                            Approved By
                                        </label>
                                        <input
                                            name="approvedBy"
                                            type="text"
                                            id="approvedBy"
                                            placeholder="Enter Approved By"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            readOnly={viewSpecific}
                                            value={formData.approvedBy}
                                        />
                                    </div>
                                    <div className="lg:w-1/3">
                                        <label htmlFor="createdAt" className="block mb-1">
                                            Created At
                                        </label>
                                        <input
                                            name="createdAt"
                                            type="text"
                                            id="createdAt"
                                            placeholder="Enter Created At"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            readOnly={viewSpecific}
                                            value={formData.createdAt}
                                        />
                                    </div>
                                    <div className="lg:w-1/3">
                                        <label htmlFor="createdBy" className="block mb-1">
                                            Created By
                                        </label>
                                        <input
                                            name="createdBy"
                                            type="text"
                                            id="createdBy"
                                            placeholder="Enter Created By"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            readOnly={viewSpecific}
                                            value={formData.createdBy}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="mt-5">
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark">
                                    <h2>Audit logs</h2>
                                </div>
                                <AuditLogsTable />
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h2>Updated Hisory</h2>
                                </div>
                                <UpdatedHistoryTable />
                            </div>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </>
    );
};

export default ViewSpecificVehicleTypes;
