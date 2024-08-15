import React, { useState, ChangeEvent, Fragment } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import DistributorSettingsModule from './DistributorSettingsModule';

interface FormValues {
    id: string;
    bookingType: string;
    serviceType: string;
    serviceCity: string;
    subscriptionType: string;
    taxPercentage: string;
    createdAt: string;
    updatedAt: string;
}

const ViewSpecificDistributorSettings: React.FC<{ tabs: boolean }> = (tabs) => {
    // future code -->>
    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    const { RiderUsersId } = useParams();
    const initialFormValues: FormValues = {
        id: '',
        bookingType: '',
        serviceType: '',
        serviceCity: '',
        subscriptionType: '',
        taxPercentage: '',
        createdAt: '',
        updatedAt: '',
    };

    const [formData, setFormData] = useState<FormValues>(initialFormValues);
    const [modal1, setModal1] = useState(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
            label: 'Distributor Settings',
            to: '/AdminModule/Distributor/DistributorSettings/ViewDistributorSettings',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/AdminModule/Distributor/DistributorSettings/ViewSpecificDistributorSettings' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'View Distributor Settings',
            to: '',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `/AdminModule/Distributor/DistributorSettings/ViewSpecificDistributorSettings/1` ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            {!tabs && <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />}

            <div className="panel mt-6">
                <form>
                    <DistributorSettingsModule details={formData} onInputChange={handleInputChange} viewSpecific={true} showStatus={true} isEditPage={false} noPassEdit />
                </form>
            </div>
        </>
    );
};

export default ViewSpecificDistributorSettings;
