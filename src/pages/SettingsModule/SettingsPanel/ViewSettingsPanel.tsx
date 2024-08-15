import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { DataTable, DataTableSortStatus, DataTableColumn } from 'mantine-datatable';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import { getChannelPartnerData } from '@/services/ChannelPartnerService';
import { IRootState } from '@/store';
import Dropdown from '@/components/Dropdown';
import IconCaretDown from '@/components/Icon/IconCaretDown';
import IconEdit from '@/components/Icon/IconEdit';
import IconEye from '@/components/Icon/IconEye';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Breadcrumb from '@/pages/Auth/Breadcrumb';

interface BookingAmtDistributionData {
    id: string;
    actualTripCost: string;
    cgst: string;
    sgst: string;
    leadCharges1: string;
    leadCharges2: string;
    convinenceCharge: string;
    adminCharge: string;
    tax: string;
    techCharges: string;
    promotionDiscount: string;
    SPDiscount: string;
    archive: string;
    approvedBy: string;
    approvedAt: string;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
}

export const staticBookingAmtDistributionData = [
    {
        id: '1',
        actualTripCost: '150.00',
        cgst: '12.00',
        sgst: '10.00',
        leadCharges1: '25.00',
        leadCharges2: '30.00',
        convinenceCharge: '5.00',
        adminCharge: '8.00',
        tax: '20.00',
        techCharges: '15.00',
        promotionDiscount: '10.00',
        SPDiscount: '7.50',
        archive: 'APPROVED',
        approvedBy: 'Admin',
        approvedAt: '2023-12-31',
        createdBy: 'Jane Smith',
        createdAt: '2023-12-01',
        updatedBy: 'Jane Smith',
        updatedAt: '2023-12-15',
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
        actualTripCost: '180.00',
        cgst: '15.50',
        sgst: '13.20',
        leadCharges1: '28.00',
        leadCharges2: '33.50',
        convinenceCharge: '6.50',
        adminCharge: '9.50',
        tax: '25.00',
        techCharges: '18.50',
        promotionDiscount: '12.50',
        SPDiscount: '9.00',
        archive: 'PENDING',
        approvedBy: 'SuperAdmin',
        approvedAt: '2023-12-31',
        createdBy: 'Bob Brown',
        createdAt: '2023-11-20',
        updatedBy: 'Bob Brown',
        updatedAt: '2023-11-25',
    },
];

