import React, { useState, ChangeEvent, FormEvent, useEffect, Fragment } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, Transition, Tab } from '@headlessui/react';
import { updateChannelPartner, getChannelPartnerById } from '@/services/ChannelPartnerService';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import VehicleProfileModule from './VehicleProfileModule';
import { staticVehicleProfileData } from './ViewVehicleProfile';
import VehicleDocLayout from './VehicleDocLayout';
import { FaCarSide } from 'react-icons/fa6';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { MdHistory } from 'react-icons/md';
import { DataTable, DataTableColumn, DataTableSortStatus } from 'mantine-datatable';
import DateRangePicker, { DateRange } from 'rsuite/esm/DateRangePicker';
import Tippy from '@tippyjs/react';
import IconEdit from '@/components/Icon/IconEdit';
import IconEye from '@/components/Icon/IconEye';
import Dropdown from '@/components/Dropdown';
import IconCaretDown from '@/components/Icon/IconCaretDown';
import { IRootState } from '@/store';
import AuditLogsTable from '@/components/CommonTables/AuditLogsTable';
import { AiOutlineAudit } from 'react-icons/ai';
import UpdatedHistoryTable from '@/components/CommonTables/UpdatedHistoryTable';
import VerificationHistory from '@/components/CommonTables/VerificationHistory';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import UpdateArchivePopUp from '@/components/Models/UpdateArchivePopUp';
import { errorAlert, successAlert } from '@/utils/Toast';
import { downloadExcel } from '@/utils/Excel';

import SubscriptionHistoryReport from '@/components/ChartAndGraph/VehicleReports/Subscription/SubscriptionHistoryReport';

interface SubscriptionHistoryData {
    id: string;
    planId: string;
    purchasedBy: string;
    purchasedByRolesId: string;
    driverId: string;
    vehicleId: string;
    planStatus: string;
    startDate: string;
    endDate: string;
    walletHistoryId: string;
    archive: string;
}

export const staticSubscriptionHistoryData = [
    {
        id: '1',
        planId: 'P001',
        purchasedBy: 'John Doe',
        purchasedByRolesId: 'R001',
        driverId: 'D001',
        vehicleId: 'V001',
        planStatus: 'Active',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        walletHistoryId: 'W001',
        archive: 'false',
        updatedHistory: [
            {
                updatedByObjectId: '654e26716e8ddde56bf6fe64',
                updatedTime: '2024-01-01T09:40:05.000Z',
                _id: '65928875e10d341487baa93a',
            },
            {
                updatedByObjectId: '654e26716e8ddde56bf6fe64',
                updatedTime: '2024-01-01T10:28:30.000Z',
                _id: '659293cee10d341487baa9fa',
            },
        ],
    },
    {
        id: '2',
        planId: 'P002',
        purchasedBy: 'Alice Smith',
        purchasedByRolesId: 'R002',
        driverId: 'D002',
        vehicleId: 'V002',
        planStatus: 'Expire',
        startDate: '2024-02-15',
        endDate: '2024-11-30',
        walletHistoryId: 'W002',
        archive: 'true',
    },
    {
        id: '3',
        planId: 'P003',
        purchasedBy: 'Bob Johnson',
        purchasedByRolesId: 'R003',
        driverId: 'D003',
        vehicleId: 'V003',
        planStatus: 'Upcoming',
        startDate: '2024-03-20',
        endDate: '2024-10-15',
        walletHistoryId: 'W003',
        archive: 'false',
    },
];

interface FormValues {
    id: string;
    serviceProviderType: string;
    channelPartnerType: string;
    fleetManagementType: string;
    vehRegNumber: string;
    vehRTONumber: string;
    vehChasisNumber: string;
    vehCategory: string;
    seatCapacity: string;
    bootSpace: string;
    loadCapacity: string;
    bodyDimension: string;
    vehBrandName: string;
    vehType: string;
    vehBrandModel: string;
    vehColor: string;
    vehFuelType: string;
    country: string;
    state: string;
    city: string;
    fk_serviceCity: string;
    serviceType: string;
    vehicleRegistrationDate: Date | string;
    vehicleAge: string;
    loanBanker: string;
    loanAccNumber: string;
    emiAmt: string;
    emiDate: string;
    currLocation: string;
    archive: string;
    vehManufacturer: string;
}

