import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updatechannelPartnerType, getchannelPartnerTypeById } from '@/services/UtilityServices/ChannelPartnerTypeServices';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import ChannelPartnerTypeModule from './ChannelPartnerTypeModule';

interface FormValues {
    id: string;
    channelPartnerTypeName: string;
    channelPartnerLevel: string;
    archive: string;
}

const EditChannelPartnerType: React.FC = () => {
    // future code -->>
    // const dispatch = useDispatch();
    const navigate = useNavigate();

    const { channelPartnerTypeId }: { channelPartnerTypeId?: any } = useParams();

    const initialFormValues: FormValues = {
        id: '',
        channelPartnerTypeName: '',
        channelPartnerLevel: '',
        archive: '',
    };

    const [channelPartnerTypeDetails, setChannelPartnerTypeDetails] = useState<FormValues>(initialFormValues);

    useEffect(() => {
        const fetchChannelPartnerDetails = async () => {
            try {
                const response = await getchannelPartnerTypeById(channelPartnerTypeId);
                console.log('Fetched Data', response);
                setChannelPartnerTypeDetails(response.data.ChannelPartnerType);
            } catch (error: any) {
                console.error('Error fetching channel partner details:', error.message);
            }
        };

        fetchChannelPartnerDetails();
    }, [channelPartnerTypeId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setChannelPartnerTypeDetails({ ...channelPartnerTypeDetails, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await updatechannelPartnerType(channelPartnerTypeId, channelPartnerTypeDetails);
            console.log('Channel Partner details updated successfully!');
            navigate('/UtilityModule/ChannelPartnerType/ViewChannelPartnerType');
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
            label: 'Channel Partner Type',
            to: '/UtilityModule/ChannelPartnerType/ViewChannelPartnerType',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/UtilityModule/ChannelPartnerType/ViewChannelPartnerType' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Edit Channel Partner Type',
            to: '/UtilityModule/ChannelPartnerType/EditChannelPartnerType',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `/UtilityModule/ChannelPartnerType/EditChannelPartnerType/${channelPartnerTypeId}` ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <ChannelPartnerTypeModule details={channelPartnerTypeDetails} onInputChange={handleInputChange} showStatus={true} />

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

export default EditChannelPartnerType;
