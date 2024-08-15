import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateVehicleUtility, getVehicleUtilityById } from '@/services/UtilityServices/VehicleUtilityServices';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import VehicleUtilityModule from './VehicleUtilityModule';

interface FormValues {
    id: string;
    vehCategoryName: string;
    vehBrandName: string;
    vehType: string;
    vehModel: string;
    archive: string;
    vehicleCategory: string;
    VehicleBrand: string;
    vehicleType: string;
    vehicleModel: string;
}

const EditVehicleUtility: React.FC = () => {
    // future code -->>
    // const dispatch = useDispatch();
    const navigate = useNavigate();

    const { vehicleUtilityId }: { vehicleUtilityId?: any } = useParams();

    const initialFormValues: FormValues = {
        id: '',
        vehCategoryName: '',
        vehBrandName: '',
        vehType: '',
        vehModel: '',
        archive: '',
        vehicleCategory: '',
        VehicleBrand: '',
        vehicleType: '',
        vehicleModel: '',
    };

    const [vehicleUtilityDetails, setVehicleUtilityDetails] = useState<FormValues>(initialFormValues);

    useEffect(() => {
        const fetchChannelPartnerDetails = async () => {
            try {
                const response = await getVehicleUtilityById(vehicleUtilityId);
                console.log('Fetched Data', response);
                setVehicleUtilityDetails(response.data.VehicleUtility);
            } catch (error: any) {
                console.error('Error fetching channel partner details:', error.message);
            }
        };

        fetchChannelPartnerDetails();
    }, [vehicleUtilityId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setVehicleUtilityDetails({ ...vehicleUtilityDetails, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await updateVehicleUtility(vehicleUtilityId, vehicleUtilityDetails);
            console.log('Channel Partner details updated successfully!');
            navigate('/UtilityModule/VehicleUtility/ViewVehicleUtility');
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
            label: 'Vehicle Utility',
            to: '/UtilityModule/VehicleUtility/ViewVehicleUtility',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/UtilityModule/VehicleUtility/ViewVehicleUtility' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Edit Vehicle Utility',
            to: '/UtilityModule/VehicleUtility/EditVehicleUtility',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `/UtilityModule/VehicleUtility/EditVehicleUtility/${vehicleUtilityId}` ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <VehicleUtilityModule details={vehicleUtilityDetails} onInputChange={handleInputChange} showStatus={true} />
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

export default EditVehicleUtility;
