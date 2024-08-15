import React, { useState, ChangeEvent, useEffect, Fragment } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Tab } from '@headlessui/react';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import ChannelPartnerAPIConfigModule from './ChannelPartnerAPIConfigModule';
import { staticChannelPartnerAPIConfigData } from './ViewChannelPartnerAPIConfig';
import { DataTable, DataTableSortStatus, DataTableColumn } from 'mantine-datatable';
import { setPageTitle } from '@/store/themeConfigSlice';
import { getChannelPartnerData } from '@/services/ChannelPartnerService';
import { IRootState } from '@/store';
import Dropdown from '@/components/Dropdown';
import IconCaretDown from '@/components/Icon/IconCaretDown';
import IconEdit from '@/components/Icon/IconEdit';
import IconEye from '@/components/Icon/IconEye';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';
import AuditLogsTable from '@/components/CommonTables/AuditLogsTable';
import UpdatedHistoryTable from '@/components/CommonTables/UpdatedHistoryTable';
import VerificationHistory from '@/components/CommonTables/VerificationHistory';
import { staticChannelPData } from '../ChannelPartner/ViewChannelPartner';

interface FormValues {
    id: string;
    cpAPIID: string;
    cpID: string;
    maxCalls: string;
    totalCalls: string;
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

interface ChannelPartnerData {
    id: string;
    bussinessName: string;
    channelPartnerType: string;
    mobile: string;
    firstName: string;
    email: string;
    archive: string;
    createdAt: string;
    updatedAt: string;
}

const ViewSpecificChannelPartnerAPIConfig: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { channelPartnerAPIConfigId } = useParams();
    const initialFormValues: FormValues = {
        id: '',
        cpAPIID: '',
        cpID: '',
        maxCalls: '',
        totalCalls: '',
        archive: '',
        approvedAt: '',
        approvedBy: '',
        createdAt: '',
        createdBy: '',
        updatedHistory: [], // Initialize as an empty array
    };

    const [formData, setFormData] = useState<FormValues>(initialFormValues);
    const [modal1, setModal1] = useState(false);

