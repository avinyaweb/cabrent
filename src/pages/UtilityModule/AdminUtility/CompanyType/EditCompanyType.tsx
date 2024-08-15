import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllCompanyTypeById, updateCompanyType } from '@/services/UtilityServices/CompanyTypeService';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import CompanyTypeModule from './CompanyTypeModule';

interface FormValues {
    id: string;
    companyTypeName: string;
    archive: string;
}

const EditCompanyType: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { companyTypeId }: { companyTypeId?: any } = useParams();

    const initialFormValues: FormValues = {
        id: '',
        companyTypeName: '',
        archive: '',
    };

    const [companyTypeDetails, setCompanyTypeDetails] = useState<FormValues>(initialFormValues);

    useEffect(() => {
        const fetchChannelPartnerDetails = async () => {
            try {
                const response = await getAllCompanyTypeById(companyTypeId);
                console.log('Fetched Data', response);
                setCompanyTypeDetails(response.data.CompanyType);
            } catch (error: any) {
                console.error('Error fetching channel partner details:', error.message);
            }
        };

        fetchChannelPartnerDetails();
    }, [companyTypeId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCompanyTypeDetails({ ...companyTypeDetails, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await updateCompanyType(companyTypeId, companyTypeDetails);
            console.log('Channel Partner details updated successfully!');
            navigate('/UtilityModule/CompanyType/ViewCompanyType');
        } catch (error: any) {
            console.error('Error updating channel partner details:', error.message);
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
            label: 'Company Type',
            to: '/UtilityModule/CompanyType/ViewCompanyType',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/UtilityModule/CompanyType/ViewCompanyType' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Edit Company Type',
            to: '/UtilityModule/CompanyType/EditCompanyType',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `/UtilityModule/CompanyType/EditCompanyType/${companyTypeId}` ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <CompanyTypeModule details={companyTypeDetails} onInputChange={handleInputChange} showStatus={true} />

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

export default EditCompanyType;
