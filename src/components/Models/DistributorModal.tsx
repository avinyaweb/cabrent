// import { getDistributorData } from '@/services/ChannelPartnerService';
import { IRootState } from '@/store';
import { setPageTitle } from '@/store/themeConfigSlice';
import { Dialog, Transition } from '@headlessui/react';
import { DataTable, DataTableColumn, DataTableSortStatus } from 'mantine-datatable';
import { useState, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import IconCaretDown from '../Icon/IconCaretDown';
import Dropdown from '../Dropdown';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import 'rsuite/dist/rsuite-no-reset.min.css';

interface DistributorData {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    dob: string;
    gender: string;
    email: string;
    fk_roletype: string;
    bussinessName: string;
    distributorType: string;
    password: string;
    companyRegistrationNumber: string;
    totalSpend: string;
    totalEarned: string;
    accountHolderName: string;
    accountNumber: string;
    branchName: string;
    ifscCode: string;
    accountType: string;
    channelPartnerApis: string;
    profileImage: string;
    mobile: string;
    altMobile: string;
    fk_country: string;
    fk_stateOrProvinces: string;
    fk_city: string;
    aadhar: string;
    registrationOfficeAddress: string;
    communicationOfficeAddress: string;
    approvedBy: string;
    approvedTime: string;
    subscriptionCommisionAmountType: string;
    subscriptionCommisionAmountValue: string;
    tripsCommisionAmountType: string;
    tripsCommisionAmountValue: string;
    verificationHistory: string[];
    archive: string;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
}

interface DistributorModalProps {
    event: any;
    closeModal: () => void;
    onAddChannelPartner: (data: string[], userID: string) => void; // Updated function signature
}
const staticDistributorData: DistributorData[] = [
    {
        id: '1',
        firstName: 'Michael',
        middleName: 'Michael',
        lastName: 'Clark',
        dob: '1993-02-10',
        gender: 'MALE',
        email: 'michael.clark@example.com',
        fk_roletype: 'channel_partner',
        bussinessName: 'LMN Solutions',
        distributorType: 'MANAGER',
        password: 'password789',
        companyRegistrationNumber: '5678901234',
        totalSpend: '$1235.02',
        totalEarned: '$5000.00',
        accountHolderName: 'Michael Clark',
        accountNumber: '567890123',
        branchName: 'Chicago Branch',
        ifscCode: 'IFSC789',
        accountType: 'SAVINGS',
        channelPartnerApis: 'ABCDEFG1234',
        profileImage: 'profile_image_url3.jpg',
        mobile: '999-999-9999',
        altMobile: '999-999-9999',
        fk_country: 'USA',
        fk_stateOrProvinces: 'Illinois',
        fk_city: 'Chicago',
        aadhar: '567890123456',
        registrationOfficeAddress: '101 Pine St, Suite 301',
        communicationOfficeAddress: '202 Elm St, Floor 2',
        approvedBy: '3', // Updated to string type
        approvedTime: '2024-04-03T08:00:00Z',
        subscriptionCommisionAmountType: 'Percentage',
        subscriptionCommisionAmountValue: '8', // Updated to string type
        tripsCommisionAmountType: 'Fixed',
        tripsCommisionAmountValue: '150', // Updated to string type
        verificationHistory: [],
        archive: 'PENDING',
        createdBy: '3', // Updated to string type
        updatedBy: '3', // Updated to string type
        createdAt: '2024-04-03T08:00:00Z',
        updatedAt: '2024-04-03T08:00:00Z',
    },
    {
        id: '2',
        firstName: 'Jane',
        middleName: 'Elizabeth',
        lastName: 'Johnson',
        dob: '1985-08-20',
        gender: 'FEMALE',
        email: 'jane.johnson@example.com',
        fk_roletype: 'channel_partner',
        bussinessName: 'XYZ Corporation',
        distributorType: 'PROPIETOR',
        password: 'password456',
        companyRegistrationNumber: '0987654321',
        totalSpend: '$3214.07',
        totalEarned: '$5000.00',
        accountHolderName: 'Jane Johnson',
        accountNumber: '987654321',
        branchName: 'Los Angeles Branch',
        ifscCode: 'IFSC456',
        accountType: 'CURRENT',
        channelPartnerApis: 'ABCDEFG1234',
        profileImage: 'profile_image_url2.jpg',
        mobile: '555-555-5555',
        altMobile: '111-222-3333',
        fk_country: 'USA',
        fk_stateOrProvinces: 'California',
        fk_city: 'Los Angeles',
        aadhar: '987654321098',
        registrationOfficeAddress: '456 Oak St, Suite 201',
        communicationOfficeAddress: '789 Maple Ave, Floor 3',
        approvedBy: '2', // Updated to string type
        approvedTime: '2024-04-02T10:00:00Z',
        subscriptionCommisionAmountType: 'Fixed',
        subscriptionCommisionAmountValue: '200', // Updated to string type
        tripsCommisionAmountType: 'Percentage',
        tripsCommisionAmountValue: '12', // Updated to string type
        verificationHistory: [],
        archive: 'PENDING',
        createdBy: '2', // Updated to string type
        updatedBy: '2', // Updated to string type
        createdAt: '2024-04-02T10:00:00Z',
        updatedAt: '2024-04-02T10:00:00Z',
    },
    {
        id: '3',
        firstName: 'John',
        middleName: 'Doe',
        lastName: 'Smith',
        dob: '1990-05-15',
        gender: 'MALE',
        email: 'john.doe@example.com',
        fk_roletype: 'channel_partner',
        bussinessName: 'ABC Enterprises',
        distributorType: 'CEO',
        password: 'password123',
        companyRegistrationNumber: '1234567890',
        totalSpend: '$2021.09',
        totalEarned: '$5000.00',
        accountHolderName: 'John Doe',
        accountNumber: '123456789',
        branchName: 'New York Branch',
        ifscCode: 'IFSC123',
        accountType: 'SAVINGS',
        channelPartnerApis: 'ABCDEFG1234',
        profileImage: 'profile_image_url.jpg',
        mobile: '123-456-7890',
        altMobile: '987-654-3210',
        fk_country: 'USA',
        fk_stateOrProvinces: 'New York',
        fk_city: 'New York City',
        aadhar: '123456789012',
        registrationOfficeAddress: '123 Main St, Suite 101',
        communicationOfficeAddress: '456 Broadway, Floor 5',
        approvedBy: '1', // Updated to string type
        approvedTime: '2024-04-01T12:00:00Z',
        subscriptionCommisionAmountType: 'Percentage',
        subscriptionCommisionAmountValue: '10', // Updated to string type
        tripsCommisionAmountType: 'Fixed',
        tripsCommisionAmountValue: '100', // Updated to string type
        verificationHistory: [],
        archive: 'PENDING',
        createdBy: '1', // Updated to string type
        updatedBy: '1', // Updated to string type
        createdAt: '2024-04-01T12:00:00Z',
        updatedAt: '2024-04-01T12:00:00Z',
    },
];

const DistributorModal: React.FC<DistributorModalProps> = ({ event, closeModal, onAddChannelPartner }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [DistributorData, setDistributorData] = useState<DistributorData[]>(staticDistributorData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<DistributorData[]>([]);
    const [recordsData, setRecordsData] = useState<DistributorData[]>([]);

    const [selectedRecords, setSelectedRecords] = useState<DistributorData[]>([]);
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
    // useEffect(() => {
    //     dispatch(setPageTitle('View Channel Partner'));

    //     const fetchDistributorData = async () => {
    //         try {
    //             const { data } = await getDistributorData();
    //             if (data?.ChannelPartners) {
    //                 // pk-note: ask backend developer to change the accessor _id:id, remove the following later
    //                 const newData = data.ChannelPartners.map(({ _id, ...rest }: { _id: string }) => ({
    //                     id: _id,
    //                     ...rest,
    //                 }));
    //                 setDistributorData(newData);
    //             }
    //         } catch (error: any) {
    //             console.error('Error fetching admin data:', error.message);
    //         }
    //     };
    //     fetchDistributorData();
    // }, [dispatch]);

    useEffect(() => {
        if (DistributorData.length > 0) {
            const sortedData = DistributorData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof DistributorData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [DistributorData, sortStatus, pageSize]);

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const { id = '', bussinessName = '', distributorType = '', mobile = '', firstName = '', email = '', archive = '', createdAt = '', updatedAt = '' } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return (
                id?.toLowerCase().includes(searchString) ||
                bussinessName?.toLowerCase().includes(searchString) ||
                distributorType?.toLowerCase().includes(searchString) ||
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

    const columns: DataTableColumn<DistributorData>[] = [
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

    const sortedData = recordsData;

    // handle function
    const handleAddCHPartner = async () => {
        try {
            const CHPartnerData = [];
            const userID = 'chPartnerAdded';
            for (let i = 0; i < selectedRecords.length; i++) {
                CHPartnerData.push(selectedRecords[i]?.id);
            }
            await onAddChannelPartner(CHPartnerData, userID);
            closeModal();
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    const [selectedCity, setSelectedCity] = useState<string>('');

    // service city based filtering.
    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCity(e.target.value);
    };
    // service city based filtering.
    // useEffect(() => {
    //     if (selectedCity.trim() !== '') {
    //         const filteredData = DistributorData.filter((item) => item?.fk_serviceCity.toLowerCase() === selectedCity.toLowerCase());
    //         setDistributorData(filteredData);
    //     } else {
    //         setDistributorData(DistributorData);
    //     }
    // }, [selectedCity]);

    return (
        <div className="mb-5">
            <div className="flex items-center justify-center gap-2">
                <div>
                    <Transition appear show={event} as={Fragment}>
                        <Dialog as="div" open={event} onClose={closeModal}>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0" />
                            </Transition.Child>
                            <div className="fixed inset-0 bg-[black]/60 z-[999]">
                                <div className="flex items-center justify-center min-h-screen px-4">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-5xl my-8 text-black dark:text-white-dark">
                                            <h1 className="text-2xl mt-2 p-5 font-bold text-center">Add Distributor</h1>
                                            <div>
                                                <div className="grid grid-cols-1 sm:flex justify-between gap-5 px-5 mt-2">
                                                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                                                        <label htmlFor="fk_serviceCity" className="block mb-1 text-sm">
                                                            Service City
                                                        </label>
                                                        <select id="ctnSelect1" className="form-select text-white-dark" onChange={handleCityChange} value={selectedCity}>
                                                            <option value="">Show all</option>
                                                            <option value="NYC">NYC</option>
                                                            <option value="LA">LA</option>
                                                            <option value="SF">SF</option>
                                                        </select>
                                                    </div>

                                                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                                                        <label htmlFor="fk_serviceCity" className="block mb-1 text-sm">
                                                            Date sort
                                                        </label>
                                                        <DateRangePicker placeholder="Select Date Range" className="cursor-pointer" />
                                                    </div>
                                                    {/* <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                                                            <label htmlFor="fk_serviceCity" className="block mb-1 text-sm">
                                                                Actions
                                                            </label>
                                                            <select id="ctnSelect1" className="form-select text-white-dark">
                                                                <option value="">Action Dropdown</option>
                                                                <option value="edit">Edit</option>
                                                                <option value="delete">Delete</option>
                                                            </select>
                                                        </div> */}

                                                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                                                        <label htmlFor="fk_serviceCity" className="block mb-1 text-sm">
                                                            Search
                                                        </label>

                                                        <input type="text" className="form-input w-full" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="overflow-x-auto">
                                                    <div className="panel">
                                                        <div className="datatables">
                                                            <DataTable
                                                                className="whitespace-nowrap table-hover lg:h-[300px] h-[200]"
                                                                records={sortedData}
                                                                columns={columns}
                                                                highlightOnHover
                                                                totalRecords={DistributorData.length}
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
                                                </div>
                                                <div className="p-5">
                                                    <div className="flex justify-end items-center gap-5">
                                                        <button onClick={closeModal} type="button" className="btn btn-outline-danger">
                                                            Discard
                                                        </button>
                                                        <button disabled={selectedRecords.length === 0} type="button" className="btn btn-primary" onClick={handleAddCHPartner}>
                                                            Add / Update
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
                </div>
            </div>
        </div>
    );
};

export default DistributorModal;
