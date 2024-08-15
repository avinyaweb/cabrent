import React, { useState, ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import DistributorSettingsModule from './DistributorSettingsModule';
import { staticDistributorSettingsData } from './ViewDistributorSettings';

interface FormValues {
    id: string;
    bookingType: string;
    serviceType: string;
    serviceCity: string;
    subscriptionType: string;
    taxPercentage: string;
    createdAt: string;
    updatedAt: string;
}

const EditDistributorSettings: React.FC = () => {
    const secondPanelRef = useRef<HTMLDivElement | null>(null);

    // future code -->>
    // const dispatch = useDispatch();
    const navigate = useNavigate();

    const { DistributorId } = useParams();
    const initialFormValues: FormValues = {
        id: '',
        bookingType: '',
        serviceType: '',
        serviceCity: '',
        subscriptionType: '',
        taxPercentage: '',
        createdAt: '',
        updatedAt: '',
    };

    const [DistributorSettingsDetails, setDistributorSettingsDetails] = useState<FormValues>(initialFormValues);
    // const [DOC_Values, setDOC_Values] = useState<Dis_DOCValues>(initialDOCValues);
    useEffect(() => {
        const specificData: any = staticDistributorSettingsData.find((data) => data.id === DistributorId);
        if (specificData) {
            setDistributorSettingsDetails(specificData); // Set the entire form data
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
        setDistributorSettingsDetails({ ...DistributorSettingsDetails, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (secondPanelRef.current) {
            secondPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        //     try {
        //         await updateDistributor(DistributorId, DistributorSettingsDetails);
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
                        to="/AdminModule/Distributor/DistributorSettings/ViewDistributorSettings"
                        className={currentPage === '/AdminModule/Distributor/DistributorSettings/ViewDistributorSettings' ? 'active' : ''}
                        onClick={() => setCurrent('/viewDistributor')}
                    >
                        Distributor Settings
                    </Link>
                </li>
                <li
                    className={`before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                        currentPath === `/AdminModule/Distributor/DistributorSettings/EditDistributorSettings/1` ? 'text-blue-600' : ''
                    }`}
                >
                    Edit Distributor
                </li>
            </ol>

            <div className="panel mt-2">
                <form onSubmit={handleSubmit}>
                    <div className="mt-5">
                        <DistributorSettingsModule details={DistributorSettingsDetails} onInputChange={handleInputChange} showStatus={true} isEditPage={true} noPassEdit={true} />
                    </div>
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

export default EditDistributorSettings;
