import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getStatusById, updateStatus } from '@/services/UtilityServices/StatusService';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import StatusModule from './StatusModule';

interface FormValues {
    archiveName: string;
    archive: string;
}

const EditStatus: React.FC = () => {
    //  future code -->>
    // const dispatch = useDispatch();
    const navigate = useNavigate();

    const { statusId }: { statusId?: any } = useParams();

    const initialFormValues: FormValues = {
        archiveName: '',
        archive: '',
    };

    const [StatusDetails, setStatusDetails] = useState<FormValues>(initialFormValues);

    useEffect(() => {
        const fetchChannelPartnerDetails = async () => {
            try {
                const response = await getStatusById(statusId);
                console.log('Fetched Data', response);
                setStatusDetails(response.data.Archive);
            } catch (error: any) {
                console.error('Error fetching channel partner details:', error.message);
            }
        };

        fetchChannelPartnerDetails();
    }, [statusId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setStatusDetails({ ...StatusDetails, [name]: value }); // Uncomment this line to update state
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await updateStatus(statusId, StatusDetails);
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
            label: 'Status',
            to: '/UtilityModule/Status/ViewStatus',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/UtilityModule/Status/ViewStatus' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Edit Status',
            to: '/utilityModule/status/ditStatus',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `/UtilityModule/Status/EditStatus/${statusId}` ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <StatusModule details={StatusDetails} onInputChange={handleInputChange} showStatus={true} />
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

export default EditStatus;
