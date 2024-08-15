import React, { useState, ChangeEvent, FormEvent, useEffect, Fragment } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Dialog, Transition, Tab } from '@headlessui/react';
import { updatechannelPartnerType, getchannelPartnerTypeById } from '@/services/UtilityServices/ChannelPartnerTypeServices';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import ChannelPartnerTypeModule from './ChannelPartnerTypeModule';
import { AiOutlineAudit } from 'react-icons/ai';
import AuditLogsTable from '@/components/CommonTables/AuditLogsTable';
import UpdatedHistoryTable from '@/components/CommonTables/UpdatedHistoryTable';
import { PiHandshakeDuotone } from 'react-icons/pi';

interface FormValues {
    id: string;
    channelPartnerTypeName: string;
    channelPartnerLevel: string;
    archive: string;
    approvedAt: string;
    approvedBy: string;
    createdAt: string;
    createdBy: string;
    updatedHistory: {
        updatedTime: string;
        _id: string;
        updatedByObjectId?: string; // Optional field
    }[];
}

const ViewSpecificChannelPartnerType: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const { channelPartnerTypeId } = useParams();
    const { channelPartnerTypeId } = useParams<{ channelPartnerTypeId: string | undefined }>();

    const initialFormValues: FormValues = {
        id: '',
        channelPartnerTypeName: '',
        channelPartnerLevel: '',
        archive: '',
        approvedAt: '',
        approvedBy: '',
        createdAt: '',
        createdBy: '',
        updatedHistory: [], // Initialize as an empty array
    };

    const [channelPartnerTypeDetails, setChannelPartnerTypeDetails] = useState<FormValues>(initialFormValues);

    const [modal1, setModal1] = useState(false);

    useEffect(() => {
        // const fetchChannelPartnerDetails = async () => {
        //     try {
        //         const response = await getchannelPartnerTypeById(channelPartnerTypeId);
        //         console.log('Fetched Data', response);
        //         setChannelPartnerTypeDetails(response.data.ChannelPartnerType);
        //     } catch (error: any) {
        //         console.error('Error fetching channel partner details:', error.message);
        //     }
        // };

        const fetchChannelPartnerDetails = async () => {
            // Ensure `channelPartnerTypeId` is not undefined before making the call
            if (channelPartnerTypeId !== undefined) {
                try {
                    const response = await getchannelPartnerTypeById(channelPartnerTypeId);
                    console.log('Fetched Data', response);
                    setChannelPartnerTypeDetails(response.data.ChannelPartnerType);
                    // Handle response
                } catch (error) {
                    console.error('Failed to fetch details', error);
                }
            } else {
                console.error('No channelPartnerTypeId provided');
            }
        };

        fetchChannelPartnerDetails();
    }, [channelPartnerTypeId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        //setChannelPartnerDetails({ ...channelPartnerDetails, [name]: value });
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
            label: 'Channel Partner Type',
            to: '/UtilityModule/ChannelPartnerType/ViewChannelPartnerType',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/UtilityModule/ChannelPartnerType/ViewChannelPartnerType' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'View Channel Partner Type',
            to: '/UtilityModule/ChannelPartnerType/ViewSpecificChannelPartnerType',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `/UtilityModule/ChannelPartnerType/ViewSpecificChannelPartnerType/${channelPartnerTypeId}` ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />
            <div className="panel mt-6">
                <Tab.Group>
                    <Tab.List className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'text-secondary !outline-none before:!w-full' : ''
                                    } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                >
                                    <PiHandshakeDuotone className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Channel Partner Type</span>
                                </button>
                            )}
                        </Tab>
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'text-secondary !outline-none before:!w-full' : ''
                                    } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                >
                                    <AiOutlineAudit className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Audit Log</span>
                                </button>
                            )}
                        </Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <div className="mt-5">
                                <ChannelPartnerTypeModule details={channelPartnerTypeDetails} onInputChange={handleInputChange} showStatus={true} viewSpecific={true} />

                                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                    <div className="lg:w-1/3">
                                        <label htmlFor="approvedAt" className="block mb-1">
                                            Approved At
                                        </label>
                                        <input name="approvedAt" type="text" id="approvedAt" className="form-input w-full pointer-events-none" value={channelPartnerTypeDetails.approvedAt} />
                                    </div>
                                    <div className="lg:w-1/3">
                                        <label htmlFor="approvedBy" className="block mb-1">
                                            Approved By
                                        </label>
                                        <input name="approvedBy" type="text" id="approvedBy" className="form-input w-full pointer-events-none" value={channelPartnerTypeDetails.approvedBy} />
                                    </div>
                                    <div className="lg:w-1/3">
                                        <label htmlFor="createdAt" className="block mb-1">
                                            Created At
                                        </label>
                                        <input name="createdAt" type="text" id="createdAt" className="form-input w-full pointer-events-none" value={channelPartnerTypeDetails.createdAt} />
                                    </div>
                                    <div className="lg:w-1/3">
                                        <label htmlFor="createdBy" className="block mb-1">
                                            Created By
                                        </label>
                                        <input name="createdBy" type="text" id="createdBy" className="form-input w-full pointer-events-none" value={channelPartnerTypeDetails.createdBy} />
                                    </div>
                                </div>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="mt-5">
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark">
                                    <h2>Audit logs</h2>
                                </div>
                                <AuditLogsTable />
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h2>Updated Hisory</h2>
                                </div>
                                <UpdatedHistoryTable />
                            </div>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </>
    );
};

export default ViewSpecificChannelPartnerType;
