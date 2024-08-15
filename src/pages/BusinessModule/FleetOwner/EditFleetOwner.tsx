import React, { useState, ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import FleetOwnerModule from './FleetOwnerModule';
import { staticFleetOwnerData } from './ViewFleetOwner';
import FleetOwnerDocLayout from './FleetOwnerDocLayout';
import ViewSpecificBankAccount from '@/pages/WalletModule/BankAccountDetails/ViewSpecificBankAccount';
import BankAccountModule from '@/pages/WalletModule/BankAccountDetails/BankAccountModule';
import CreateBankAccount from '@/pages/WalletModule/BankAccountDetails/CreateBankAccount';

interface FormValues {
    companyType: string;
    distributor: string;
    TravelAgencyType: string;
    TravelAgencyName: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    dob: string;
    gender: string;
    fatherName: string;
    mobileNumber: string;
    altMobileNumber: string;
    country: string;
    state: string;
    city: string;
    regAddress: string;
    archive: string;
    commAddress: string;
    fk_serviceCity: string;
    companyName: string;
    ProfileStatus: string;
    leasedVehicle: string;
    agreedSaasContract: boolean;
    digitalTravelAgencyOwner: boolean;
    leasedAgreementImg: string;
    walletAmount: string;
    walletStatus: string;

    //new fields:

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

const EditFleetOwner: React.FC = () => {
    const { fleetOwnerId } = useParams();
    const navigate = useNavigate();
    const secondPanelRef = useRef<HTMLDivElement>(null);

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
        ProfileStatus: '', // Adding the missing property
        leasedVehicle: '',
        agreedSaasContract: false,
        digitalTravelAgencyOwner: false,
        leasedAgreementImg: '',
        archive: '',
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

    useEffect(() => {
        // Find the specific data based on the serviceProviderId
        const specificData = staticFleetOwnerData.find((data) => data.id === fleetOwnerId);

        // If specificData is found, update the formData state with its values
        if (specificData) {
            setFormData(specificData as unknown as FormValues); // Set the entire form data
        }
    }, [fleetOwnerId]);

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
            label: 'Edit Travel Agency',
            to: '/businessModule/fleetOwner/editFleetOwner',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `/BusinessModule/FleetOwner/EditFleetOwner/${fleetOwnerId}` ? 'text-blue-600' : ''
            }`,
        },
    ];

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (secondPanelRef.current) {
            secondPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleCancel = () => {
        window.location.reload();
    };

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <FleetOwnerModule details={formData} onInputChange={handleInputChange} noPassEdit={true} showStatus={true} isEditPage={true} />
                    <div className="pt-6">
                        <h1 className="text-3xl font-bold">Bank Details</h1>
                        <CreateBankAccount />
                    </div>
                    <div className="flex justify-center mt-10">
                        <button type="submit" className="btn btn-primary !mt-6 mr-4">
                            Update
                        </button>
                        <button type="button" className="btn btn-danger !mt-6" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>

            <div className="panel mt-6" ref={secondPanelRef}>
                <form>
                    <FleetOwnerDocLayout details={formData} onInputChange={handleInputChange} viewSpecific={false} />

                    <div className="flex justify-center mt-10">
                        <button type="submit" className="btn btn-primary !mt-6 mr-4" onClick={() => navigate('/BusinessModule/FleetOwner/ViewSpecificFleetOwner/1')}>
                            Update
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

export default EditFleetOwner;
