import React, { useState, ChangeEvent, FormEvent, useEffect, Fragment, useRef } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import VehicleProfileModule from './VehicleProfileModule';
import VehicleDocLayout from './VehicleDocLayout';

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
    country: string;
    state: string;
    city: string;
    fk_serviceCity: string;
    serviceType: string;
    vehicleRegistrationDate: Date | string;
    vehicleAge: string;
    loanBanker: string;
    loanAccNumber: string;
    emiAmt: string;
    emiDate: string;
    currLocation: string;
    vehManufacturer: string;
    archive: string;
}

const CreateVehicleProfile: React.FC = () => {
    const secondPanelRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
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
        serviceType: '',
        vehicleRegistrationDate: '',
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

    const navItems = [
        {
            label: 'Home',
            to: '/',
            className: '',
        },
        {
            label: 'Travel Agency ',
            to: '/BusinessModule/VehicleProfile/ViewVehicleProfile',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/BusinessModule/VehicleProfile/ViewVehicleProfile' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Create Vehicle ',
            to: '/BusinessModule/VehicleProfile/CreateVehicleProfile',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/BusinessModule/VehicleProfile/CreateVehicleProfile' ? 'text-blue-600' : ''
            }`,
        },
    ];

    const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (secondPanelRef.current) {
            secondPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        console.error('Error creating admin tickets');
    };

    const handleCancel = () => {
        window.location.reload();
    };

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />
            <div className="panel mt-6">
                <div className="mt-5">
                    <form action="" onSubmit={handleSubmit}>
                        <VehicleProfileModule details={formData} onInputChange={handleInputChange} showStatus={false} />

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
            </div>

            <div className="panel mt-2" ref={secondPanelRef}>
                <div className="mt-5">
                    <form>
                        <VehicleDocLayout
                            details={formData}
                            onInputChange={handleInputChange}
                            showStatus={true}
                            viewSpecific={false} // Make sure to include this prop
                        />

                        <div className="flex justify-center mt-6">
                            <button type="submit" className="btn btn-primary !mt-6 mr-4" onClick={() => navigate('/BusinessModule/VehicleProfile/ViewSpecificVehicleProfile/1')}>
                                Submit
                            </button>
                            <button type="button" className="btn btn-danger !mt-6" onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateVehicleProfile;
