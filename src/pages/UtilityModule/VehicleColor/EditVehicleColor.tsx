import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import { updatevehiclecolor, getTicketTypeById } from '@/services/UtilityServices/TicketTypeService';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import VehicleColorModule from './VehicleColorModule';
// import TicketTypeModule from './TicketTypeModule';

interface FormValues {
    vehicleColor: string;
    archive: string;
}

const EditvehiclecolorModule: React.FC = () => {
    const navigate = useNavigate();

    const { vehiclecolorId }: { vehiclecolorId?: any } = useParams();

    const initialFormValues: FormValues = {
        vehicleColor: '',
        archive: '',
    };

    const [vehiclecolorDetails, setvehiclecolorDetails] = useState<FormValues>(initialFormValues);

    // useEffect(() => {
    //     const fetchChannelPartnerDetails = async () => {
    //         try {
    //             const response = await getvehiclecolorById(vehiclecolorId);
    //             console.log('Fetched Data', response);
    //             setvehiclecolorDetails(response.data.vehiclecolor);
    //         } catch (error: any) {
    //             console.error('Error fetching channel partner details:', error.message);
    //         }
    //     };

    //     fetchChannelPartnerDetails();
    // }, [vehiclecolorId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setvehiclecolorDetails({ ...vehiclecolorDetails, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // try {
        //     await updatevehiclecolor(vehiclecolorId, vehiclecolorDetails);
        //     console.log('Channel Partner details updated successfully!');
        //     navigate('/UtilityModule/vehiclecolor/Viewvehiclecolor');
        // } catch (error: any) {
        //     console.error('Error updating channel partner details:', error.message);
        // }
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
            label: 'Vehicle Color',
            to: '/UtilityModule/VehicleColor/ViewVehicleColor',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/UtilityModule/VehicleColor/ViewVehicleColor' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Edit Vehicle Color',
            to: '/UtilityModule/VehicleColor/EditVehicleColor',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `/UtilityModule/VehicleColor/EditVehicleColor/1` ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <VehicleColorModule details={vehiclecolorDetails} onInputChange={handleInputChange} showStatus={true} />
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

export default EditvehiclecolorModule;
