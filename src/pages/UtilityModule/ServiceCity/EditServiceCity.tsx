import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateServiceCity, getServiceCityById } from '@/services/UtilityServices/ServiceCityService';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import ServiceCityModule from './ServiceCityModule';
import { staticServiceCityData } from './ViewServiceCity';

interface FormValues {
    country: string;
    state: string;
    city: string;
    dailyReqRadius: string;
    serviceType: string;
    rentalReqRadius: string;
    outstationReqRadius: string;
    cityCentreLat: string;
    cityCentreLong: string;
    cityBoundary: string;
    ApproxCityKMCenter: string;
    driverPrefixCode: string;
    tripPrefixCode: string;
    archive: string;
}

const EditServiceCity: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { serviceCityId } = useParams();

    const initialFormValues: FormValues = {
        country: '',
        state: '',
        city: '',
        dailyReqRadius: '',
        serviceType: '',
        rentalReqRadius: '',
        outstationReqRadius: '',
        cityCentreLat: '',
        cityCentreLong: '',
        cityBoundary: '',
        ApproxCityKMCenter: '',
        driverPrefixCode: '',
        tripPrefixCode: '',
        archive: '',
    };

    const [serviceCityDetails, setServiceCityDetails] = useState<FormValues>(initialFormValues);

    // useEffect(() => {
    //     const specificData = staticServiceCityData.find((data) => data.id === serviceCityId);
    //     if (specificData) {
    //         setServiceCityDetails(specificData);
    //     }
    // }, [serviceCityId]);

    useEffect(() => {
        const specificData = staticServiceCityData.find((data) => data.id === serviceCityId);
        if (specificData) {
            const { ...rest } = specificData; // Destructure and omit serviceType
            const mergedFormValues: FormValues = { ...initialFormValues, ...rest }; // Add serviceType with default value
            setServiceCityDetails(mergedFormValues);
        }
    }, [serviceCityId]);

    //make dynamic please use this
    //   useEffect(() => {
    //     const fetchChannelPartnerDetails = async () => {
    //       try {
    //         const response = await getServiceCityById(serviceCityId);
    //         console.log('Fetched Data', response);
    //         setServiceCityDetails(response.data.ServiceCity);
    //       } catch (error: any) {
    //         console.error('Error fetching channel partner details:', error.message);
    //       }
    //     };

    //     fetchChannelPartnerDetails();
    //   }, [serviceCityId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setServiceCityDetails({ ...serviceCityDetails, [name]: value });
    };

    //   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();

    //     try {
    //       await updateCountry(countryId, countryDetails);
    //       console.log('Channel Partner details updated successfully!');
    //       navigate('/UtilityModule/Country/ViewCountry')
    //     } catch (error: any) {
    //       console.error('Error updating channel partner details:', error.message);
    //     }
    //   };

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
            label: 'Service City',
            to: '/UtilityModule/ServiceCity/ViewServiceCity',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/UtilityModule/ServiceCity/ViewServiceCity' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Edit Service City',
            to: '/UtilityModule/ServiceCity/EditServiceCity',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `/UtilityModule/ServiceCity/EditServiceCity/${serviceCityId}` ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form>
                    <ServiceCityModule details={serviceCityDetails} onInputChange={handleInputChange} showStatus={true} viewSpecific={false} isEdit={true} />
                </form>
            </div>
        </>
    );
};

export default EditServiceCity;