const ViewSpecificVehicleProfile: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const viewSpecific = true;
    const { vehicleProfileId } = useParams();
    const initialFormValues: FormValues = {
        id: '',
        vehManufacturer: '',
        serviceProviderType: '',
        channelPartnerType: '',
        fleetManagementType: '',
        vehRegNumber: '',
        vehRTONumber: '',
        vehChasisNumber: '',
        vehCategory: '',
        seatCapacity: '',
        bootSpace: '',
        loadCapacity: '',
        bodyDimension: '',
        vehBrandName: '',
        vehType: '',
        vehBrandModel: '',
        vehColor: '',
        vehFuelType: '',
        country: '',
        state: '',
        city: '',
        fk_serviceCity: '',
        serviceType: '',
        vehicleRegistrationDate: '',
        vehicleAge: '',
        loanBanker: '',
        loanAccNumber: '',
        emiAmt: '',
        emiDate: '',
        currLocation: '',
        archive: '',
    };

    const [formData, setFormData] = useState<FormValues>(initialFormValues);
    const [modal1, setModal1] = useState(false);

    // useEffect(() => {
    //     // Find the specific data based on the serviceProviderId
    //     const specificData = staticVehicleProfileData.find((data) => data.id === vehicleProfileId);

    //     // If specificData is found, update the formData state with its values
    //     if (specificData) {
    //         setFormData(specificData); // Set the entire form data
    //     }
    // }, [vehicleProfileId]);

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
            label: 'Vehicle ',
            to: '/BusinessModule/VehicleProfile/ViewVehicleProfile',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/BusinessModule/VehicleProfile/ViewVehicleProfile' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'View Vehicle ',
            to: '',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `` ? 'text-blue-600' : ''
            }`,
        },
    ];

    // subscription history

    const [Subs_HistoryData, setSubs_HistoryData] = useState<SubscriptionHistoryData[]>(staticSubscriptionHistoryData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<SubscriptionHistoryData[]>([]);
    const [recordsData, setRecordsData] = useState<SubscriptionHistoryData[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<SubscriptionHistoryData[]>([]);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    const [selectedDateRange, setSelectedDateRange] = useState<DateRange | null>(null);

    const handleDateRangeChange = (range: DateRange | null) => {
        setSelectedDateRange(range);
    };

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        if (Subs_HistoryData.length > 0) {
            const sortedData = Subs_HistoryData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof SubscriptionHistoryData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [Subs_HistoryData, sortStatus, pageSize]);

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const {
                id = '',
                planId = '',
                purchasedBy = '',
                purchasedByRolesId = '',
                driverId = '',
                vehicleId = '',
                planStatus = '',
                startDate = '',
                endDate = '',
                walletHistoryId = '',
                archive = '',
            } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return (
                id?.toLowerCase().includes(searchString) ||
                planId?.toLowerCase().includes(searchString) ||
                purchasedBy?.toLowerCase().includes(searchString) ||
                purchasedByRolesId?.toLowerCase().includes(searchString) ||
                driverId?.toLowerCase().includes(searchString) ||
                vehicleId?.toLowerCase().includes(searchString) ||
                planStatus?.toLowerCase().includes(searchString) ||
                startDate?.toLowerCase().includes(searchString) ||
                endDate?.toLowerCase().includes(searchString) ||
                walletHistoryId?.toLowerCase().includes(searchString) ||
                archive?.toLowerCase().includes(searchString)
            );
        });

        setRecordsData(filteredData.slice(0, pageSize));
    }, [search, initialRecords, pageSize]);

    // State to manage hidden columns
    const [hiddenColumns, setHiddenColumns] = useState<string[]>(['id', 'approvedAt', 'approvedBy', 'createdAt', 'createdBy', 'updatedAt', 'updatedBy']);

    // Function to toggle column visibility
    const toggleColumnVisibility = (columnAccessor: string) => {
        setHiddenColumns((prevHiddenColumns) => {
            if (prevHiddenColumns.includes(columnAccessor)) {
                return prevHiddenColumns.filter((col) => col !== columnAccessor);
            } else {
                return [...prevHiddenColumns, columnAccessor];
            }
        });
    };

    const columns: DataTableColumn<SubscriptionHistoryData>[] = [
        {
            accessor: 'actions',
            title: 'Actions',
            // eslint-disable-next-line react/display-name
            render: (rowData) => (
                <div className="flex items-center">
                    <Tippy content="Edit">
                        <button
                            type="button"
                            className="mr-4"
                            onClick={() => {
                                if (rowData && rowData.id) {
                                    const editUrl = `/SubscriptionModule/SubscriptionHistory/EditSubscriptionHistory/${rowData.id}`;
                                    navigate(editUrl); // Navigate to the edit page URL
                                }
                            }}
                        >
                            <IconEdit />
                        </button>
                    </Tippy>
                    <Tippy content="View Specific">
                        <button
                            type="button"
                            onClick={() => {
                                if (rowData && rowData.id) {
                                    const viewUrl = `/SubscriptionModule/SubscriptionHistory/ViewSpecificSubscriptionHistory/${rowData.id}`;
                                    navigate(viewUrl);
                                }
                            }}
                        >
                            <IconEye />
                        </button>
                    </Tippy>
                </div>
            ),
        },
        { accessor: 'id', title: 'ID', sortable: true, hidden: hiddenColumns.includes('id') },
        { accessor: 'planId', title: 'Plan Id', sortable: true, hidden: hiddenColumns.includes('planId') },
        { accessor: 'purchasedBy', title: 'Purchased By', sortable: true, hidden: hiddenColumns.includes('purchasedBy') },
        { accessor: 'purchasedByRolesId', title: 'Purchased By Roles Id', sortable: true, hidden: hiddenColumns.includes('purchasedByRolesId') },
        { accessor: 'driverId', title: 'Driver Id', sortable: true, hidden: hiddenColumns.includes('driverId') },
        { accessor: 'vehicleId', title: 'Vehicle Id', sortable: true, hidden: hiddenColumns.includes('vehicleId') },
        { accessor: 'planStatus', title: 'Plan Status', sortable: true, hidden: hiddenColumns.includes('planStatus') },
        { accessor: 'startDate', title: 'Start Date', sortable: true, hidden: hiddenColumns.includes('startDate') },
        { accessor: 'endDate', title: 'End Date', sortable: true, hidden: hiddenColumns.includes('endDate') },
        { accessor: 'walletHistoryId', title: 'Wallet History Id', sortable: true, hidden: hiddenColumns.includes('walletHistoryId') },
        { accessor: 'archive', title: 'Archive', sortable: true, hidden: hiddenColumns.includes('archive') },
    ];

    const sortedData = recordsData; // Replace this with your sorting logic

    const handleRowClick = (row: SubscriptionHistoryData) => {
        const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);
        let updatedSelectedRecords: SubscriptionHistoryData[] = [];

        if (isSelected) {
            updatedSelectedRecords = selectedRecords.filter((selectedRow) => selectedRow.id !== row.id);
        } else {
            updatedSelectedRecords = [...selectedRecords, row];
        }

        setSelectedRecords(updatedSelectedRecords);

        // Redirect to view specific page upon row click
        navigate(`/AdminModule/ChannelPartner/ViewSpecificChannelPartner/${row.id}`);
    };

    const [UpdateArchive, setUpdateArchive] = useState(false);
    // add update archive
    const handleAddUpdateArchive = (selectedArchive: any[], id: string) => {
        successAlert('Archive Updated Succesfully');
        // handle update archive
    };

    // Handle changes in the "Admin Actions" dropdown
    const handleSelectChange = (selectedOption: string) => {
        if (selectedOption === 'edit' && selectedRecords.length === 1) {
            const editUrl = `/SubscriptionModule/SubscriptionHistory/EditSubscriptionHistory/${selectedRecords[0].id}`;
            navigate(editUrl);
        } else if (selectedOption === 'updateArchive' && selectedRecords.length === 1) {
            setUpdateArchive(true);
        } else if (selectedOption === 'export' && selectedRecords.length === 1) {
            downloadExcel(selectedRecords, 'Subscription');
        } else if (selectedOption === 'removeSubscription' && selectedRecords.length === 1) {
            errorAlert('Subscription Removed');
        }
    };

    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const totalTabs = 4;

    const handleNext = () => {
        const nextIndex = Math.min(currentTabIndex + 1, totalTabs - 1);
        setCurrentTabIndex(nextIndex);
    };

    const handlePrevious = () => {
        const previousIndex = Math.max(currentTabIndex - 1, 0);
        setCurrentTabIndex(previousIndex);
    };

    const handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleProfileInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>): void => {
        const { name, value } = e.target;
        // Do whatever you want with the input value, like updating state
        console.log(`Field ${name} changed to ${value}`);
    };

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <Tab.Group selectedIndex={currentTabIndex} onChange={setCurrentTabIndex}>
                    <Tab.List className="mt-3 flex flex-wrap ">
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'text-secondary !outline-none before:!w-full' : ''
                                    } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                >
                                    <FaCarSide className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Vehicle Profile</span>
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
                                    <IoDocumentTextOutline className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Vehicle Documents</span>
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
                                    <MdHistory className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Subscription History</span>
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
                                    <span className="text-md font-bold">Audit Tables</span>
                                </button>
                            )}
                        </Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <div className="mt-5">
                                <div className="flex items-center gap-4 relative">
                                    <div className="flex items-center gap-5 ml-auto">
                                        <div
                                            className="cursor-pointer text-blue-500 text-1xl flex flex-row gap-3 items-center justify-center"
                                            onClick={() => {
                                                const viewUrl = `/SubscriptionModule/SubscriptionAmtDistribution/EditSubscriptionAmtDistribution/1`;

                                                navigate(viewUrl);
                                            }}
                                        >
                                            <h3>Edit</h3>
                                            <IconEdit />
                                        </div>
                                    </div>
                                </div>

                                <VehicleProfileModule details={formData} onInputChange={handleProfileInputChange} showStatus={true} viewSpecific={true} isEditPage={true} />

                                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                    <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                                        <label htmlFor="approvedAt" className="block mb-1">
                                            Approved At
                                        </label>

                                        <input
                                            name="approvedAt"
                                            type="text"
                                            id="approvedAt"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            // value={formData.approvedAt}
                                            value="02-04-2024"
                                            readOnly={viewSpecific}
                                        />
                                    </div>
                                    <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                                        <label htmlFor="approvedBy" className="block mb-1">
                                            Approved By
                                        </label>

                                        <input
                                            name="approvedBy"
                                            type="text"
                                            id="approvedBy"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            // value={formData.approvedBy}
                                            value="manu"
                                            readOnly={viewSpecific}
                                        />
                                    </div>
                                    <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                                        <label htmlFor="createdAt" className="block mb-1">
                                            Created At
                                        </label>

                                        <input
                                            name="createdAt"
                                            type="text"
                                            id="createdAt"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            // value={formData.createdAt}
                                            value="02-04-2024"
                                            readOnly={viewSpecific}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                    <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                                        <label htmlFor="createdBy" className="block mb-1">
                                            Created By
                                        </label>
                                        <input
                                            name="createdBy"
                                            type="text"
                                            id="createdBy"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            // value={formData.createdBy}
                                            value="rosh"
                                            readOnly={viewSpecific}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="mt-5 flex justify-end items-center gap-3">
                                <div
                                    className="cursor-pointer text-blue-500 text-1xl flex flex-row gap-3 items-center justify-center"
                                    onClick={() => {
                                        const viewUrl = `/BusinessModule/VehicleProfile/EditVehicleProfile/1`;
                                        navigate(viewUrl);
                                    }}
                                >
                                    <h3>Edit</h3>
                                    <IconEdit />
                                </div>
                            </div>
                            <VehicleDocLayout details={formData} onInputChange={handleInputChange} showStatus={true} viewSpecific={true} />
                        </Tab.Panel>

                        <Tab.Panel>
                            <div className="mt-5">
                                <SubscriptionHistoryReport />
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="mt-5">
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark">
                                    <h2>Audit logs History</h2>
                                </div>
                                <AuditLogsTable />
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h2>Updated History</h2>
                                </div>
                                <UpdatedHistoryTable />
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h2>Verification Hisory</h2>
                                </div>
                                <VerificationHistory />
                            </div>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
                <div className="flex justify-end mt-4">
                    <div className="flex gap-6 mt-4">
                        <button className="btn btn-primary" onClick={handlePrevious} disabled={currentTabIndex === 0}>
                            Previous
                        </button>
                        <button className="btn btn-primary" onClick={handleNext} disabled={currentTabIndex === totalTabs - 1}>
                            Next
                        </button>
                    </div>
                </div>
                <UpdateArchivePopUp event={UpdateArchive} closeModal={() => setUpdateArchive(false)} onSubmit={handleAddUpdateArchive} />
            </div>
        </>
    );
};

export default ViewSpecificVehicleProfile;
