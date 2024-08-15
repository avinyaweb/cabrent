import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getPriorityById, updatePriority } from '@/services/UtilityServices/PriorityService';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import PriorityModule from './PriorityModule';

interface FormValues {
    PriorityName: string;
    archive: string;
}

const EditPriority: React.FC = () => {
    const navigate = useNavigate();

    const { PriorityId }: { PriorityId?: any } = useParams();

    const initialFormValues: FormValues = {
        PriorityName: '',
        archive: '',
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
        setPriorityDetails({ ...PriorityDetails, [name]: value }); // Uncomment this line to update state
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await updatePriority(PriorityId, PriorityDetails);
            console.log('Channel Partner details updated successfully!');
            navigate('/UtilityModule/Status/ViewStatus');
        } catch (error: any) {
            console.error('Error updating channel partner details:', error.message);
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
            label: 'Edit Priority',
            to: '/UtilityModule/Priority/EditPriority',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `/UtilityModule/Priority/EditPriority/${PriorityId}` ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <PriorityModule details={PriorityDetails} onInputChange={handleInputChange} showStatus={true} />
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

export default EditPriority;
