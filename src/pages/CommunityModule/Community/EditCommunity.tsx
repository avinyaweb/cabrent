import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getPriorityById, updatePriority } from '@/services/UtilityServices/PriorityService';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import CommunityModule from './CommunityModule';

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

const EditCommunity: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { CommunityId } = useParams<{ CommunityId: string }>();

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

    const [communityDetails, setCommunityDetails] = useState<FormValues>(initialFormValues);

    // future things useEffect(() => {
    //   const fetchChannelPartnerDetails = async () => {
    //     try {
    //       const response = await getPriorityById(CommunityId);
    //       console.log('Fetched Data', response);
    //       setCommunityDetails(response.data.Archive);

    //     } catch (error: any) {
    //       console.error('Error fetching channel partner details:', error.message);
    //     }
    //   };

    //   fetchChannelPartnerDetails();
    // }, [CommunityId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCommunityDetails({ ...communityDetails, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (CommunityId) {
            try {
                await updatePriority(CommunityId, communityDetails);
                console.log('Channel Partner details updated successfully!');
                navigate('/UtilityModule/Status/ViewStatus');
            } catch (error: any) {
                console.error('Error updating channel partner details:', error.message);
            }
        }
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
                currentPath === '/UtilityModule/Priority/ViewPriority' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Edit Community',
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
                    <CommunityModule details={communityDetails} onInputChange={handleInputChange} showStatus={true} />
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
        </>
    );
};

export default EditCommunity;
