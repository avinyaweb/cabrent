import React, { useState, ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
//future code -->>
// import { useDispatch } from 'react-redux';
// import { updateAdmin, getAdminById } from '@/services/AdminService';
import AdminLayout from './AdminLayout';
import AdminDocModule from './AdminDocLayout';
import PermissionModule from '../Roles/PermissionModule';
//future code -->>
// import toast from 'react-hot-toast';
// import { Tab } from '@headlessui/react';
import { staticAdminData } from './ViewAdmin';
import CreateBankAccount from '@/pages/WalletModule/BankAccountDetails/CreateBankAccount';

interface FormValues {
    fk_roleType: string;
    dob: string;
    fk_serviceCity: string;
    profileImage: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    passwordHash: string;
    status: string;
    fk_reportsTo: string;
    fk_adminTeam: string;
    // verificationHistory: {
    //     updatedTime: string;
    //     _id: string;
    //     updatedByObjectId?: string; // Optional field
    // }[];
    approvedBy: string;
    approvedTime: string;
    archive: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
    gender: string;
    altPhoneNumber: string;
    country: string;
    state: string;
    city: string;
    employeeLevel: string;
    fk_teamManager: string; // Add this property
    aadharCard: string;
    panCard: string;
    aadharImages: string;
    panImages: string;
}

const EditAdmin: React.FC = () => {
    const secondPanelRef = useRef<HTMLDivElement | null>(null);

    // future code -->>
    // const dispatch = useDispatch();
    const navigate = useNavigate();

    const { adminId } = useParams();
    const initialFormValues: FormValues = {
        fk_roleType: '',
        dob: '',
        fk_serviceCity: '',
        profileImage: '',
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        passwordHash: '',
        status: '',
        fk_reportsTo: '',
        fk_adminTeam: '',
        // verificationHistory: [],
        approvedBy: '',
        approvedTime: '',
        archive: '',
        createdAt: '',
        updatedAt: '',
        createdBy: '',
        updatedBy: '',
        gender: '',
        altPhoneNumber: '',
        country: '',
        state: '',
        city: '',
        employeeLevel: '',
        aadharCard: '',
        panCard: '',
        aadharImages: '',
        panImages: '',
        fk_teamManager: '', // Add this property
    };

    const [adminDetails, setAdminDetails] = useState<FormValues>(initialFormValues);
    useEffect(() => {
        // Find the specific data based on the serviceProviderId
        const specificData: any = staticAdminData.find((data) => data.id === adminId);

        // If specificData is found, update the formData state with its values
        if (specificData) {
            setAdminDetails(specificData); // Set the entire form data
        }
    }, [adminId]);

    // useEffect(() => {
    //     const fetchAdminDetails = async () => {
    //         try {
    //             const response = await getAdminById(adminId!);
    //             setAdminDetails(response.data.admin);
    //         } catch (error: any) {
    //             console.error('Error fetching admin details:', error.message);
    //         }
    //     };

    //     fetchAdminDetails();
    // }, [adminId!]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAdminDetails({ ...adminDetails, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Scroll to the next panel after form submission
        if (secondPanelRef.current) {
            secondPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        try {
            // await updateAdmin(adminId!, adminDetails);
            // toast.success('Admin updated successfully');
            // setTimeout(() => {
            //     navigate('/AdminModule/Admin/ViewAdmin');
            // }, 2000);
        } catch (error: any) {
            console.error('Error updating admin details:', error.message);
        }
    };

    const handleCancel = () => {
        navigate('/AdminModule/Admin/ViewAdmin');
    };

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to set the current page based on the path
    const setCurrent = (path: string) => {
        setCurrentPage(path);
    };

    return (
        <>
            <ol className="flex text-gray-500 font-semibold dark:text-white-dark flex-wrap">
                <li className="">
                    <Link to="/" className={currentPage === '/' ? 'active' : ''} onClick={() => setCurrent('/')}>
                        Home
                    </Link>
                </li>
                <li
                    className={`before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                        currentPath === '/AdminModule/Admin/CreateAdmin/' ? 'text-blue-600' : ''
                    }`}
                >
                    <Link to="/AdminModule/Admin/ViewAdmin" className={currentPage === 'AdminModule/Admin/ViewAdmin' ? 'active' : ''} onClick={() => setCurrent('/viewAdmin')}>
                        Admin
                    </Link>
                </li>
                <li
                    className={`before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                        currentPath === `/AdminModule/Admin/EditAdmin/${adminId}` ? 'text-blue-600' : ''
                    }`}
                >
                    Edit Admin
                </li>
            </ol>

            <div className="panel mt-2">
                <form onSubmit={handleSubmit}>
                    <div className="mt-5">
                        <AdminLayout details={adminDetails} onInputChange={handleInputChange} showStatus={true} noPassEdit={true} isEditPage={true} validation={null} />

                        <div className="pt-6">
                            <h1 className="text-3xl font-bold">Bank Details</h1>
                            <CreateBankAccount />
                        </div>
                        <div className="flex justify-center mt-6">
                            <button type="submit" className="btn btn-primary !mt-6 mr-4">
                                Update
                            </button>
                            <button type="button" className="btn btn-danger !mt-6" onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <div className="panel mt-2" ref={secondPanelRef}>
                <form>
                    <AdminDocModule details={adminDetails} onInputChange={handleInputChange} editableItem={true} createAction={false} />
                    <div className="flex justify-center mt-6">
                        <button type="submit" className="btn btn-primary !mt-6 mr-4" onClick={() => navigate('/AdminModule/Admin/ViewSpecificAdmin/1')}>
                            Submit
                        </button>
                        <button type="button" className="btn btn-danger !mt-6" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditAdmin;
