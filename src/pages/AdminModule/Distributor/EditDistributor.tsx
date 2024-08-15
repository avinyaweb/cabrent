import React, { useState, ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import ChannelPartnerDocModule from './ChannelPartnerDocModule';
import DistributorModule from './DistributorModule';
import { staticChannelPData } from '../ChannelPartner/ViewChannelPartner';

interface FormValues {
    bussinessName: string;
    Distributorcategory: string;
    fk_serviceCity: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    dob: string;
    gender: string;
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
    fk_roletype: string;
    parentDistributor: string;
}

interface Dis_DOCValues {
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

const EditDistributor: React.FC = () => {
    const secondPanelRef = useRef<HTMLDivElement | null>(null);

    // future code -->>
    // const dispatch = useDispatch();
    const navigate = useNavigate();

    const { DistributorId } = useParams();
    const initialFormValues: FormValues = {
        bussinessName: '',
        Distributorcategory: '',
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
        status: '',
        fk_roletype: '',
        parentDistributor: '',
    };

    const initialDOCValues: Dis_DOCValues = {
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

    const [DistributorDetails, setDistributorDetails] = useState<FormValues>(initialFormValues);
    const [DOC_Values, setDOC_Values] = useState<Dis_DOCValues>(initialDOCValues);
    useEffect(() => {
        const specificData: any = staticChannelPData.find((data) => data.id === DistributorId);
        if (specificData) {
            setDistributorDetails(specificData); // Set the entire form data
        }
    }, [DistributorId]);
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
        setDistributorDetails({ ...DistributorDetails, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (secondPanelRef.current) {
            secondPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        //     try {
        //         await updateDistributor(DistributorId, DistributorDetails);
        //         console.log('Channel Partner details updated successfully!');
        //     } catch (error: any) {
        //         console.error('Error updating channel partner details:', error.message);
        //     }
    };

    const handleCancel = () => {
        navigate('/AdminModule/Distributor/ViewDistributor');
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
                        to="/AdminModule/Distributor/ViewDistributor"
                        className={currentPage === 'adminModule/channelPartner/viewDistributor' ? 'active' : ''}
                        onClick={() => setCurrent('/viewDistributor')}
                    >
                        Distributor
                    </Link>
                </li>
                <li
                    className={`before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                        currentPath === `/AdminModule/Distributor/EditDistributor/${DistributorId}` ? 'text-blue-600' : ''
                    }`}
                >
                    Edit Distributor
                </li>
            </ol>

            <div className="panel mt-2">
                <form onSubmit={handleSubmit}>
                    <div className="mt-5">
                        <DistributorModule details={DistributorDetails} onInputChange={handleInputChange} showStatus={true} isEditPage={true} noPassEdit={true} />
                    </div>
                </form>
            </div>

            <div className="panel mt-2" ref={secondPanelRef}>
                <form>
                    <ChannelPartnerDocModule details={DOC_Values} onInputChange={handleInputChange} />

                    <div className="flex justify-center mt-6">
                        <button type="submit" className="btn btn-primary !mt-6 mr-4" onClick={() => navigate('/AdminModule/Distributor/ViewSpecificDistributor/1')}>
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

export default EditDistributor;
