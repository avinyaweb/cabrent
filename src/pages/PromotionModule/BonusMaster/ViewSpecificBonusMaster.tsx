import React, { useState, ChangeEvent, FormEvent, useEffect, Fragment } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Dialog, Transition, Tab } from '@headlessui/react';
import { updateChannelPartner, getChannelPartnerById } from '@/services/ChannelPartnerService';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import BonusMasterModule from './BonusMasterModule';
import { staticBonusMasterData } from './ViewBonusMaster';
import AuditLogsTable from '@/components/CommonTables/AuditLogsTable';
import UpdatedHistoryTable from '@/components/CommonTables/UpdatedHistoryTable';
import VerificationHistory from '@/components/CommonTables/VerificationHistory';
import { CiBank } from 'react-icons/ci';
import { AiOutlineAudit } from 'react-icons/ai';
import { FaSackDollar } from 'react-icons/fa6';

interface FormValues {
    id: string;
    bonusType: string;
    amount: string;
    bonusCode: string;
    startDate: string;
    endDate: string; // Added missing property with optional (?) modifier
    description: string;
    message: string;
    archive: string;
    approvedAt: string;
    approvedBy: string;
    createdAt: string;
    createdBy: string;
}

const ViewSpecificBonusMaster: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { bonusMasterId } = useParams();
    const initialFormValues: FormValues = {
        id: '',
        bonusType: '',
        amount: '',
        bonusCode: '',
        startDate: '',
        endDate: '', // Added initialization for endDate
        description: '',
        message: '',
        archive: '',
        approvedAt: '',
        approvedBy: '',
        createdAt: '',
        createdBy: '',
        // Initialize as an empty array
    };
    const [formData, setFormData] = useState<FormValues>(initialFormValues);
    const [modal1, setModal1] = useState(false);

    useEffect(() => {
        // Find the specific data based on the serviceProviderId
        const specificData = staticBonusMasterData.find((data) => data.id === bonusMasterId);

        // If specificData is found, update the formData state with its values
        if (specificData) {
            setFormData(specificData as unknown as FormValues); // Set the entire form data
        }
    }, [bonusMasterId]);

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
            label: 'Bonus Master',
            to: '/PromotionModule/BonusMaster/ViewBonusMaster',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/PromotionModule/BonusMaster/ViewBonusMaster' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'View Bonus Master',
            to: '',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `` ? 'text-blue-600' : ''
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
                                    <FaSackDollar className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
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
                                    <AiOutlineAudit className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Audit Log</span>
                                </button>
                            )}
                        </Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <div className="mt-5">
                                <BonusMasterModule details={formData} onInputChange={handleInputChange} showStatus={true} viewSpecific={true} />

                                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6 ">
                                    <div className="lg:w-1/4 ">
                                        <label htmlFor="approvedAt" className="block mb-1 pointer-events-none">
                                            Approved At
                                        </label>
                                        <input
                                            name="approvedAt"
                                            type="text"
                                            id="approvedAt"
                                            placeholder="Enter Approved At"
                                            className="form-input w-full pointer-events-none"
                                            value={formData.approvedAt}
                                        />
                                    </div>
                                    <div className="lg:w-1/4 ">
                                        <label htmlFor="approvedBy" className="block mb-1 pointer-events-none">
                                            Approved By
                                        </label>
                                        <input
                                            name="approvedBy"
                                            type="text"
                                            id="approvedBy"
                                            placeholder="Enter Approved By"
                                            className="form-input w-full pointer-events-none"
                                            value={formData.approvedBy}
                                        />
                                    </div>
                                    <div className="lg:w-1/4 ">
                                        <label htmlFor="createdAt" className="block mb-1 pointer-events-none">
                                            Created At
                                        </label>
                                        <input
                                            name="createdAt"
                                            type="text"
                                            id="createdAt"
                                            placeholder="Enter Created At"
                                            className="form-input w-full pointer-events-none "
                                            value={formData.createdAt}
                                        />
                                    </div>
                                    <div className="lg:w-1/4 ">
                                        <label htmlFor="createdBy" className="block mb-1 pointer-events-none">
                                            Created By
                                        </label>
                                        <input
                                            name="createdBy"
                                            type="text"
                                            id="createdBy"
                                            placeholder="Enter Created By"
                                            className="form-input w-full pointer-events-none"
                                            value={formData.createdBy}
                                        />
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

export default ViewSpecificBonusMaster;
