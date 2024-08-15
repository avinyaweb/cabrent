import React, { useState, ChangeEvent, FormEvent, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import PermissionModule from '../Roles/PermissionModule';
import AdminDocModule from './AdminDocLayout';
// future code --->>>
// import { createAdminData } from '@/services/AdminService';
// import toast from 'react-hot-toast';
// import * as Yup from 'yup';

interface FormValues {
    firstName: string;
    middleName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    passwordHash: string;
    fk_roleType: string;
    fk_reportsTo: string;
    fk_adminTeam: string;
    dob: string;
    gender: string;
    altPhoneNumber: string;
    country: string;
    state: string;
    city: string;
    employeeLevel: string;
    fk_serviceCity: string;
    fk_teamManager: string;
    archive: string;
    approvedBy: string;
    approvedTime: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
    profileImage: string;
    aadharCard: string;
    aadharImages: string;
    panImages: string;
    panCard: string;
}

const CreateAdmin: React.FC = () => {
    const secondPanelRef = useRef<HTMLDivElement | null>(null);
    const initialFormValues: FormValues = {
        firstName: '',
        middleName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        passwordHash: '',
        fk_roleType: '',
        fk_reportsTo: '',
        fk_adminTeam: '',
        dob: '',
        gender: '',
        altPhoneNumber: '',
        country: '',
        state: '',
        city: '',
        employeeLevel: '',
        fk_serviceCity: '',
        fk_teamManager: '',
        archive: 'PENDING',
        approvedBy: '',
        approvedTime: '',
        createdAt: '',
        updatedAt: '',
        createdBy: '',
        updatedBy: '',
        profileImage: '',
        aadharCard: '',
        aadharImages: '',
        panImages: '',
        panCard: '',
    };

    // future validation
    // const validationSchema = Yup.object().shape({
    //     firstName: Yup.string().required('First Name is required'),
    //     dob: Yup.string().required('Date of Birth is required'),
    //     middleName: Yup.string().required('Middle Name is required'),
    //     lastName: Yup.string().required('Last Name is required'),
    //     phoneNumber: Yup.string()
    //         .required('Phone Number is required')
    //         .matches(/^[0-9]{10}$/, 'Phone Number must be 10 digits'),
    //     email: Yup.string().email('Invalid email').required('Email is required'),
    //     passwordHash: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
    //     gender: Yup.string().required('Gender is required'),
    //     altPhoneNumber: Yup.string().notOneOf([Yup.ref('phoneNumber')], 'Alt Phone No cannot be the same as Phone Number'),
    //     country: Yup.string().required('Country is required'),
    //     state: Yup.string().required('State is required'),
    //     city: Yup.string().required('City is required'),
    //     fk_roleType: Yup.string().required('Role Type is required'),
    //     fk_reportsTo: Yup.string().required('Reports To is required'),
    //     fk_adminTeam: Yup.string().required('Admin Team is required'),
    //     employeeLevel: Yup.string().required('Employee Level is required'),
    //     fk_serviceCity: Yup.string().required('Service City is required'),
    //     fk_teamManager: Yup.string().required('Team manager required'),
    // });

    const [formData, setFormData] = useState<FormValues>(initialFormValues);
    const [ValidationError, setValidationError] = useState();
    const navigate = useNavigate();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Scroll to the next panel after form submission
        if (secondPanelRef.current) {
            secondPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        try {
            // Future code for api ---->>>>
            // await validationSchema.validate(formData, { abortEarly: false });
            // const response = await createAdminData(formData);
            // if (response?.message) {
            //     toast.success('Admin created successfully');
            //     setTimeout(() => {
            //         navigate('/AdminModule/Admin/ViewAdmin');
            //     }, 2000);
            // }
        } catch (error: any) {
            const newError: any = {};
            error.inner.forEach((err: any) => {
                newError[err.path] = err.message;
            });
            setValidationError(newError);
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
                        currentPath === '/AdminModule/Admin/ViewAdmin' ? 'text-blue-600' : ''
                    }`}
                >
                    <Link to="/AdminModule/Admin/ViewAdmin" className={currentPage === '/AdminModule/Admin/ViewAdmin' ? 'active' : ''} onClick={() => setCurrent('/viewAdmin')}>
                        Admin
                    </Link>
                </li>
                <li
                    className={`before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                        currentPath === '/AdminModule/Admin/CreateAdmin' ? 'text-blue-600' : ''
                    }`}
                >
                    Create Admin
                </li>
            </ol>

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <AdminLayout details={formData} onInputChange={handleInputChange} showStatus={false} validation={ValidationError} />
                    <div className="flex justify-center mt-6">
                        <button type="submit" className="btn btn-primary !mt-6 mr-4">
                            Submit
                        </button>
                        <button type="button" className="btn btn-danger !mt-6" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>

            <div className="panel mt-2" ref={secondPanelRef}>
                {/*  */}
                <form>
                    <AdminDocModule details={formData} onInputChange={handleInputChange} createAction="create" />
                    <div className="flex justify-center mt-6">
                        <button type="submit" className="btn btn-primary !mt-6 mr-4" onClick={() => navigate('/AdminModule/Admin/ViewSpecificAdmin/1')}>
                            Submit
                        </button>
                        <button type="button" className="btn btn-danger !mt-6" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                    {/* <PermissionModule /> */}
                </form>
            </div>
        </>
    );
};

export default CreateAdmin;
