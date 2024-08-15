import React, { useState, ChangeEvent, FormEvent, useEffect, Fragment, useRef } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import ServiceProviderModule from './ServiceProviderModule';
import { createS_ProviderData } from '@/services/BusinessProfileServices/ServiceProviderService';
import { Tab } from '@headlessui/react';
import ServiceProviderDocLayout from './ServiceProviderDocLayout';
import { RiSteeringFill } from 'react-icons/ri';
import { IoDocumentTextOutline } from 'react-icons/io5';

interface FormValues {
    serviceProviderType: string;
    driverKey: string;
    channelPartnerType: string;
    TravelAgency: string;
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
    dlNumber: string;
    dlValidity: string;
    policeVerNumber: string;
    batchNumber: string;
    batchValidity: string;
    password: string;
    permanentAddress: string;
    presentAddress: string;
    registerAddress: string;
    fk_serviceCity: string;
    badgeNumber: string;
    badgeValidity: string;
    isAvailable: boolean;
    driverStatus: string;
    driverLocation: boolean;
    emergencyContact: string;
    driverApprovalDate: string;
    panNumber: string;
    rtoDisplayCard: string;
    stateAndRto: string;
    verificationHistory: string;
    archive: string;

    profileImage: string;
    drivinglicense: string;
    aadharCard: string;
    aadharImages: string;
    panImages: string;
    panCard: string;
}

const CreateServiceProvider: React.FC = () => {
    const secondPanelRef = useRef<HTMLDivElement>(null);

    const initialFormValues: FormValues = {
        serviceProviderType: '',
        driverKey: '',
        channelPartnerType: '',
        TravelAgency: '',
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
        dlNumber: '',
        dlValidity: '',
        policeVerNumber: '',
        batchNumber: '',
        batchValidity: '',
        password: '',
        permanentAddress: '',
        presentAddress: '',
        registerAddress: '',
        fk_serviceCity: '',
        badgeNumber: '',
        badgeValidity: '',
        isAvailable: false,
        driverStatus: '',
        driverLocation: false,
        emergencyContact: '',
        driverApprovalDate: '',
        panNumber: '',
        rtoDisplayCard: '',
        stateAndRto: '',
        verificationHistory: '',
        archive: '',

        profileImage: '',
        drivinglicense: '',
        aadharCard: '',
        aadharImages: '',
        panImages: '',
        panCard: '',
    };

    // All states.
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
            label: 'Travel agency',
            to: '/BusinessModule/ServiceProvider/ViewServiceProvider',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/BusinessModule/ServiceProvider/ViewServiceProvider' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Create Driver',
            to: '/BusinessModule/ServiceProvider/CreateServiceProvider',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/BusinessModule/ServiceProvider/CreateServiceProvider' ? 'text-blue-600' : ''
            }`,
        },
    ];

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // create new service provoder data.
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

    const navigate = useNavigate();

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />
            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <div className="mt-5">
                        <ServiceProviderModule details={formData} onInputChange={handleInputChange} showStatus={false} viewSpecific={false} noPassEdit={false} isEditPage={false} />
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
                        <ServiceProviderDocLayout details={formData} onInputChange={handleInputChange} viewSpecific={false} />

                        <div className="flex justify-center mt-6">
                            <button type="submit" className="btn btn-primary !mt-6 mr-4" onClick={() => navigate('/BusinessModule/ServiceProvider/ViewSpecificServiceProvider/1')}>
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

export default CreateServiceProvider;
