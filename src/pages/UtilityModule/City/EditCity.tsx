import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
//import { updateChannelPartner, getChannelPartnerById } from '@/services/ChannelPartnerService';
import CityModule from './CityModule';
import { getCityById, updateCity } from '@/services/UtilityServices/CityService';
import toast from 'react-hot-toast';
interface FormValues {
    fk_stateOrProvince: string;
    cityName: string;
    archive: string;
    remark: string;
}

const EditCity: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const { cityId } = useParams();
    const { cityId } = useParams<{ cityId?: string }>();

    const initialFormValues: FormValues = {
        fk_stateOrProvince: '',
        cityName: '',
        archive: '',
        remark: '',
    };

    const [cityDetails, setCityDetails] = useState<FormValues>(initialFormValues);

    useEffect(() => {
        // const fetchChannelPartnerDetails = async () => {
        //     try {
        //         const response = await getCityById(cityId);
        //         setCityDetails(response.data.City);
        //     } catch (error: any) {
        //         console.error('Error fetching channel partner details:', error.message);
        //     }
        // };

        const fetchChannelPartnerDetails = async () => {
            // Ensure `cityId` is defined before making the call
            if (cityId) {
                try {
                    const response = await getCityById(cityId);
                    setCityDetails(response.data.City);
                } catch (error: any) {
                    console.error('Error fetching city details:', error.message);
                }
            } else {
                console.error('No cityId provided');
            }
        };

        fetchChannelPartnerDetails();
    }, [cityId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCityDetails({ ...cityDetails, [name]: value });
    };

    // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();

    //     try {
    //         const response = await updateCity(cityId, cityDetails);
    //         if (response?.message) {
    //             toast.success(response?.message);
    //             setTimeout(() => {
    //                 navigate('/UtilityModule/City/ViewCity');
    //             }, 2000);
    //         }
    //         console.log('Channel Partner details updated successfully!');
    //     } catch (error: any) {
    //         console.error('Error updating channel partner details:', error.message);
    //     }
    // };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Ensure `cityId` is defined before making the call
        if (cityId) {
            try {
                const response = await updateCity(cityId, cityDetails);
                if (response?.message) {
                    toast.success(response?.message);
                    setTimeout(() => {
                        navigate('/UtilityModule/City/ViewCity');
                    }, 2000);
                }
                console.log('City details updated successfully!');
            } catch (error: any) {
                console.error('Error updating city details:', error.message);
            }
        } else {
            toast.error('No cityId provided'); // Show error message if `cityId` is undefined
        }
    };

    // const handleSubmit = () => {
    //     window.location.reload();
    // };

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
            label: 'City',
            to: '/UtilityModule/City/ViewCity',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/UtilityModule/City/ViewCity' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Edit City',
            to: '/UtilityModule/City/EditCity',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `/UtilityModule/City/EditCity/${cityId}` ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <CityModule details={cityDetails} onInputChange={handleInputChange} showStatus={true} isEdit={true} viewSpecific={false} />

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

export default EditCity;
