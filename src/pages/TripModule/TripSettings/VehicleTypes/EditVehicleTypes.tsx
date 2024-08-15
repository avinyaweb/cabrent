import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import VehicleTypesModule from './VehicleTypesModule';
import { staticVehicleTypesData } from './ViewVehicleTypes';

interface FormValues {
    id: string;
    fk_serviceCity: string;
    vehicleType: string;
    serviceType: string;
    displayOrder: string;
    tripType: string;
    seatCapacity: string;
    lowCatVehicle: string; //==
    baseFee: string;
    leadCharge: string;
    perKMRate: string;
    minimumFare: string;
    commision: string; //==
    timeMinRate: string;
    rideLater: string;
    isVehAvailable: string; //==
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
    nightIncreseFare: string; //==
    isWaitCharge: string;
    beforeTripWaitChargeApplicable: string;
    maxWaitTime: string;
    minWaitTimeBeforeTrip: string;
    waitChargePerMin: string;
    waitingRate: string;
    archive: string;

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

const EditVehicleTypes: React.FC = () => {
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
    const [currentPage, setCurrentPage] = useState<string>('');

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to set the current page based on the path
    const setCurrent = (path: string) => {
        setCurrentPage(path);
    };

    useEffect(() => {
        // Find the specific data based on the serviceProviderId
        const specificData = staticVehicleTypesData.find((data) => data.id === vehicleTypesId);

        // If specificData is found, update the formData state with its values
        if (specificData) {
            setFormData(specificData); // Set the entire form data
        }
    }, [vehicleTypesId]);

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
            label: 'Edit Vehicle Types',
            to: '',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `` ? 'text-blue-600' : ''
            }`,
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
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <VehicleTypesModule details={formData} onInputChange={handleInputChange} showStatus={true} viewSpecific={false} isEditPage={true} />

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

export default EditVehicleTypes;
