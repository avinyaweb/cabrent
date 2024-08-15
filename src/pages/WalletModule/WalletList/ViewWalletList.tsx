import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DataTable, DataTableSortStatus, DataTableColumn } from 'mantine-datatable';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import { IRootState } from '@/store';
import Dropdown from '@/components/Dropdown';
import IconCaretDown from '@/components/Icon/IconCaretDown';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { getAllPriority } from '@/services/UtilityServices/PriorityService';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import 'rsuite/dist/rsuite-no-reset.min.css';
import { MdAccountBalance } from 'react-icons/md';
import { successAlert } from '@/utils/Toast';
// import Popup from '@/components/Models/BankPopup';
import BankPopup from '@/components/Models/BankPopup';
import UpdateArchivePopUp from '@/components/Models/UpdateArchivePopUp';

interface PriorityData {
    id: string;
    walletUserType: string;
    walletId: string;
    walletStatus: string;
    travelAgencyId: string;
    walletBalance: string;
    townerCoinBalance: string;
}

const staticPriorityData: PriorityData[] = [
    {
        id: '1',
        walletUserType: 'Vehicle',
        walletId: 'W123',
        walletStatus: 'Active',
        travelAgencyId: 'TA001',
        walletBalance: '150.00',
        townerCoinBalance: '50.00',
    },
    {
        id: '2',
        walletUserType: 'Distributor',
        walletId: 'W124',
        walletStatus: 'Inactive',
        travelAgencyId: 'TA002',
        walletBalance: '2000.00',
        townerCoinBalance: '200.00',
    },
    {
        id: '3',
        walletUserType: 'Travel Agency',
        walletId: 'W125',
        walletStatus: 'Active',
        travelAgencyId: 'TA003',
        walletBalance: '500.00',
        townerCoinBalance: '100.00',
    },
    // Add more dummy data as needed
];

