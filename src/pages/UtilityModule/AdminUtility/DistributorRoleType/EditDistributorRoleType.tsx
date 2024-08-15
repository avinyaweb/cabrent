import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DistributorRoleTypeModule from './DistributorRoleTypeModule';
import Breadcrumb from '@/pages/Auth/Breadcrumb';

interface FormValues {
    id: string;
    distributorTypeName: string;
    distributorLevel: string;
    archive: string;
}

const EditDistributorRoleType: React.FC = () => {
    // future code -->>
    // const dispatch = useDispatch();
    const navigate = useNavigate();

    const { distributorTypeId }: { distributorTypeId?: any } = useParams();

    const initialFormValues: FormValues = {
        id: '',
        distributorTypeName: '',
        distributorLevel: '',
        archive: '',
    };

    const [distributorTypeDetails, setdistributorTypeDetails] = useState<FormValues>(initialFormValues);

    useEffect(() => {
        const fetchdistributorDetails = async () => {
            try {
                // const response = await getdistributorTypeById(distributorTypeId);
                // console.log('Fetched Data', response);
                // setdistributorTypeDetails(response.data.distributorType);
            } catch (error: any) {
                console.error('Error fetching Distributor details:', error.message);
            }
        };

        fetchdistributorDetails();
    }, [distributorTypeId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setdistributorTypeDetails({ ...distributorTypeDetails, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // await updatedistributorType(distributorTypeId, distributorTypeDetails);
            console.log('Distributor details updated successfully!');
            navigate('/UtilityModule/distributorType/ViewdistributorType');
        } catch (error: any) {
            console.error('Error updating Distributor details:', error.message);
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
            label: 'Distributor Type',
            to: '/UtilityModule/distributorType/ViewdistributorType',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/UtilityModule/distributorType/ViewdistributorType' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Edit Distributor Type',
            to: '/UtilityModule/distributorType/EditDistributorRoleType',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `/UtilityModule/distributorType/EditDistributorRoleType/${distributorTypeId}` ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <DistributorRoleTypeModule details={distributorTypeDetails} onInputChange={handleInputChange} showStatus={true} />

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

export default EditDistributorRoleType;
