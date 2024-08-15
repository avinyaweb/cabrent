import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DataTable, DataTableSortStatus, DataTableColumn } from 'mantine-datatable';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';
import Dropdown from '@/components/Dropdown';
import IconCaretDown from '@/components/Icon/IconCaretDown';
import IconEdit from '@/components/Icon/IconEdit';
import IconEye from '@/components/Icon/IconEye';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import 'rsuite/dist/rsuite-no-reset.min.css';
import toast from 'react-hot-toast';
import { successAlert } from '@/utils/Toast';
import UpdateArchivePopUp from '@/components/Models/UpdateArchivePopUp';
import { downloadExcel } from '@/utils/Excel';

interface AppOfferedMoneyData {
    id: string;
    bankName: string;
    UserName: string;
    amount: string;
    archive: string;
    userType: string;
    serviceProviderType: string;
    channelPartnerType: string;
    TravelAgency: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    dob: string;
    gender: string;
    fatherName: string;
    mobileNumber: string;
    altMobileNumber: string;
    country: string;
    state: string;
    city: string;
    dlNumber: string;
    dlValidity: string;
    policeVerNumber: string;
    batchNumber: string;
    batchValidity: string;
    isAvailable: string;
    badgeNumber: string;
    badgeValidity: string;
    emergencyContact: string;
    driverStatus: string;
    registerAddress: string;
    driverLocation: string;
    driverKey: string;
    rtoDisplayCard: string;
    StateandRTO: string;
    verificationHistory: string;
    permanentAddress: string;
    presentAddress: string;
    serviceCity: string;
    approvedBy: string;
    approvedAt: string;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
}

export const staticAppOfferedMoneyData = [
    {
        id: '1',
        bankName: 'SSB Bank',
        userId: 'User101',
        UserName: 'john_doe',
        userType: 'Driver',
        amount: '500',
        archive: 'APPROVED',
        serviceProviderType: 'TypeX',
        channelPartnerType: 'ChannelX',
        TravelAgency: 'AgencyY',
        firstName: 'Alice',
        middleName: 'Mary',
        lastName: 'Smith',
        email: 'alice.smith@example.com',
        dob: '1985-05-15',
        gender: 'Female',
        fatherName: 'John Smith',
        mobileNumber: '9876543210',
        altMobileNumber: '1234567890',
        country: 'Canada',
        state: 'Ontario',
        city: 'Toronto',
        dlNumber: 'DL987654',
        dlValidity: '2026-06-30',
        policeVerNumber: 'PV987',
        batchNumber: 'B456',
        batchValidity: '2024-12-31',
        password: 'securePassword123',
        isAvailable: 'true',
        badgeNumber: 'B1234',
        badgeValidity: '2024-12-31',
        emergencyContact: '9876543210',
        driverStatus: 'Active',
        registerAddress: '789 Maple St, City, Country',
        driverLocation: 'true',
        driverKey: 'Key123',
        rtoDisplayCard: 'RTO123',
        StateandRTO: 'Ontario RTO',
        verificationHistory: 'Verified on 2024-05-01',
        permanentAddress: '456 Oak St, City, Country',
        presentAddress: '123 Elm St, City, Country',
        serviceCity: 'Vancouver',
        approvedBy: 'ManagerABC',
        approvedAt: '2024-01-07T10:15:00Z',
        createdBy: 'Admin456',
        createdAt: '2024-01-06T14:00:00Z',
        updatedBy: 'Admin456',
        updatedAt: '2024-01-07T11:30:00Z',
    },
    {
        id: '2',
        bankName: 'HDCF Bank',
        userId: 'User202',
        userType: 'Driver',
        UserName: 'bob',
        amount: '700',
        archive: 'PENDING',
        serviceProviderType: 'TypeY',
        channelPartnerType: 'ChannelY',
        TravelAgency: 'AgencyZ',
        firstName: 'Bob',
        middleName: 'John',
        lastName: 'Doe',
        email: 'bob.doe@example.com',
        dob: '1990-08-20',
        gender: 'Male',
        fatherName: 'Michael Doe',
        mobileNumber: '1234567890',
        altMobileNumber: '9876543210',
        country: 'USA',
        state: 'California',
        city: 'Los Angeles',
        dlNumber: 'DL654321',
        dlValidity: '2025-08-31',
        policeVerNumber: 'PV654',
        batchNumber: 'B789',
        batchValidity: '2024-12-31',
        password: 'strongPassword456',
        isAvailable: 'true',
        badgeNumber: 'B5678',
        badgeValidity: '2024-12-31',
        emergencyContact: '1234567890',
        driverStatus: 'Active',
        registerAddress: '456 Pine St, City, Country',
        driverLocation: 'true',
        driverKey: 'Key456',
        rtoDisplayCard: 'RTO456',
        StateandRTO: 'California RTO',
        verificationHistory: 'Verified on 2024-05-15',
        permanentAddress: '789 Cedar St, City, Country',
        presentAddress: '234 Walnut St, City, Country',
        serviceCity: 'San Francisco',
        approvedBy: 'ManagerABC',
        approvedAt: '2024-01-07T10:15:00Z',
        createdBy: 'Admin456',
        createdAt: '2024-01-06T14:00:00Z',
        updatedBy: 'Admin456',
        updatedAt: '2024-01-07T11:30:00Z',
    },
];

