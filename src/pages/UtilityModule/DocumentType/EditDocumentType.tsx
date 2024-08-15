import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
//import { updateChannelPartner, getChannelPartnerById } from '@/services/ChannelPartnerService';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import DocumentTypeModule from './DocumentTypeModule';

interface FormValues {
    id: string;
    documentName: string;
    documentType: string;
    documentForModule: string;
    archive: string;
    fk_serviceCity: string;
    userType: string;
    documentCondition: string;
}

const EditDocumentTypeModule: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { documentTypeId } = useParams();

    const initialFormValues: FormValues = {
        id: '',
        documentName: '',
        documentType: '',
        documentForModule: '',
        archive: '',
        fk_serviceCity: '',
        userType: '',
        documentCondition: '',
    };

    const [documentTypeDetails, setDocumentTypeDetails] = useState<FormValues>(initialFormValues);

    // useEffect(() => {
    //   const fetchChannelPartnerDetails = async () => {
    //     try {
    //       const response = await getChannelPartnerById(channelPartnerId);
    //       console.log('Fetched Data', response);
    //       setChannelPartnerDetails(response.data.channelPartner);
    //     } catch (error: any) {
    //       console.error('Error fetching channel partner details:', error.message);
    //     }
    //   };

    //   fetchChannelPartnerDetails();
    // }, [channelPartnerId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
    };

    // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    //   e.preventDefault();

    //   try {
    //     await updateChannelPartner(channelPartnerId, channelPartnerDetails);
    //     console.log('Channel Partner details updated successfully!');
    //   } catch (error: any) {
    //     console.error('Error updating channel partner details:', error.message);
    //   }
    // };

    const handleSubmit = () => {
        window.location.reload();
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
            label: 'Document Type',
            to: '/UtilityModule/DocumentType/ViewDocumentType',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/UtilityModule/DocumentType/ViewDocumentType' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Edit Document Type',
            to: '/UtilityModule/DocumentType/EditDocumentType',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `/UtilityModule/DocumentType/EditDocumentType/${documentTypeId}` ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <DocumentTypeModule details={documentTypeDetails} onInputChange={handleInputChange} showStatus={true} isEditPage={true} />
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

export default EditDocumentTypeModule;
