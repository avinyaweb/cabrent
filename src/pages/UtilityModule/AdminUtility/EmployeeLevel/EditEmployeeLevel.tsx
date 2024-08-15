import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
//import { updateChannelPartner, getChannelPartnerById } from '@/services/ChannelPartnerService';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import EmployeeLevelModule from './EmployeeLevelModule';

interface FormValues {
    id: string;
    employeeLevelName: string;
    archive: string;
}

const EditEmployeeLevel: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { employeeLevelId } = useParams();

    const initialFormValues: FormValues = {
        id: '',
        employeeLevelName: '',
        archive: '',
    };

    const [employeeLevelDetails, setEmployeeLevelDetails] = useState<FormValues>(initialFormValues);

    // useEffect(() => {
    //   const fetchChannelPartnerDetails = async () => {
    //     try {
    //       const response = await getChannelPartnerById(channelPartnerId);
    //       console.log('Fetched Data', response);
    //       setChannelPartnerDetails(response.data.channelPartner);
    //     } catch (error: any) {
    //       console.error('Error fetching channel partner details:', error.message);
    //     }
    //   };

    //   fetchChannelPartnerDetails();
    // }, [channelPartnerId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        //setChannelPartnerDetails({ ...channelPartnerDetails, [name]: value });
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
            label: 'Employee Level',
            to: '/UtilityModule/EmployeeLevel/ViewEmployeeLevel',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/UtilityModule/EmployeeLevel/ViewEmployeeLevel' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Edit Employee Level',
            to: '/UtilityModule/EmployeeLevel/EditEmployeeLevel',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `/UtilityModule/EmployeeLevel/EditEmployeeLevel/${employeeLevelId}` ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <EmployeeLevelModule details={employeeLevelDetails} onInputChange={handleInputChange} showStatus={true} />
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

export default EditEmployeeLevel;