    useEffect(() => {
        // Find the specific data based on the serviceProviderId
        const specificData: any = staticChannelPartnerAPIConfigData.find((data) => data.id === channelPartnerAPIConfigId);

        // If specificData is found, update the formData state with its values
        if (specificData) {
            setFormData(specificData); // Set the entire form data
        }
    }, [channelPartnerAPIConfigId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
            label: 'Channel Partner API Config',
            to: '/AdminModule/ChannelPartnerAPIConfig/ViewChannelPartnerAPIConfig',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/AdminModule/ChannelPartnerAPIConfig/ViewChannelPartnerAPIConfig' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'View Channel Partner API Config',
            to: '',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `` ? 'text-blue-600' : ''
            }`,
        },
    ];

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [ChannelPartnerData, setChannelPartnerData] = useState<ChannelPartnerData[]>(staticChannelPData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<ChannelPartnerData[]>([]);
    const [recordsData, setRecordsData] = useState<ChannelPartnerData[]>([]);

    const [selectedRecords, setSelectedRecords] = useState<ChannelPartnerData[]>([]);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    // Dynamic Data
    useEffect(() => {
        dispatch(setPageTitle('View Channel Partner'));

        const fetchChannelPartnerData = async () => {
            try {
                const { data } = await getChannelPartnerData();
                if (data?.ChannelPartners) {
                    // pk-note: ask backend developer to change the accessor _id:id, remove the following later
                    const newData = data.ChannelPartners.map(({ _id: id, ...rest }: { _id: string; [key: string]: any }) => ({
                        id,
                        ...rest,
                    }));
                    setChannelPartnerData(newData);
                }
            } catch (error: any) {
                console.error('Error fetching admin data:', error.message);
            }
        };
        fetchChannelPartnerData();
    }, [dispatch]);

    useEffect(() => {
        if (ChannelPartnerData.length > 0) {
            const sortedData = ChannelPartnerData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof ChannelPartnerData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [ChannelPartnerData, sortStatus, pageSize]);

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const { id = '', bussinessName = '', channelPartnerType = '', mobile = '', firstName = '', email = '', archive = '', createdAt = '', updatedAt = '' } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return (
                id?.toLowerCase().includes(searchString) ||
                bussinessName?.toLowerCase().includes(searchString) ||
                channelPartnerType?.toLowerCase().includes(searchString) ||
                mobile?.toLowerCase().includes(searchString) ||
                firstName?.toLowerCase().includes(searchString) ||
                email?.toLowerCase().includes(searchString) ||
                archive?.toLowerCase().includes(searchString) ||
                createdAt?.toLowerCase().includes(searchString) ||
                updatedAt?.toLowerCase().includes(searchString)
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

    const columns: DataTableColumn<ChannelPartnerData>[] = [
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
                                    const editUrl = `/AdminModule/ChannelPartner/EditChannelPartner/${rowData.id}`;
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
                                    const viewUrl = `/AdminModule/ChannelPartner/ViewSpecificChannelPartner/${rowData.id}`;
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
        { accessor: 'firstName', title: 'First Name', sortable: true, hidden: hiddenColumns.includes('firstName') },
        { accessor: 'middleName', title: 'Middle Name', sortable: true, hidden: hiddenColumns.includes('middleName') },
        { accessor: 'lastName', title: 'Last Name', sortable: true, hidden: hiddenColumns.includes('lastName') },
        { accessor: 'dob', title: 'DOB', sortable: true, hidden: hiddenColumns.includes('dob') },
        { accessor: 'email', title: 'Email', sortable: true, hidden: hiddenColumns.includes('email') },
        { accessor: 'gender', title: 'Gender', sortable: true, hidden: hiddenColumns.includes('gender') },
        { accessor: 'fk_roletype', title: 'Role Type', sortable: true, hidden: hiddenColumns.includes('fk_roletype') },
        { accessor: 'bussinessName', title: 'Bussiness Name', sortable: true, hidden: hiddenColumns.includes('bussinessName') },
        { accessor: 'channelPartnerType', title: 'Channel Partner Type', sortable: true, hidden: hiddenColumns.includes('channelPartnerType') },
        { accessor: 'companyRegistrationNumber', title: 'Company Registration Number', sortable: true, hidden: hiddenColumns.includes('companyRegistrationNumber') },
        { accessor: 'totalSpend', title: 'Total Spend', sortable: true, hidden: hiddenColumns.includes('totalSpend') },
        { accessor: 'totalEarned', title: 'Total Earned', sortable: true, hidden: hiddenColumns.includes('totalEarned') },
        { accessor: 'accountHolderName', title: 'Account Holder Name', sortable: true, hidden: hiddenColumns.includes('accountHolderName') },
        { accessor: 'accountNumber', title: 'Account Number', sortable: true, hidden: hiddenColumns.includes('accountNumber') },
        { accessor: 'branchName', title: 'Branch Name', sortable: true, hidden: hiddenColumns.includes('branchName') },
        { accessor: 'ifscCode', title: 'IFSC Code', sortable: true, hidden: hiddenColumns.includes('ifscCode') },
        { accessor: 'accountType', title: 'Account Type', sortable: true, hidden: hiddenColumns.includes('accountType') },
        { accessor: 'mobile', title: 'Mobile', sortable: true, hidden: hiddenColumns.includes('mobile') },
        { accessor: 'altMobile', title: 'Alt Mobile', sortable: true, hidden: hiddenColumns.includes('altMobile') },
        { accessor: 'fk_country', title: 'Country', sortable: true, hidden: hiddenColumns.includes('fk_country') },
        { accessor: 'fk_stateOrProvinces', title: 'State', sortable: true, hidden: hiddenColumns.includes('fk_stateOrProvinces') },
        { accessor: 'fk_city', title: 'City', sortable: true, hidden: hiddenColumns.includes('fk_city') },
        { accessor: 'aadhar', title: 'Aadhar', sortable: true, hidden: hiddenColumns.includes('aadhar') },
        { accessor: 'registrationOfficeAddress', title: 'R.O Address', sortable: true, hidden: hiddenColumns.includes('registrationOfficeAddress') },
        { accessor: 'communicationOfficeAddress', title: 'C.O Address', sortable: true, hidden: hiddenColumns.includes('communicationOfficeAddress') },
        { accessor: 'subscriptionCommisionAmountType', title: 'S.C Amount Type', sortable: true, hidden: hiddenColumns.includes('subscriptionCommisionAmountType') },
        { accessor: 'subscriptionCommisionAmountValue', title: 'S.C Amount Value', sortable: true, hidden: hiddenColumns.includes('subscriptionCommisionAmountValue') },
        { accessor: 'tripsCommisionAmountType', title: 'T.C Amount Type', sortable: true, hidden: hiddenColumns.includes('tripsCommisionAmountType') },
        { accessor: 'tripsCommisionAmountValue', title: 'T.C Amount Value', sortable: true, hidden: hiddenColumns.includes('tripsCommisionAmountValue') },
        { accessor: 'archive', title: 'Archive', sortable: true, hidden: hiddenColumns.includes('archive') },
        { accessor: 'createdAt', title: 'CreatedAt', sortable: true, hidden: hiddenColumns.includes('createdAt') },
        { accessor: 'updatedAt', title: 'UpdatedAt', sortable: true, hidden: hiddenColumns.includes('updatedAt') },
    ];

    const sortedData = recordsData; // Replace this with your sorting logic

    const handleRowClick = (row: ChannelPartnerData) => {
        const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);

        let updatedSelectedRecords: ChannelPartnerData[] = [];

        if (isSelected) {
            updatedSelectedRecords = selectedRecords.filter((selectedRow) => selectedRow.id !== row.id);
        } else {
            updatedSelectedRecords = [...selectedRecords, row];
        }

        setSelectedRecords(updatedSelectedRecords);

        // Redirect to view specific page upon row click
        navigate(`/AdminModule/ChannelPartner/ViewSpecificChannelPartner/${row.id}`);
    };

    // Handle changes in the "Admin Actions" dropdown
    const handleSelectChange = (selectedOption: string) => {
        if (selectedOption === 'edit' && selectedRecords.length === 1) {
            const editUrl = `/AdminModule/ChannelPartner/EditChannelPartner/${selectedRecords[0].id}`;
            navigate(editUrl);
        }
    };

    const viewSpecific = true;

    // handling next & previous Buttons for tabs.
    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const totalTabs = 3;

    const handleNext = () => {
        const nextIndex = Math.min(currentTabIndex + 1, totalTabs - 1);
        setCurrentTabIndex(nextIndex);
    };

    const handlePrevious = () => {
        const previousIndex = Math.max(currentTabIndex - 1, 0);
        setCurrentTabIndex(previousIndex);
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
                                    <span className="text-md font-bold">View CH Partner API Config</span>
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
                                    <span className="text-md font-bold">Channel Partner List</span>
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
                    <Tab.Panels>
                        <Tab.Panel>
                            <div className="mt-5">
                                <div className="flex items-center ml-auto justify-end mb-2">
                                    <div
                                        className="cursor-pointer text-blue-500 text-1xl flex flex-row gap-3 items-center justify-center  rounded-md p-1"
                                        onClick={() => {
                                            const viewUrl = `/AdminModule/ChannelPartnerAPIConfig/EditChannelPartnerAPIConfig/1`;
                                            navigate(viewUrl);
                                        }}
                                    >
                                        <h3>Edit</h3>
                                        <IconEdit />
                                    </div>
                                </div>
                                <ChannelPartnerAPIConfigModule details={formData} onInputChange={handleInputChange} showStatus={true} viewSpecific={viewSpecific} />
                                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                    <div className="lg:w-1/3">
                                        <label htmlFor="approvedAt" className="block mb-1 text-md font-bold">
                                            Approved At
                                        </label>
                                        <input
                                            name="approvedAt"
                                            type="text"
                                            id="approvedAt"
                                            placeholder="Enter Approved At"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            readOnly={viewSpecific}
                                            value={formData.approvedAt}
                                        />
                                    </div>
                                    <div className="lg:w-1/3">
                                        <label htmlFor="approvedBy" className="block mb-1 text-md font-bold">
                                            Approved By
                                        </label>
                                        <input
                                            name="approvedBy"
                                            type="text"
                                            id="approvedBy"
                                            placeholder="Enter Approved By"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            readOnly={viewSpecific}
                                            value={formData.approvedBy}
                                        />
                                    </div>
                                    <div className="lg:w-1/3">
                                        <label htmlFor="createdAt" className="block mb-1 text-md font-bold">
                                            Created At
                                        </label>
                                        <input
                                            name="createdAt"
                                            type="text"
                                            id="createdAt"
                                            placeholder="Enter Created At"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            readOnly={viewSpecific}
                                            value={formData.createdAt}
                                        />
                                    </div>
                                    <div className="lg:w-1/3">
                                        <label htmlFor="createdBy" className="block mb-1 text-md font-bold">
                                            Created By
                                        </label>
                                        <input
                                            name="createdBy"
                                            type="text"
                                            id="createdBy"
                                            placeholder="Enter Created By"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            readOnly={viewSpecific}
                                            value={formData.createdBy}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="mt-5">
                                <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0 z-50">
                                        <DateRangePicker placeholder="Select Date Range" className="cursor-pointer" />
                                    </div>

                                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                                        <div className="dropdown">
                                            {/* Dropdown content */}

                                            <Dropdown
                                                placement={`${isRtl ? 'bottom-end' : 'bottom-start'}`}
                                                btnClassName="w-full !flex items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                                                button={
                                                    <>
                                                        <span className="ltr:mr-1 rtl:ml-1">Columns</span>
                                                        <div className="flex items-center ml-auto">
                                                            <IconCaretDown className="w-5 h-5" />
                                                        </div>
                                                    </>
                                                }
                                            >
                                                <ul className="!min-w-[300px] max-h-60 overflow-y-auto">
                                                    {' '}
                                                    {columns.map((col, index) => (
                                                        <li
                                                            key={index}
                                                            className="flex flex-col"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                            }}
                                                        >
                                                            <div className="flex items-center px-4 py-1">
                                                                <label className="cursor-pointer mb-0">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={!hiddenColumns.includes(col.accessor)}
                                                                        className="form-checkbox"
                                                                        defaultValue={col.accessor}
                                                                        onChange={() => toggleColumnVisibility(col.accessor)}
                                                                    />
                                                                    <span className="ltr:ml-2 rtl:mr-2">{col.title || col.accessor}</span>
                                                                </label>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </Dropdown>
                                        </div>
                                    </div>

                                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                                        <input type="text" className="form-input w-full" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                                    </div>

                                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                                        <select id="ctnSelect1" className="form-select text-white-dark" onChange={(e) => handleSelectChange(e.target.value)} required>
                                            <option value="">Action Dropdown</option>
                                            <option value="edit">Edit</option>
                                            <option value="updateArchive">Update Archive</option>
                                            <option value="export">Export</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="datatables mt-6">
                                    <DataTable
                                        className="whitespace-nowrap table-hover"
                                        records={sortedData}
                                        columns={columns}
                                        highlightOnHover
                                        totalRecords={ChannelPartnerData.length}
                                        recordsPerPage={pageSize}
                                        page={page}
                                        onPageChange={(p) => setPage(p)}
                                        recordsPerPageOptions={PAGE_SIZES}
                                        onRecordsPerPageChange={setPageSize}
                                        sortStatus={sortStatus}
                                        onSortStatusChange={setSortStatus}
                                        selectedRecords={selectedRecords}
                                        onSelectedRecordsChange={(selectedRows) => setSelectedRecords(selectedRows)}
                                        minHeight={200}
                                        paginationText={({ from, to, totalRecords }) => `Showing ${from} to ${to} of ${totalRecords} entries`}
                                        // onRowClick={(row) => handleRowClick(row)}
                                    />
                                </div>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="mt-5">
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h2 className="mb-2">Updated Hisory</h2>
                                </div>
                                <UpdatedHistoryTable />
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h2 className="mb-2">Logs File</h2>
                                </div>
                                <AuditLogsTable />
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h2 className="mb-2">VerificationHisory</h2>
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
            </div>
        </>
    );
};

export default ViewSpecificChannelPartnerAPIConfig;
