import React, { useState, ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ChannelPartnerModule from './ChannelPartnerModule';
import ChannelPartnerDocModule from './ChannelPartnerDocModule';
import { createChannelPartnerData } from '@/services/ChannelPartnerService';
import toast from 'react-hot-toast';

interface FormValues {
    firstName: string;
    middleName: string;
    lastName: string;
    dob: string;
    gender: string;
    email: string;
    fk_roletype: string;
    bussinessName: string;
    channelPartnerType: string;
    fk_serviceCity: string;
    mobile: string;
    altMobile: string;
    password: string;
    country: string;
    state: string;
    city: string;
    subscriptionCommisionAmountType: string;
    subscriptionCommisionAmountValue: string;
    tripsCommisionAmountType: string;
    tripsCommisionAmountValue: string;
    registrationOfficeAddress: string;
    communicationOfficeAddress: string;
    remarks: string;
    status: string;
    profileImage: string;
    parentChannelPartner: string;
}

interface DocValues {
    profileImage: string;
    aadharCard: string;
    aadharImages: string;
    panImages: string;
    panCard: string;
    companyRegCertiImage: string;
    companyRegCertificate: string;
    gstImage: string;
    gst: string;
}

const CreateChannelPartner: React.FC = () => {
    const secondPanelRef = useRef<HTMLDivElement | null>(null);
    const initialFormValues: FormValues = {
        bussinessName: '',
        channelPartnerType: '',
        fk_serviceCity: '',
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        dob: '',
        gender: '',
        mobile: '',
        altMobile: '',
        password: '',
        country: '',
        state: '',
        city: '',
        subscriptionCommisionAmountType: '',
        subscriptionCommisionAmountValue: '',
        tripsCommisionAmountType: '',
        tripsCommisionAmountValue: '',
        registrationOfficeAddress: '',
        communicationOfficeAddress: '',
        remarks: '',
        status: 'PENDING',
        profileImage: '',
        fk_roletype: '',
        parentChannelPartner: '',
    };

    const initialDocValues: DocValues = {
        profileImage: '',
        aadharCard: '',
        aadharImages: '',
        panImages: '',
        panCard: '',
        companyRegCertiImage: '',
        companyRegCertificate: '',
        gstImage: '',
        gst: '',
    };

    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormValues>(initialFormValues);
    const [cp_DocData, setcp_DocData] = useState<DocValues>(initialDocValues);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (secondPanelRef.current) {
            secondPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        try {
            // const response = await createChannelPartnerData(formData);
            // if (response.message) {
            //     toast.success('Admin Tickets created successfully!');
            //     setTimeout(() => {
            //         navigate('/AdminModule/ChannelPartner/ViewChannelPartner');
            //     }, 2000);
            // }
            // setFormData(initialFormValues);
        } catch (error: any) {
            console.error('Error creating admin tickets:', error.message);
        }
    };

    const handleCancel = () => {
        navigate('/AdminModule/ChannelPartner/ViewChannelPartner');
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
                        currentPath === '/AdminModule/ChannelPartner/ViewChannelPartner' ? 'text-blue-600' : ''
                    }`}
                >
                    <Link
                        to="/AdminModule/ChannelPartner/ViewChannelPartner"
                        className={currentPage === '/AdminModule/ChannelPartner/ViewChannelPartner' ? 'active' : ''}
                        onClick={() => setCurrent('/viewchannelPartner')}
                    >
                        Channel Partner
                    </Link>
                </li>
                <li
                    className={`before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                        currentPath === '/AdminModule/ChannelPartner/CreateChannelPartner' ? 'text-blue-600' : ''
                    }`}
                >
                    Create Channel Partner
                </li>
            </ol>

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <ChannelPartnerModule details={formData} onInputChange={handleInputChange} />
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
                    <ChannelPartnerDocModule details={cp_DocData} onInputChange={handleInputChange} viewSpecific={false} />

                    <div className="flex justify-center mt-6">
                        <button type="submit" className="btn btn-primary !mt-6 mr-4" onClick={() => navigate('/AdminModule/ChannelPartner/ViewSpecificChannelPartner/1')}>
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

export default CreateChannelPartner;
