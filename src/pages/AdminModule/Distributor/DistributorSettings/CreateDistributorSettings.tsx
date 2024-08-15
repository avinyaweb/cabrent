import React, { useState, ChangeEvent, FormEvent, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DistributorSettingsModule from './DistributorSettingsModule';

interface FormValues {
    bookingType: string;
    serviceType: string;
    serviceCity: string;
    subscriptionType: string;
    taxPercentage: string;
}

const CreateDistributorSettings: React.FC = () => {
    const secondPanelRef = useRef<HTMLDivElement | null>(null);

    const initialFormValues: FormValues = {
        bookingType: '',
        serviceType: '',
        serviceCity: '',
        subscriptionType: '',
        taxPercentage: '',
    };

    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormValues>(initialFormValues);
    // const [Dis_DOCValues, setDis_DOCValues] = useState<DistributorDOC>(initialDOCValues);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (secondPanelRef.current) {
            secondPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        //     try {
        //         const response = await CreateDistributorSettingsData(formData);
        //         if (response.message) {
        //             toast.success('Admin Tickets created successfully!');
        //             setTimeout(() => {
        //                 navigate('/AdminModule/ChannelPartner/ViewChannelPartner');
        //             }, 2000);
        //         }
        //         setFormData(initialFormValues);
        //     } catch (error: any) {
        //         console.error('Error creating admin tickets:', error.message);
        //     }
    };

    const handleCancel = () => {
        navigate('/AdminModule/Distributor/ViewDistributor');
    };

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to set the current page based on the path
    const setCurrent = (path: string) => {
        setCurrentPage(path);
    };

    return (
        <>
            <ol className="flex text-gray-500 font-semibold dark:text-white-dark flex-wrap">
                <li className="">
                    <Link to="/" className={currentPage === '/' ? 'active' : ''} onClick={() => setCurrent('/')}>
                        Home
                    </Link>
                </li>
                <li
                    className={`before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                        currentPath === '/AdminModule/Distributor/ViewDistributor' ? 'text-blue-600' : ''
                    }`}
                >
                    <Link
                        to="/AdminModule/Distributor/ViewDistributor"
                        className={currentPage === '/AdminModule/Distributor/ViewDistributor' ? 'active' : ''}
                        onClick={() => setCurrent('/viewDistributor')}
                    >
                        Distributor Settings
                    </Link>
                </li>
                <li
                    className={`before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                        currentPath === '/AdminModule/Distributor/DistributorSettings/CreateDistributorSettings' ? 'text-blue-600' : ''
                    }`}
                >
                    Create Distributor Settings
                </li>
            </ol>

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <DistributorSettingsModule details={formData} onInputChange={handleInputChange} redirect={false} showStatus={false} viewSpecific={false} isEditPage={false} noPassEdit={false} />

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

export default CreateDistributorSettings;
