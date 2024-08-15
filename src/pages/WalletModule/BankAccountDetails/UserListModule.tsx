import { useSelector } from 'react-redux';
import { IRootState } from '@/store';
import 'rsuite/dist/rsuite-no-reset.min.css';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import IconEdit from '@/components/Icon/IconEdit';

interface UserListModuleProps {
    viewSpecific: boolean;
    // Add other props if needed
}
const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
const UserListModule: React.FC<UserListModuleProps> = ({ viewSpecific }) => {
    const navigate = useNavigate();
    return (
        <>
            <div className="panel mt-1">
                {/* <div className="space-y-2 prose flex gap-5 relative dark:prose-headings:text-white-dark mt-6">
                    <h2>Driver Details</h2>
                    <div className="absolute lg:bottom-[29%] lg:left-[220px] flex text-[#4361EE] justify-center items-center">
                        <Tippy content="View in Detail">
                            <button
                                className="ms-2 cursor-pointer  hover:text-[#5568be]"
                                onClick={() => {
                                    const viewUrl = `/TransactionModule/BankAccount/ViewSpecificBankAccount/1`;
                                    navigate(viewUrl);
                                }}
                            >
                                <FaArrowUpRightFromSquare />{' '}
                            </button>
                        </Tippy>
                        <Tippy content="Edit">
                            <button
                                className="ms-2 cursor-pointer text-2xl hover:text-[#5568be]"
                                onClick={() => {
                                    const viewUrl = `/TransactionModule/BankAccount/EditBankAccount/1`;
                                    navigate(viewUrl);
                                }}
                            >
                                <MdOutlineEdit />
                            </button>
                        </Tippy>
                    </div>
                </div> */}

                {/* <div className="flex items-center gap-2 relative justify-between"> */}
                {/* <div className="text-2xl font-bold dark:prose-headings:text-white-dark">
                        <h2>User List</h2>
                    </div> */}

                {/* <div className="flex items-center  gap-5">
                        <div
                            className="cursor-pointer text-blue-500 text-1xl flex flex-row gap-3 items-center justify-center"
                            onClick={() => {
                                const viewUrl = `/BusinessModule/ServiceProvider/ViewSpecificServiceProvider/1`;
                                navigate(viewUrl);
                            }}
                        >
                            <h3>View More</h3>
                            <FaArrowUpRightFromSquare />
                        </div>

                        <div
                            className="cursor-pointer text-blue-500 text-1xl flex flex-row gap-3 items-center justify-center"
                            onClick={() => {
                                const viewUrl = `/BusinessModule/ServiceProvider/EditServiceProvider/1`;
                                navigate(viewUrl);
                            }}
                        >
                            <h3>Edit</h3>
                            <IconEdit />
                        </div>
                    </div> */}

                {/* </div> */}

                <div className="flex items-center justify-end gap-5 flex-grow">
                    {/* Edit */}
                    <div
                        className="cursor-pointer text-blue-500 text-1xl flex flex-row gap-3 items-center justify-center"
                        onClick={() => {
                            const viewUrl = `/BusinessModule/ServiceProvider/ViewSpecificServiceProvider/1`;
                            navigate(viewUrl);
                        }}
                    >
                        <h3>Edit</h3>
                        <IconEdit />
                    </div>

                    {/* View More */}
                    <div
                        className="cursor-pointer text-blue-500 text-1xl flex flex-row gap-3 items-center justify-center"
                        onClick={() => {
                            const viewUrl = `/BusinessModule/ServiceProvider/EditServiceProvider/1`;
                            navigate(viewUrl);
                        }}
                    >
                        <h3>View More</h3>
                        <FaArrowUpRightFromSquare />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-2">
                    <div className="lg:w-1/3">
                        <label htmlFor="firstName" className="block mb-1  ">
                            First Name
                        </label>
                        <input name="firstName" type="text" id="firstName" className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`} value={'Vasudev'} />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="middleName" className="block mb-1  ">
                            Middle Name
                        </label>
                        <input name="middleName" type="text" id="middleName" className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`} value={'Ajay'} />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="lastName" className="block mb-1  ">
                            Last Name
                        </label>
                        <input name="lastName" type="text" id="lastName" className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`} value={'kumar'} />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                    <div className="lg:w-1/3">
                        <label htmlFor="email" className="block mb-1  ">
                            Email Address
                        </label>
                        <input
                            name="email"
                            id="email"
                            type="text"
                            placeholder="Example@gmail.com"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            value={'sample@gmail.com'}
                        />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="ctnEmail" className="block mb-1  ">
                            Date of Birth
                        </label>
                        <Flatpickr
                            value={'2000-12-01'}
                            options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }}
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="gender" className="block mb-1  ">
                            Gender
                        </label>
                        <input name="gender" id="gender" type="text" className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`} value={'Male'} />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                    <div className="lg:w-1/3">
                        <label htmlFor="fatherName" className="block mb-1  ">
                            Father Name
                        </label>
                        <input
                            name="fatherName"
                            type="text"
                            id="fatherName"
                            placeholder="Enter Father's Name"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            value={'kumar'}
                        />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="mobileNumber" className="block mb-1  ">
                            Mobile Number
                        </label>
                        <input
                            name="mobileNumber"
                            type="tel"
                            id="mobileNumber"
                            placeholder="(+91) Enter Mobile Number"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            value={'9447851235'}
                        />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="altMobileNumber" className="block mb-1  ">
                            Alternative Mobile Number
                        </label>
                        <input
                            name="altMobileNumber"
                            type="tel"
                            id="altMobileNumber"
                            placeholder="(+91) Enter Alt. Mobile Number"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            value={'85476213201'}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserListModule;
