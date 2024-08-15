import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import { updateCountry, getCountryById } from '@/services/UtilityServices/CountryServices';
import CountryModule from './CountryModule';

interface FormValues {
    countryName: string;
    currencyName: string;
    countryCode: string;
    currencyCode: string;
    phoneCode: string;
    archive: string;
}

const EditCountry: React.FC = () => {
    // future code -->>
    // const dispatch = useDispatch();
    const navigate = useNavigate();

    const { countryId }: { countryId?: any } = useParams();

    const initialFormValues: FormValues = {
        countryName: '',
        currencyName: '',
        countryCode: '',
        currencyCode: '',
        phoneCode: '',
        archive: '',
    };

    const [countryDetails, setCountryDetails] = useState<FormValues>(initialFormValues);

    useEffect(() => {
        const fetchChannelPartnerDetails = async () => {
            try {
                const response = await getCountryById(countryId);
                console.log('Fetched Data', response);
                setCountryDetails(response.data.Country);
            } catch (error: any) {
                console.error('Error fetching channel partner details:', error.message);
            }
        };

        fetchChannelPartnerDetails();
    }, [countryId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCountryDetails({ ...countryDetails, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await updateCountry(countryId, countryDetails);
            console.log('Channel Partner details updated successfully!');
            navigate('/UtilityModule/Country/ViewCountry');
        } catch (error: any) {
            console.error('Error updating channel partner details:', error.message);
        }
    };

    // const handleSubmit = () => {
    //   window.location.reload();
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
            label: 'Country',
            to: '/UtilityModule/Country/ViewCountry',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/UtilityModule/Country/ViewCountry' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Edit Country',
            to: '/UtilityModule/Country/EditCountry',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `/UtilityModule/Country/EditCountry/${countryId}` ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <CountryModule details={countryDetails} onInputChange={handleInputChange} showStatus={true} />

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

export default EditCountry;