const ViewBookingAmtDistribution = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [ChannelPartnerData, setChannelPartnerData] = useState<BookingAmtDistributionData[]>(staticBookingAmtDistributionData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<BookingAmtDistributionData[]>([]);
    const [recordsData, setRecordsData] = useState<BookingAmtDistributionData[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<BookingAmtDistributionData[]>([]);
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
    //     dispatch(setPageTitle('View Booking Amt Distribution'));

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
    //                 setChannelPartnerData(staticBookingAmtDistributionData);
    //             }
    //         } catch (error: any) {
    //             console.error('Error fetching Booking Amt Distribution data:', error.message);
    //         }
    //     };
    //     fetchChannelPartnerData();
    // }, [dispatch]);

    useEffect(() => {
        if (ChannelPartnerData.length > 0) {
            const sortedData = ChannelPartnerData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof BookingAmtDistributionData;
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
            const {
                id = '',
                actualTripCost = '',
                cgst = '',
                sgst = '',
                leadCharges1 = '',
                leadCharges2 = '',
                convinenceCharge = '',
                adminCharge = '',
                tax = '',
                techCharges = '',
                promotionDiscount = '',
                SPDiscount = '',
                archive = '',
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
                actualTripCost?.toLowerCase().includes(searchString) ||
                cgst?.toLowerCase().includes(searchString) ||
                sgst?.toLowerCase().includes(searchString) ||
                leadCharges1?.toLowerCase().includes(searchString) ||
                leadCharges2?.toLowerCase().includes(searchString) ||
                convinenceCharge?.toLowerCase().includes(searchString) ||
                adminCharge?.toLowerCase().includes(searchString) ||
                tax?.toLowerCase().includes(searchString) ||
                techCharges?.toLowerCase().includes(searchString) ||
                promotionDiscount?.toLowerCase().includes(searchString) ||
                SPDiscount?.toLowerCase().includes(searchString) ||
                archive?.toLowerCase().includes(searchString) ||
                approvedBy?.toLowerCase().includes(searchString) ||
                approvedAt?.toLowerCase().includes(searchString) ||
                createdBy?.toLowerCase().includes(searchString) ||
                createdAt?.toLowerCase().includes(searchString) ||
                updatedBy?.toLowerCase().includes(searchString) ||
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

    const columns: DataTableColumn<BookingAmtDistributionData>[] = [
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
                                    const editUrl = `/TripModule/BookingAmtDistribution/EditBookingAmtDistribution/${rowData.id}`;
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
                                    const viewUrl = `/TripModule/BookingAmtDistribution/ViewSpecificBookingAmtDistribution/${rowData.id}`;
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
        { accessor: 'actualTripCost', title: 'actualTripCost', sortable: true, hidden: hiddenColumns.includes('actualTripCost') },
        { accessor: 'cgst', title: 'cgst', sortable: true, hidden: hiddenColumns.includes('cgst') },
        { accessor: 'sgst', title: 'sgst', sortable: true, hidden: hiddenColumns.includes('sgst') },
        { accessor: 'leadCharges1', title: 'leadCharges1', sortable: true, hidden: hiddenColumns.includes('leadCharges1') },
        { accessor: 'leadCharges2', title: 'leadCharges2', sortable: true, hidden: hiddenColumns.includes('leadCharges2') },
        { accessor: 'convinenceCharge', title: 'convinenceCharge', sortable: true, hidden: hiddenColumns.includes('convinenceCharge') },
        { accessor: 'adminCharge', title: 'adminCharge', sortable: true, hidden: hiddenColumns.includes('adminCharge') },
        { accessor: 'tax', title: 'tax', sortable: true, hidden: hiddenColumns.includes('tax') },
        { accessor: 'techCharges', title: 'techCharges', sortable: true, hidden: hiddenColumns.includes('techCharges') },
        { accessor: 'promotionDiscount', title: 'promotionDiscount', sortable: true, hidden: hiddenColumns.includes('promotionDiscount') },
        { accessor: 'SPDiscount', title: 'SPDiscount', sortable: true, hidden: hiddenColumns.includes('SPDiscount') },
        { accessor: 'archive', title: 'archive', sortable: true, hidden: hiddenColumns.includes('archive') },
        { accessor: 'approvedBy', title: 'approvedBy', sortable: true, hidden: hiddenColumns.includes('approvedBy') },
        { accessor: 'approvedAt', title: 'approvedAt', sortable: true, hidden: hiddenColumns.includes('approvedAt') },
        { accessor: 'createdBy', title: 'createdBy', sortable: true, hidden: hiddenColumns.includes('createdBy') },
        { accessor: 'createdAt', title: 'createdAt', sortable: true, hidden: hiddenColumns.includes('createdAt') },
        { accessor: 'updatedBy', title: 'updatedBy', sortable: true, hidden: hiddenColumns.includes('updatedBy') },
        { accessor: 'updatedAt', title: 'updatedAt', sortable: true, hidden: hiddenColumns.includes('updatedAt') },
    ];

    const sortedData = recordsData; // Replace this with your sorting logic

    const handleRowClick = (row: BookingAmtDistributionData) => {
        const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);

        let updatedSelectedRecords: BookingAmtDistributionData[] = [];

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
            const editUrl = `/transactionModule/serviceProvider/editServiceProvider/${selectedRecords[0].id}`;
            navigate(editUrl);
        }
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
            label: 'Settings Panel',
            to: '/SettingsModule/SettingsPanel/ViewSettingsPanel',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/SettingsModule/SettingsPanel/ViewSettingsPanel' ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <Link to="/SettingsModule/SettingsPanel/CreateSettingsPanel" className="btn btn-primary block w-full sm:inline-block text-center mt-0">
                            Create Settings Panel
                        </Link>
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
                        <select id="ctnSelect1" className="form-select text-white-dark" onChange={(e) => handleSelectChange(e.target.value)} required>
                            <option value="">Action Dropdown</option>
                            <option value="option1">APPROVED</option>
                            <option value="option2">PENDING</option>
                            <option value="option3">REJECETD</option>
                            <option value="option4">HOLD</option>
                            <option value="option5">SUSPEND</option>
                            <option value="option6">EXPORT</option>
                        </select>
                    </div>

                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <input type="text" className="form-input w-full sm:w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
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
        </>
    );
};

export default ViewBookingAmtDistribution;
