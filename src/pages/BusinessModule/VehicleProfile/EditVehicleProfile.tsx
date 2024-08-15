import React, { useState, ChangeEvent, FormEvent, useEffect, Fragment, useRef } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import VehicleProfileModule from './VehicleProfileModule';
import { staticVehicleProfileData } from './ViewVehicleProfile';
import VehicleDocLayout from './VehicleDocLayout';
import { Tab } from '@headlessui/react';
import { FaCarSide } from 'react-icons/fa6';
import { IoDocumentTextOutline } from 'react-icons/io5';

interface FormValues {
    id: string;
    serviceProviderType: string;
    channelPartnerType: string;
    fleetManagementType: string;
    vehRegNumber: string;
    vehRTONumber: string;
    vehChasisNumber: string;
    vehCategory: string;
    seatCapacity: string;
    bootSpace: string;
    loadCapacity: string;
    bodyDimension: string;
    vehBrandName: string;
    vehType: string;
    vehBrandModel: string;
    vehColor: string;
    vehFuelType: string;
    fk_serviceCity: string;
    vehicleRegistrationDate: Date | string;
    serviceType: string;
    vehicleAge: string;
    loanBanker: string;
    loanAccNumber: string;
    emiAmt: string;
    emiDate: string;
    currLocation: string;
    archive: string;
    vehManufacturer: string;
    country: string;
    state: string;
    city: string;
}

const EditVehicleProfile: React.FC = () => {
    const secondPanelRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { vehicleProfileId } = useParams();
    const initialFormValues: FormValues = {
        id: '',
        serviceProviderType: '',
        channelPartnerType: '',
        fleetManagementType: '',
        vehRegNumber: '',
        vehRTONumber: '',
        vehChasisNumber: '',
        vehCategory: '',
        seatCapacity: '',
        bootSpace: '',
        loadCapacity: '',
        bodyDimension: '',
        vehBrandName: '',
        vehType: '',
        vehBrandModel: '',
        vehColor: '',
        vehFuelType: '',
        fk_serviceCity: '',
        vehicleRegistrationDate: '',
        serviceType: '',
        vehicleAge: '',
        loanBanker: '',
        loanAccNumber: '',
        emiAmt: '',
        emiDate: '',
        currLocation: '',
        archive: '',
        vehManufacturer: '',
        country: '',
        state: '',
        city: '',
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
        const specificData = staticVehicleProfileData.find((data) => data.id === vehicleProfileId);

        // If specificData is found, update the formData state with its values
        if (specificData) {
            setFormData(specificData as unknown as FormValues); // Set the entire form data
        }
    }, [vehicleProfileId]);

    const navItems = [
        {
            label: 'Home',
            to: '/',
            className: '',
        },
        {
            label: 'Vehicle ',
            to: '/BusinessModule/VehicleProfile/ViewVehicleProfile',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/BusinessModule/VehicleProfile/ViewVehicleProfile' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Edit Vehicle ',
            to: '/businessModule/vehicleProfile/editVehicleProfile',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `/BusinessModule/VehicleProfile/EditVehicleProfile/${vehicleProfileId}` ? 'text-blue-600' : ''
            }`,
        },
    ];

    const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Scroll to the next panel after form submission
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
                    <div className="mt-5">
                        <VehicleProfileModule details={formData} onInputChange={handleInputChange} showStatus={true} isEditPage={true} />
                        <div className="flex justify-center mt-6">
                            <button type="submit" className="btn btn-primary !mt-6 mr-4">
                                Submit
                            </button>
                            <button type="button" className="btn btn-danger !mt-6" onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <div className="panel mt-2" ref={secondPanelRef}>
                <form>
                    <div className="mt-5">
                        <VehicleDocLayout details={formData} viewSpecific={false} onInputChange={handleInputChange} />
                        <div className="flex justify-center mt-6">
                            <button type="submit" className="btn btn-primary !mt-6 mr-4" onClick={() => navigate('/BusinessModule/VehicleProfile/ViewSpecificVehicleProfile/1')}>
                                Submit
                            </button>
                            <button type="button" className="btn btn-danger !mt-6" onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditVehicleProfile;
