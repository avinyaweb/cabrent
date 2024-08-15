import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getPriorityById } from '@/services/UtilityServices/PriorityService';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import PriorityModule from './PriorityModule';

interface FormValues {
    archiveName: string;
    archive: string;
    PriorityName: string;
    approvedAt: string;
    approvedBy: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
}

const ViewSpecificPriority: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { PriorityId }: { PriorityId?: any } = useParams();

    const initialFormValues: FormValues = {
        archiveName: '',
        archive: '',
        PriorityName: '',
        approvedAt: '',
        approvedBy: '',
        createdAt: '',
        createdBy: '',
        updatedAt: '',
        updatedBy: '',
    };

    const [PriorityDetails, setPriorityDetails] = useState<FormValues>(initialFormValues);

    useEffect(() => {
        const fetchChannelPartnerDetails = async () => {
            try {
                const response = await getPriorityById(PriorityId);
                console.log('Fetched Data', response);
                setPriorityDetails(response.data.Archive);
            } catch (error: any) {
                console.error('Error fetching channel partner details:', error.message);
            }
        };

        fetchChannelPartnerDetails();
    }, [PriorityId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        //setChannelPartnerDetails({ ...channelPartnerDetails, [name]: value });
    };

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to set the current page based on the path
    // const setCurrent = (path: string) => {
    //     setCurrentPage(path);
    // };

    const navItems = [
        {
            label: 'Home',
            to: '/',
            className: '',
        },
        {
            label: 'Priority',
            to: '/UtilityModule/Priority/ViewPriority',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/UtilityModule/Priority/ViewPriority' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'View Priority',
            to: '/UtilityModule/Priority/ViewSpecificPriority',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `/UtilityModule/Priority/ViewSpecificPriority/${PriorityId}` ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form>
                    <PriorityModule details={PriorityDetails} onInputChange={handleInputChange} showStatus={true} viewSpecific={true} />

                    <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                        <div className="lg:w-1/3">
                            <label htmlFor="createdBy" className="block mb-1">
                                Created By
                            </label>
                            <input name="createdBy" type="text" id="createdBy" placeholder="Enter Created By" className="form-input w-full pointer-events-none" value={PriorityDetails?.createdBy} />
                        </div>

                        <div className="lg:w-1/3">
                            <label htmlFor="updatedBy" className="block mb-1">
                                Updated By
                            </label>
                            <input name="updatedBy" type="text" id="updatedBy" placeholder="Enter Updated By" className="form-input w-full pointer-events-none" value={PriorityDetails?.updatedBy} />
                        </div>
                        <div className="lg:w-1/3"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6"></div>
                </form>
            </div>
        </>
    );
};

export default ViewSpecificPriority;
