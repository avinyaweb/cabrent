import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import ServiceTypeModule from './ServiceTypeModule';
import { staticServiceTypeData } from './ViewServiceType';

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
    archive: string;
}

const EditServiceType: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { ServiceTypeId } = useParams();

    const initialFormValues: FormValues = {
        country: '',
        state: '',
        city: '',
        dailyReqRadius: '',
        rentalReqRadius: '',
        outstationReqRadius: '',
        serviceType: '',
        cityCentreLat: '',
        cityCentreLong: '',
        cityBoundary: '',
        archive: '',
    };

    const [ServiceTypeDetails, setServiceTypeDetails] = useState<FormValues>(initialFormValues);

    // useEffect(() => {
    //     const specificData = staticServiceTypeData.find((data) => data.id === ServiceTypeId);
    //     if (specificData) {
    //         setServiceTypeDetails(specificData);
    //     }
    // }, [ServiceTypeId]);

    useEffect(() => {
        const specificData = staticServiceTypeData.find((data) => data.id === ServiceTypeId);
        if (specificData) {
            const { ...rest } = specificData; // Destructure and omit serviceType
            const mergedFormValues: FormValues = { ...initialFormValues, ...rest }; // Add serviceType with default value
            setServiceTypeDetails(mergedFormValues);
        }
    }, [ServiceTypeId]);

    //make dynamic please use this
    //   useEffect(() => {
    //     const fetchChannelPartnerDetails = async () => {
    //       try {
    //         const response = await getServiceTypeById(ServiceTypeId);
    //         console.log('Fetched Data', response);
    //         setServiceTypeDetails(response.data.ServiceType);
    //       } catch (error: any) {
    //         console.error('Error fetching channel partner details:', error.message);
    //       }
    //     };

    //     fetchChannelPartnerDetails();
    //   }, [ServiceTypeId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setServiceTypeDetails({ ...ServiceTypeDetails, [name]: value });
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
            to: '/UtilityModule/ServiceType/ViewServiceType',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/UtilityModule/ServiceType/ViewServiceType' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Edit Service City',
            to: '/UtilityModule/ServiceType/EditServiceType',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `/UtilityModule/ServiceType/EditServiceType/${ServiceTypeId}` ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form>
                    <ServiceTypeModule details={ServiceTypeDetails} onInputChange={handleInputChange} showStatus={true} viewSpecific={false} isEdit={true} />
                </form>
            </div>
        </>
    );
};

export default EditServiceType;