const ViewAppOfferedMoney = () => {
    const navigate = useNavigate();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

    const [modal3, setModal3] = useState(false);
    const [selectedDateRange, setSelectedDateRange] = useState<DateRange | null>(null);
    const [ChannelPartnerData, setChannelPartnerData] = useState<AppOfferedMoneyData[]>(staticAppOfferedMoneyData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<AppOfferedMoneyData[]>([]);
    const [recordsData, setRecordsData] = useState<AppOfferedMoneyData[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<AppOfferedMoneyData[]>([]);
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

    // Dynamic Data--Will use in Future
    // useEffect(() => {
    //     dispatch(setPageTitle('View App. Offered Money'));

    //     const fetchChannelPartnerData = async () => {
    //         try {
    //             const { data } = await getChannelPartnerData();
    //             if (data?.ChannelPartners) {
    //                 // pk-note: ask backend developer to change the accessor _id:id, remove the following later
    //                 const newData = data.ChannelPartners.map(({ _id: id, ...rest }) => ({
    //                     id,
    //                     ...rest,
    //                 }));
    //                 //setChannelPartnerData(newData);
    //                 setChannelPartnerData(staticAppOfferedMoneyData);
    //             }
    //         } catch (error: any) {
    //             console.error('Error fetching application offered money data:', error.message);
    //         }
    //     };
    //     fetchChannelPartnerData();
    // }, [dispatch]);

    useEffect(() => {
        if (ChannelPartnerData.length > 0) {
            const sortedData = ChannelPartnerData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof AppOfferedMoneyData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [ChannelPartnerData, sortStatus, pageSize]);

    const handleDateRangeChange = (range: DateRange | null) => {
        setSelectedDateRange(range);
    };

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const {
                id = '',
                bankName = '',
                UserName = '',
                amount = '',
                archive = '',
                userType = '',
                serviceProviderType = '',
                channelPartnerType = '',
                TravelAgency = '',
                firstName = '',
                middleName = '',
                lastName = '',
                email = '',
                dob = '',
                gender = '',
                fatherName = '',
                mobileNumber = '',
                altMobileNumber = '',
                country = '',
                state = '',
                city = '',
                dlNumber = '',
                dlValidity = '',
                policeVerNumber = '',
                batchNumber = '',
                batchValidity = '',
                isAvailable = '',
                badgeNumber = '',
                badgeValidity = '',
                emergencyContact = '',
                driverStatus = '',
                registerAddress = '',
                driverLocation = '',
                driverKey = '',
                rtoDisplayCard = '',
                StateandRTO = '',
                verificationHistory = '',
                permanentAddress = '',
                presentAddress = '',
                serviceCity = '',
                approvedBy = '',
                approvedAt = '',
                createdBy = '',
                createdAt = '',
                updatedBy = '',
                updatedAt = '',
            } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return (
                id?.toLowerCase().includes(searchString) ||
                bankName?.toLowerCase().includes(searchString) ||
                UserName?.toLowerCase().includes(searchString) ||
                amount?.toLowerCase().includes(searchString) ||
                archive?.toLowerCase().includes(searchString) ||
                // New fields included in the search filter
                userType?.toLowerCase().includes(searchString) ||
                serviceProviderType?.toLowerCase().includes(searchString) ||
                channelPartnerType?.toLowerCase().includes(searchString) ||
                TravelAgency?.toLowerCase().includes(searchString) ||
                firstName?.toLowerCase().includes(searchString) ||
                middleName?.toLowerCase().includes(searchString) ||
                lastName?.toLowerCase().includes(searchString) ||
                email?.toLowerCase().includes(searchString) ||
                dob?.toLowerCase().includes(searchString) ||
                gender?.toLowerCase().includes(searchString) ||
                fatherName?.toLowerCase().includes(searchString) ||
                mobileNumber?.toLowerCase().includes(searchString) ||
                altMobileNumber?.toLowerCase().includes(searchString) ||
                country?.toLowerCase().includes(searchString) ||
                state?.toLowerCase().includes(searchString) ||
                city?.toLowerCase().includes(searchString) ||
                dlNumber?.toLowerCase().includes(searchString) ||
                dlValidity?.toLowerCase().includes(searchString) ||
                policeVerNumber?.toLowerCase().includes(searchString) ||
                batchNumber?.toLowerCase().includes(searchString) ||
                batchValidity?.toLowerCase().includes(searchString) ||
                isAvailable?.toString().toLowerCase().includes(searchString) ||
                badgeNumber?.toLowerCase().includes(searchString) ||
                badgeValidity?.toLowerCase().includes(searchString) ||
                emergencyContact?.toLowerCase().includes(searchString) ||
                driverStatus?.toLowerCase().includes(searchString) ||
                registerAddress?.toLowerCase().includes(searchString) ||
                driverLocation?.toString().toLowerCase().includes(searchString) ||
                driverKey?.toLowerCase().includes(searchString) ||
                rtoDisplayCard?.toLowerCase().includes(searchString) ||
                StateandRTO?.toLowerCase().includes(searchString) ||
                verificationHistory?.toLowerCase().includes(searchString) ||
                permanentAddress?.toLowerCase().includes(searchString) ||
                presentAddress?.toLowerCase().includes(searchString) ||
                approvedBy?.toLowerCase().includes(searchString) ||
                approvedAt?.toLocaleLowerCase().includes(searchString) ||
                createdBy?.toLowerCase().includes(searchString) ||
                createdAt?.toLowerCase().includes(searchString) ||
                updatedBy?.toLowerCase().includes(searchString) ||
                updatedAt?.toLowerCase().includes(searchString) ||
                serviceCity?.toLowerCase().includes(searchString)
            );
        });

        setRecordsData(filteredData.slice(0, pageSize));
    }, [search, initialRecords, pageSize]);

    // State to manage hidden columns
    const [hiddenColumns, setHiddenColumns] = useState<string[]>(['id']);

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

    const columns: DataTableColumn<AppOfferedMoneyData>[] = [
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
                                if (rowData?.id) {
                                    const editUrl = `/PromotionModule/AppOfferedMoney/EditAppOfferedMoney/1`;
                                    navigate(editUrl);
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
                                if (rowData?.id) {
                                    const viewUrl = `/PromotionModule/AppOfferedMoney/ViewSpecificAppOfferedMoney/1`;
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
        { accessor: 'bankName', title: 'Bank Name', sortable: true, hidden: hiddenColumns.includes('bankName') },
        { accessor: 'UserName', title: 'User Name', sortable: true, hidden: hiddenColumns.includes('UserName') },
        { accessor: 'userId', title: 'User Name', sortable: true, hidden: hiddenColumns.includes('userId') },
        { accessor: 'amount', title: 'Amount', sortable: true, hidden: hiddenColumns.includes('amount') },
        { accessor: 'archive', title: 'Update Profile Status', sortable: true, hidden: hiddenColumns.includes('archive') },
        { accessor: 'userType', title: 'User Type', sortable: true, hidden: hiddenColumns.includes('userType') },
        { accessor: 'serviceProviderType', title: 'Service Provider Type', sortable: true, hidden: hiddenColumns.includes('serviceProviderType') },
        { accessor: 'channelPartnerType', title: 'Channel Partner Type', sortable: true, hidden: hiddenColumns.includes('channelPartnerType') },
        { accessor: 'TravelAgency', title: 'Travel Agency', sortable: true, hidden: hiddenColumns.includes('TravelAgency') },
        { accessor: 'firstName', title: 'First Name', sortable: true, hidden: hiddenColumns.includes('firstName') },
        { accessor: 'middleName', title: 'Middle Name', sortable: true, hidden: hiddenColumns.includes('middleName') },
        { accessor: 'lastName', title: 'Last Name', sortable: true, hidden: hiddenColumns.includes('lastName') },
        { accessor: 'email', title: 'Email', sortable: true, hidden: hiddenColumns.includes('email') },
        { accessor: 'dob', title: 'Date of Birth', sortable: true, hidden: hiddenColumns.includes('dob') },
        { accessor: 'gender', title: 'Gender', sortable: true, hidden: hiddenColumns.includes('gender') },
        { accessor: 'fatherName', title: "Father's Name", sortable: true, hidden: hiddenColumns.includes('fatherName') },
        { accessor: 'mobileNumber', title: 'Mobile Number', sortable: true, hidden: hiddenColumns.includes('mobileNumber') },
        { accessor: 'altMobileNumber', title: 'Alternate Mobile Number', sortable: true, hidden: hiddenColumns.includes('altMobileNumber') },
        { accessor: 'country', title: 'Country', sortable: true, hidden: hiddenColumns.includes('country') },
        { accessor: 'state', title: 'State', sortable: true, hidden: hiddenColumns.includes('state') },
        { accessor: 'city', title: 'City', sortable: true, hidden: hiddenColumns.includes('city') },
        { accessor: 'dlNumber', title: "Driver's License Number", sortable: true, hidden: hiddenColumns.includes('dlNumber') },
        { accessor: 'dlValidity', title: "Driver's License Validity", sortable: true, hidden: hiddenColumns.includes('dlValidity') },
        { accessor: 'policeVerNumber', title: 'Police Verification Number', sortable: true, hidden: hiddenColumns.includes('policeVerNumber') },
        { accessor: 'batchNumber', title: 'Batch Number', sortable: true, hidden: hiddenColumns.includes('batchNumber') },
        { accessor: 'batchValidity', title: 'Batch Validity', sortable: true, hidden: hiddenColumns.includes('batchValidity') },

        { accessor: 'isAvailable', title: 'Is Available', sortable: true, hidden: hiddenColumns.includes('isAvailable') },
        { accessor: 'badgeNumber', title: 'Badge Number', sortable: true, hidden: hiddenColumns.includes('badgeNumber') },
        { accessor: 'badgeValidity', title: 'Badge Validity', sortable: true, hidden: hiddenColumns.includes('badgeValidity') },
        { accessor: 'emergencyContact', title: 'Emergency Contact', sortable: true, hidden: hiddenColumns.includes('emergencyContact') },
        { accessor: 'driverStatus', title: 'Driver Status', sortable: true, hidden: hiddenColumns.includes('driverStatus') },
        { accessor: 'registerAddress', title: 'Register Address', sortable: true, hidden: hiddenColumns.includes('registerAddress') },
        { accessor: 'driverLocation', title: 'Driver Location', sortable: true, hidden: hiddenColumns.includes('driverLocation') },
        { accessor: 'driverKey', title: 'Driver Key', sortable: true, hidden: hiddenColumns.includes('driverKey') },
        { accessor: 'rtoDisplayCard', title: 'RTO Display Card', sortable: true, hidden: hiddenColumns.includes('rtoDisplayCard') },
        { accessor: 'StateandRTO', title: 'State and RTO', sortable: true, hidden: hiddenColumns.includes('StateandRTO') },
        { accessor: 'verificationHistory', title: 'Verification History', sortable: true, hidden: hiddenColumns.includes('verificationHistory') },
        { accessor: 'permanentAddress', title: 'Permanent Address', sortable: true, hidden: hiddenColumns.includes('permanentAddress') },
        { accessor: 'presentAddress', title: 'Present Address', sortable: true, hidden: hiddenColumns.includes('presentAddress') },
        { accessor: 'serviceCity', title: 'Service City', sortable: true, hidden: hiddenColumns.includes('serviceCity') },
        { accessor: 'approvedBy', title: 'Approved By', sortable: true, hidden: hiddenColumns.includes('approvedBy') },
        { accessor: 'approvedAt', title: 'Approved At', sortable: true, hidden: hiddenColumns.includes('approvedAt') },
        { accessor: 'createdBy', title: 'Created By', sortable: true, hidden: hiddenColumns.includes('createdBy') },
        { accessor: 'createdAt', title: 'Created At', sortable: true, hidden: hiddenColumns.includes('createdAt') },
        { accessor: 'updatedBy', title: 'Updated By', sortable: true, hidden: hiddenColumns.includes('updatedBy') },
        { accessor: 'updatedAt', title: 'Updated At', sortable: true, hidden: hiddenColumns.includes('updatedAt') },
    ];

    const sortedData = recordsData; // Replace this with your sorting logic

    // add update archive
    const handleAddUpdateArchive = (selectedArchive: any[], id: string) => {
        successAlert('Archive Updated Succesfully');
        // handle update archive
    };

    // Handle changes in the "Admin Actions" dropdown
    const handleSelectChange = (selectedOption: string) => {
        if (selectedOption === 'edit' && selectedRecords.length === 1) {
            const editUrl = `/TransactionModule/AppOfferedMoney/EditAppOfferedMoney/${selectedRecords[0].id}`;
            navigate(editUrl);
        } else if (selectedOption === 'updateArchive' && selectedRecords.length >= 1) {
            setModal3(true);
        } else if (selectedOption === 'export' && selectedRecords.length >= 1) {
            downloadExcel(selectedRecords, 'App offered money');
        } else {
            toast.error('Please Select from Table.');
        }
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
            label: 'App Offered Money',
            to: '/PromotionModule/AppOfferedMoney/ViewAppOfferedMoney',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '' ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                    {/* <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <Link to="/TransactionModule/AppOfferedMoney/CreateAppOfferedMoney" className="btn btn-primary block w-full sm:inline-block text-center mt-0">
                            Create App. Offered Money
                        </Link>
                    </div> */}

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

                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0 z-50">
                        <DateRangePicker placeholder="Select Date Range" onChange={handleDateRangeChange} className="cursor-pointer w-full" />
                    </div>

                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <input type="text" className="form-input w-full " placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>

                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <select id="ctnSelect1" className="form-select text-white-dark" onChange={(e) => handleSelectChange(e.target.value)} required>
                            <option value="">Action Dropdown</option>
                            <option value="edit">Edit</option>
                            <option value="updateArchive">Update Profile Status</option>
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
                <UpdateArchivePopUp event={modal3} closeModal={() => setModal3(false)} onSubmit={handleAddUpdateArchive} />
            </div>
        </>
    );
};

export default ViewAppOfferedMoney;
