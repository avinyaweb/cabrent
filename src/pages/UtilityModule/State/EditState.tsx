import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
//import { updateChannelPartner, getChannelPartnerById } from '@/services/ChannelPartnerService';
import StateModule from './StateModule';
import { getStateById, updateState } from '@/services/UtilityServices/StateService';
import toast from 'react-hot-toast';

interface FormValues {
    fk_country: string;
    stateName: string;
    archive: string;
}

const EditState: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { stateId } = useParams();

    const initialFormValues: FormValues = {
        fk_country: '',
        stateName: '',
        archive: '',
    };

    const [stateDetails, setStateDetails] = useState<FormValues>(initialFormValues);

    // fetch state data by ID.
    useEffect(() => {
        const fetchStateDetails = async () => {
            try {
                if (stateId) {
                    const response = await getStateById(stateId);
                    setStateDetails(response.data.State);
                }
            } catch (error: any) {
                console.error('Error fetching channel partner details:', error.message);
            }
        };
        fetchStateDetails();
    }, [stateId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setStateDetails({ ...stateDetails, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (stateId) {
                // Check if stateId is defined
                const response = await updateState(stateId, stateDetails);
                if (response?.message) {
                    toast.success(response.message);
                    setTimeout(() => {
                        navigate('/UtilityModule/State/ViewState');
                    }, 2000);
                }
                console.log('Channel Partner details updated successfully!');
            } else {
                console.error('Error: stateId is undefined');
            }
        } catch (error: any) {
            console.error('Error updating channel partner details:', error.message);
        }
    };

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
            label: 'State',
            to: '/UtilityModule/State/ViewState',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/UtilityModule/State/ViewState' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Edit State',
            to: '/UtilityModule/State/EditState',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `/UtilityModule/State/EditState/${stateId}` ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <StateModule details={stateDetails} onInputChange={handleInputChange} viewSpecific={false} showStatus={true} isEditPage={true} />
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

export default EditState;
