import React, { useState, ChangeEvent, FormEvent, useEffect, Fragment } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Dialog, Transition, Tab } from '@headlessui/react';
import { updateChannelPartner, getChannelPartnerById } from '@/services/ChannelPartnerService';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import RefferalMasterModule from './RefferalMasterModule';
import { staticRefferalMasterData } from './ViewRefferalMaster';

import AuditLogsTable from '@/components/CommonTables/AuditLogsTable';
import UpdatedHistoryTable from '@/components/CommonTables/UpdatedHistoryTable';
import VerificationHistory from '@/components/CommonTables/VerificationHistory';
import InputComponent from '@/components/inputComponents';

interface InputSection {
    viewEndPoint: string;
    editEndPoint: string;
    mainHeader: string;
    details: {
        name: string;
        title: string;
        type: string;
        value: string;
        options?: string[];
    }[];
    viewSpecific: boolean;
}

interface FormValues {
    id: string;
    fk_bonusId: string;
    refferalByType: string;
    refferalBy: string;
    messageForInviter: string;
    uniqueURL: string;
    benefit: string;
    archive: string;
    approvedAt: string;
    approvedBy: string;
    fk_bonus: string;
    createdAt: string;
    createdBy: string;
    updatedHistory: {
        updatedTime: string;
        _id: string;
        updatedByObjectId?: string; // Optional field
    }[];
}

const ViewSpecificRefferalMaster: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { refferalMasterId } = useParams();
    const initialFormValues: FormValues = {
        id: '',
        fk_bonusId: '',
        refferalByType: '',
        refferalBy: '',
        messageForInviter: '',
        uniqueURL: '',
        benefit: '',
        archive: '',
        approvedAt: '',
        fk_bonus: '',
        approvedBy: '',
        createdAt: '',
        createdBy: '',
        updatedHistory: [], // Initialize as an empty array
    };

    const [formData, setFormData] = useState<FormValues>(initialFormValues);
    const [modal1, setModal1] = useState(false);

    useEffect(() => {
        // Find the specific data based on the serviceProviderId
        const specificData = staticRefferalMasterData.find((data) => data.id === refferalMasterId);

        // If specificData is found, update the formData state with its values
        if (specificData) {
            setFormData(specificData as unknown as FormValues); // Set the entire form data
        }
    }, [refferalMasterId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    {
        /*
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateChannelPartner(channelPartnerId, formData);
      console.log('Channel Partner details updated successfully!');
    } catch (error: any) {
      console.error('Error updating channel partner details:', error.message);
    }
  };
*/
    }

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
            label: 'Refferal Master',
            to: '/PromotionModule/RefferalMaster/ViewRefferalMaster',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/PromotionModule/RefferalMaster/ViewRefferalMaster' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'View Refferal Master',
            to: '',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `` ? 'text-blue-600' : ''
            }`,
        },
    ];

    const bonusDetails: InputSection[] = [
        {
            viewEndPoint: '/PromotionModule/BonusMaster/ViewSpecificBonusMaster/1',
            editEndPoint: '/PromotionModule/BonusMaster/EditBonusMaster/1',
            mainHeader: 'Bonus Receive',
            details: [
                { name: 'bonusType', title: 'Bonus Type', type: 'text', value: 'Type C' },
                { name: 'amount', title: 'Amount', type: 'text', value: '50' },
                { name: 'bonusCode', title: 'Bonus Code', type: 'text', value: 'DISCOUNT789' },
                { name: 'startDate', title: 'Start Date', type: 'text', value: '2024-03-20' },
                { name: 'endDate', title: 'End Date', type: 'text', value: '2024-06-20' }, // Added field
                { name: 'description', title: 'Description', type: 'text', value: 'Third dummy data' },
                { name: 'message', title: 'Message', type: 'text', value: 'Enjoy your bonus!' }, // Added field
                { name: 'archive', title: 'Archive Status', type: 'text', value: 'ACTIVE' }, // Added field
            ],
            viewSpecific: true,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <Tab.Group>
                <div className="mt-6 panel">
                    <Tab.List className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'text-secondary !outline-none before:!w-full' : ''
                                    } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                >
                                    <span className="text-md font-bold">View Specific</span>
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
                                    <span className="text-md font-bold">Bonus Master</span>
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
                                    <span className="text-md font-bold">Audit Logs</span>
                                </button>
                            )}
                        </Tab>
                    </Tab.List>
                </div>

                <Tab.Panels>
                    <Tab.Panel>
                        <div className="panel mt-6">
                            <form onSubmit={handleSubmit}>
                                <RefferalMasterModule details={formData} onInputChange={handleInputChange} showStatus={true} viewSpecific={true} />

                                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                    <div className="lg:w-1/3">
                                        <label htmlFor="approvedAt" className="block mb-1 pointer-events-none">
                                            Approved At
                                        </label>
                                        <input name="approvedAt" type="text" id="approvedAt" className="form-input w-full pointer-events-none" value={formData.approvedAt} />
                                    </div>
                                    <div className="lg:w-1/3">
                                        <label htmlFor="approvedBy" className="block mb-1 pointer-events-none">
                                            Approved By
                                        </label>
                                        <input name="approvedBy" type="text" id="approvedBy" className="form-input w-full pointer-events-none" value={formData.approvedBy} />
                                    </div>
                                    <div className="lg:w-1/3">
                                        <label htmlFor="createdAt" className="block mb-1 pointer-events-none">
                                            Created At
                                        </label>
                                        <input name="createdAt" type="text" id="createdAt" className="form-input w-full pointer-events-none" value={formData.createdAt} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6 ">
                                    <div className="lg:w-1/3">
                                        <label htmlFor="createdBy" className="block mb-1 pointer-events-none">
                                            Created By
                                        </label>
                                        <input name="createdBy" type="text" id="createdBy" className="form-input w-full pointer-events-none" value={formData.createdBy} />
                                    </div>

                                    <div className="lg:w-1/3"></div>
                                </div>
                            </form>
                        </div>
                    </Tab.Panel>

                    <Tab.Panel>
                        <div className=" panel mt-5">
                            <div>
                                {bonusDetails.map((section, index) => (
                                    <div key={index}>
                                        <InputComponent sections={[section]} dropdown={false} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Tab.Panel>

                    <Tab.Panel>
                        <div className="mt-5 panel">
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
        </>
    );
};

export default ViewSpecificRefferalMaster;
