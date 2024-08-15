import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getPriorityById } from '@/services/UtilityServices/PriorityService';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import CommunityModule from './CommunityModule';
import { staticCommunity } from './ViewListCommunity';

interface FormValues {
    id: string;
    communityName: string;
    communityImg: string;
    serviceCity: string;
    link: string;
    status: string;
    approvedAt: string;
    approvedBy: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
}

const ViewSpecificCommunity: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { CommunityId } = useParams();

    const initialFormValues: FormValues = {
        id: '',
        communityName: '',
        communityImg: '',
        serviceCity: '',
        link: '',
        status: '',
        approvedAt: '',
        approvedBy: '',
        createdAt: '',
        createdBy: '',
        updatedAt: '',
        updatedBy: '',
    };

    const [CommunityDetails, setCommunityDetails] = useState<FormValues>(initialFormValues);

    useEffect(() => {
        const specificData = staticCommunity.find((data) => data.id === CommunityId);
        if (specificData) {
            setCommunityDetails(specificData as unknown as FormValues); // Set the entire form data
        }
    }, [CommunityId]);

    // useEffect(() => {
    //     const fetchChannelPartnerDetails = async () => {
    //         try {
    //             const response = await getPriorityById(CommunityId);
    //             console.log('Fetched Data', response);
    //             setCommunityDetails(response.data.Archive);
    //         } catch (error: any) {
    //             console.error('Error fetching channel partner details:', error.message);
    //         }
    //     };

    //     fetchChannelPartnerDetails();
    // }, [CommunityId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        // setCommunityDetails({ ...communityDetails, [name]: value });
    };

    // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    //   e.preventDefault();

    //   try {
    //     await updateChannelPartner(channelPartnerId, channelPartnerDetails);
    //     console.log('Channel Partner details updated successfully!');
    //   } catch (error: any) {
    //     console.error('Error updating channel partner details:', error.message);
    //   }
    // };

    const handleSubmit = () => {
        window.location.reload();
    };

    const handleCancel = () => {
        window.location.reload();
    };

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

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
            label: 'Community',
            to: '/CommunityModule/Community/ViewCommunity',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/CommunityModule/Community/ViewCommunity' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'View Community ',
            to: '',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `` ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <CommunityModule details={CommunityDetails} onInputChange={handleInputChange} showStatus={true} viewSpecific={true} />

                    <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                        <div className="lg:w-1/3">
                            <label htmlFor="createdBy" className="block mb-1">
                                Created By
                            </label>
                            <input name="createdBy" type="text" id="createdBy" placeholder="Enter Created By" className="form-input w-full pointer-events-none" value={'manu'} />
                        </div>

                        <div className="lg:w-1/3">
                            <label htmlFor="updatedBy" className="block mb-1">
                                Updated By
                            </label>
                            <input name="updatedBy" type="text" id="updatedBy" placeholder="Enter Updated By" className="form-input w-full pointer-events-none" value={'Rahul'} />
                        </div>
                        <div className="lg:w-1/3"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6"></div>
                </form>
            </div>
        </>
    );
};

export default ViewSpecificCommunity;
