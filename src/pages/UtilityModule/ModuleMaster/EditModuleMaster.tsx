import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { updateModule, getModuleById } from '@/services/UtilityServices/ModuleMasterServices';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import ModuleMasterModule from './ModulesMasterModule';

interface FormValues {
    moduleName: string;
    archive: string;
}

const EditModuleMasterModule: React.FC = () => {
    // future code -->>>
    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    const { moduleMasterId } = useParams();

    const initialFormValues: FormValues = {
        moduleName: '',
        archive: '',
    };

    const [moduleMasterDetails, setModuleMasterDetails] = useState<FormValues>(initialFormValues);

    useEffect(() => {
        const fetchChannelPartnerDetails = async () => {
            try {
                if (moduleMasterId) {
                    const response = await getModuleById(moduleMasterId);
                    console.log('Fetched Data', response.data.Module);
                    setModuleMasterDetails(response.data.Module); // Update this line
                }
            } catch (error: any) {
                console.error('Error fetching channel partner details:', error.message);
            }
        };

        fetchChannelPartnerDetails();
    }, [moduleMasterId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setModuleMasterDetails({ ...moduleMasterDetails, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!moduleMasterId) {
            console.error('Module Master ID is undefined');
            return;
        }

        try {
            await updateModule(moduleMasterId, moduleMasterDetails);
            console.log('Module details updated successfully!');
        } catch (error: any) {
            console.error('Error updating module details:', error.message);
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
            label: 'Module Master',
            to: '/UtilityModule/ModuleMaster/ViewModuleMaster',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/UtilityModule/ModuleMaster/ViewModuleMaster' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Edit Module Master',
            to: '/UtilityModule/ModuleMaster/EditModuleMaster',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `/UtilityModule/ModuleMaster/EditModuleMaster/${moduleMasterId}` ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <ModuleMasterModule details={moduleMasterDetails} onInputChange={handleInputChange} showStatus={true} />
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

export default EditModuleMasterModule;
