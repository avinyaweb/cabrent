import React, { useState, ChangeEvent, FormEvent, useEffect, Fragment, useRef } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateChannelPartner, getChannelPartnerById } from '@/services/ChannelPartnerService';
import ChannelPartnerModule from './ChannelPartnerModule';
import ChannelPartnerDocModule from './ChannelPartnerDocModule';
import { Tab } from '@headlessui/react';
import { staticChannelPData } from './ViewChannelPartner';

interface FormValues {
    bussinessName: string;
    firstName: string;
    middleName: string;
    lastName: string;
    dob: string;
    gender: string;
    email: string;
    fk_roletype: string;
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

const EditChannelPartner: React.FC = () => {
    const secondPanelRef = useRef<HTMLDivElement | null>(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { channelPartnerId } = useParams();
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

    const [channelPartnerDetails, setChannelPartnerDetails] = useState<FormValues>(initialFormValues);
    const [cp_DocData, setcp_DocData] = useState<DocValues>(initialDocValues);
    useEffect(() => {
        const specificData: any = staticChannelPData.find((data) => data.id === channelPartnerId);
        if (specificData) {
            setChannelPartnerDetails(specificData); // Set the entire form data
        }
    }, [channelPartnerId]);
    // useEffect(() => {
    //     const fetchChannelPartnerDetails = async () => {
    //         try {
    //             const response = await getChannelPartnerById(channelPartnerId);
    //             console.log('Fetched Data', response);
    //             setChannelPartnerDetails(response.data.channelPartner);
    //         } catch (error: any) {
    //             console.error('Error fetching channel partner details:', error.message);
    //         }
    //     };

    //     fetchChannelPartnerDetails();
    // }, [channelPartnerId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setChannelPartnerDetails({ ...channelPartnerDetails, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (secondPanelRef.current) {
            secondPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        try {
            // await updateChannelPartner(channelPartnerId, channelPartnerDetails);
            // console.log('Channel Partner details updated successfully!');
        } catch (error: any) {
            console.error('Error updating channel partner details:', error.message);
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
                        className={currentPage === 'AdminModule/ChannelPartner/ViewchannelPartner' ? 'active' : ''}
                        onClick={() => setCurrent('/viewchannelPartner')}
                    >
                        Channel Partner
                    </Link>
                </li>
                <li
                    className={`before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                        currentPath === `/AdminModule/ChannelPartner/EditChannelPartner/${channelPartnerId}` ? 'text-blue-600' : ''
                    }`}
                >
                    Edit Channel Partner
                </li>
            </ol>

            <div className="panel mt-2">
                <form onSubmit={handleSubmit}>
                    <div className="mt-5">
                        <ChannelPartnerModule details={channelPartnerDetails} onInputChange={handleInputChange} showStatus={true} isEditPage={true} noPassEdit={true} />
                    </div>
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
                <form>
                    <ChannelPartnerDocModule details={cp_DocData} onInputChange={handleInputChange} />

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

export default EditChannelPartner;
