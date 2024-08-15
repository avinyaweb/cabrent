import React, { useState, ChangeEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import FleetOwnerModule from './FleetOwnerModule';
import FleetOwnerDocLayout from './FleetOwnerDocLayout';

interface FormValues {
    companyType: string;
    distributor: string;
    TravelAgencyType: string;
    TravelAgencyName: string;
    mobileNumber: string;
    altMobileNumber: string;
    firstName: string;
    middleName: string;
    lastName: string;
    dob: string;
    gender: string;
    email: string;
    country: string;
    state: string;
    city: string;
    regAddress: string;
    commAddress: string;
    companyName: string;
    archive: string;
    fk_serviceCity: string;
    fatherName: string;
    ProfileStatus: string;
    leasedVehicle: string;
    agreedSaasContract: boolean;
    digitalTravelAgencyOwner: boolean;
    leasedAgreementImg: string;
    walletAmount: string;
    walletStatus: string;

    //new fields
    numberOfVehicle: string;
    numberOfDriver: string;
    activeDriver: string;
    inactiveDriver: string;
    activeVehicle: string;
    inactiveVehicle: string;
    Password: string;
    uniqueId: string;
    vehicleNumber: string;
    driverMobileNumber: string;
    driverName: string;
    driverPassword: string;
    referralCode: string;
    referredBy: string;
    distributorCode: string;
    ownerAddress: string;
}

const CreateFleetOwner: React.FC = () => {
    const secondPanelRef = useRef(null);
    const initialFormValues: FormValues = {
        companyType: '',
        distributor: '',
        TravelAgencyType: '',
        TravelAgencyName: '',
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        dob: '',
        gender: '',
        fatherName: '',
        mobileNumber: '',
        altMobileNumber: '',
        country: '',
        state: '',
        city: '',
        regAddress: '',
        commAddress: '',
        fk_serviceCity: '',
        companyName: '',
        archive: '',
        ProfileStatus: '',
        leasedVehicle: '',
        agreedSaasContract: false,
        digitalTravelAgencyOwner: false,
        leasedAgreementImg: '',
        walletAmount: '',
        walletStatus: '',

        //new fields:
        numberOfVehicle: ' ',
        numberOfDriver: ' ',
        activeDriver: ' ',
        inactiveDriver: ' ',
        activeVehicle: ' ',
        inactiveVehicle: ' ',
        Password: ' ',
        uniqueId: ' ',
        vehicleNumber: ' ',
        driverMobileNumber: ' ',
        driverName: ' ',
        driverPassword: ' ',
        referralCode: ' ',
        referredBy: ' ',
        distributorCode: ' ',
        ownerAddress: ' ',
    };

    const [formData, setFormData] = useState<FormValues>(initialFormValues);

    const [currentPage, setCurrentPage] = useState<string>('');

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
            label: 'Travel Agency',
            to: '/BusinessModule/FleetOwner/ViewFleetOwner',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/BusinessModule/FleetOwner/ViewFleetOwner' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Create Travel Agency',
            to: '/BusinessModule/FleetOwner/CreateFleetOwner',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/BusinessModule/FleetOwner/CreateFleetOwner' ? 'text-blue-600' : ''
            }`,
        },
    ];

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

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

    const handleSubmit = () => {
        window.location.reload();
    };

    const handleCancel = () => {
        window.location.reload();
    };
    const navigate = useNavigate();

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <FleetOwnerModule
                        details={formData}
                        onInputChange={handleInputChange}
                        showStatus={false}
                        // validation={ValidationError}
                    />
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

            <div className="panel mt-2" ref={secondPanelRef}>
                {/*  */}
                <form>
                    <FleetOwnerDocLayout details={formData} onInputChange={handleInputChange} />
                    <div className="flex justify-center mt-6">
                        <button type="submit" className="btn btn-primary !mt-6 mr-4" onClick={() => navigate('/BusinessModule/FleetOwner/ViewSpecificFleetOwner/1')}>
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

export default CreateFleetOwner;