const ViewWalletList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setPageTitle('View Status'));
    }, [dispatch]);

    const [modal3, setmodal3] = useState(false);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [PriorityData, setPriorityData] = useState<PriorityData[]>(staticPriorityData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<PriorityData[]>([]);
    const [recordsData, setRecordsData] = useState<PriorityData[]>([]);

    const [selectedRecords, setSelectedRecords] = useState<PriorityData[]>([]);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    // add update archive
    const handleShowPopup = (selectshowpop: any[], id: string) => {
        successAlert('Transaction done succesfully Succesfully');
        // handle update archive
    };

    const [selectedDateRange, setSelectedDateRange] = useState<DateRange | null>(null);

    const handleDateRangeChange = (range: DateRange | null) => {
        setSelectedDateRange(range);
    };

    // date vise sorting.
    //   useEffect(() => {
    //     const fetchAdminData = async () => {
    //       try {
    //         const { data } = await getAllPriority();
    //         if (data?.Archives) {
    //           const filteredData = data.Archives.filter((item: PriorityData) => {
    //             if (!selectedDateRange) return true;
    //             const createdAtTimestamp = new Date(item.createdAt).getTime();
    //             const startDate = selectedDateRange[0]?.getTime() || 0;
    //             const endDate = selectedDateRange[1]?.getTime() || Number.MAX_SAFE_INTEGER;
    //             return createdAtTimestamp >= startDate && createdAtTimestamp <= endDate;
    //           });
    //           setPriorityData(filteredData);
    //         }
    //       } catch (error: any) {
    //         console.error('Error fetching admin data:', error.message);
    //       }
    //     };
    //     fetchAdminData();
    //   }, [selectedDateRange]);

    //   const handleDateChange = (date: Date | null) => {
    //     setPriorityData(date);
    //   };

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    // useEffect(() => {
    //     console.log('Fetching status data...');
    //     const fetchAdminStatesData = async () => {
    //         try {
    //             const { data } = await getAllPriority();
    //             if (data?.Archives) {
    //                 const newData = data.Archives.map(({ _id: id, ...rest }) => ({
    //                     id,
    //                     ...rest,
    //                 }));
    //                 setPriorityData(newData);
    //             }
    //         } catch (error: any) {
    //             console.error('Error fetching status data:', error.message);
    //         }
    //     };
    //     fetchAdminStatesData();
    // }, [dispatch]);

    useEffect(() => {
        if (PriorityData.length > 0) {
            const sortedData = PriorityData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof PriorityData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [PriorityData, sortStatus, pageSize]);

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const { walletUserType = '', walletId = '', walletStatus = '', travelAgencyId = '', walletBalance = '', townerCoinBalance = '' } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return (
                walletUserType.toLowerCase().includes(searchString) ||
                walletId.toLowerCase().includes(searchString) ||
                walletStatus.toLowerCase().includes(searchString) ||
                travelAgencyId.toLowerCase().includes(searchString) ||
                walletBalance.toLowerCase().includes(searchString) ||
                townerCoinBalance.toLowerCase().includes(searchString)
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

    const columns: DataTableColumn<PriorityData>[] = [
        {
            accessor: 'actions',
            title: 'Actions',
            render: (rowData) => (
                <div className="flex items-center">
                    <Tippy content="more view">
                        <button
                            type="button"
                            className="mr-4"
                            onClick={() => {
                                if (rowData?.id) {
                                    console.log('printed', rowData.id);
                                }
                                setmodal3(true);
                            }}
                        >
                            <MdAccountBalance />
                        </button>
                    </Tippy>
                </div>
            ),
        },
        { accessor: 'walletUserType', title: 'Wallet User Type', sortable: true, hidden: hiddenColumns.includes('walletUserType') },
        { accessor: 'walletId', title: 'Wallet ID', sortable: true, hidden: hiddenColumns.includes('walletId') },
        { accessor: 'walletStatus', title: 'Wallet Status', sortable: true, hidden: hiddenColumns.includes('walletStatus') },
        { accessor: 'travelAgencyId', title: 'Travel Agency ID', sortable: true, hidden: hiddenColumns.includes('travelAgencyId') },
        { accessor: 'walletBalance', title: 'Wallet Balance', sortable: true, hidden: hiddenColumns.includes('walletBalance') },
        { accessor: 'townerCoinBalance', title: 'Towner Coin Balance', sortable: true, hidden: hiddenColumns.includes('townerCoinBalance') },
    ];
    const sortedData = recordsData; // Replace this with your sorting logic

    const handleRowClick = (row: PriorityData) => {
        const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);

        let updatedSelectedRecords: PriorityData[] = [];

        if (isSelected) {
            updatedSelectedRecords = selectedRecords.filter((selectedRow) => selectedRow.id !== row.id);
        } else {
            updatedSelectedRecords = [...selectedRecords, row];
        }

        setSelectedRecords(updatedSelectedRecords);

        // Redirect to view specific page upon row click
        navigate(`/adminModule/status/viewSpecificStatus/${row.id}`);
    };

    // Handle changes in the "Admin Actions" dropdown
    const handleSelectChange = (selectedOption: string) => {
        if (selectedOption === 'edit' && selectedRecords.length === 1) {
            const editUrl = `/UtilityModule/Priority/EditPriority/${selectedRecords[0].id}`;
            navigate(editUrl);
        } else if (selectedOption === 'delete' && selectedRecords.length === 1) {
            // Add your delete logic here
            const deleteUrl = `/utilityModule/Priority/DeletePriority/${selectedRecords[0].id}`;
            // Perform the delete operation, navigate to delete URL, or show a confirmation modal
            console.log('Delete operation');
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
            label: 'View Wallet list',
            to: '/UtilityModule/Priority/ViewWalletList',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/UtilityModule/Priority/ViewPriority' ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                    {/* <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <Link to="/UtilityModule/Priority/CreatePriority" className="btn btn-primary block w-full sm:inline-block text-center mt-0">
                            Create Priority
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
                        <DateRangePicker placeholder="Select Date Range" onChange={handleDateRangeChange} className="cursor-pointer" />
                    </div>

                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <input type="text" className="form-input w-full " placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>

                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <select id="ctnSelect1" className="form-select text-white-dark" onChange={(e) => handleSelectChange(e.target.value)} required>
                            <option value="">Action Dropdown</option>
                            <option value="edit">Edit</option>
                            <option value="delete">Delete</option>
                        </select>
                    </div>
                </div>

                <div className="datatables mt-6">
                    <DataTable
                        className="whitespace-nowrap table-hover"
                        records={sortedData}
                        columns={columns}
                        highlightOnHover
                        totalRecords={PriorityData.length}
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
                        //onRowClick={(row) => handleRowClick(row)}
                    />
                </div>
                <BankPopup event={modal3} closeModal={() => setmodal3(false)} onSubmit={handleShowPopup} />
                {/* <UpdateArchivePopUp event={modal3} closeModal={() => setmodal3(false)} onSubmit={handleShowPopup} /> */}
            </div>
        </>
    );
};

export default ViewWalletList;
