import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import { createAdminTeamsData } from '@/services/AdminTeamsService';
import AdminTeamModule from './AdminTeamModule';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

interface FormValues {
    teamName: string;
    fk_reportingManager: string;
    teamManager: string;
    fk_serviceCity: string;
    remarks: string;
    status: string;
}

const CreateAdminTeams: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setPageTitle('Create Admin Teams'));
    }, [dispatch]);

    const initialFormValues: FormValues = {
        teamName: '',
        fk_reportingManager: '',
        teamManager: '',
        fk_serviceCity: '',
        remarks: '',
        status: 'PENDING',
    };

    // validation of admin teams.
    const validationSchema = Yup.object().shape({
        teamName: Yup.string().required('Team Name is required'),
        fk_reportingManager: Yup.string().required('Reporting Manager is required'),
        teamManager: Yup.string().required('Team Manager is required'),
        fk_serviceCity: Yup.string().required('Service City is required'),
        remarks: Yup.string().required('Remarks are required'),
    });

    const [formData, setFormData] = useState<FormValues>(initialFormValues);
    const [ValidationError, setValidationError] = useState();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // await validationSchema.validate(formData, { abortEarly: false });
            // const response = await createAdminTeamsData(formData);
            // if (response.message) {
            //     toast.success('Admin Team created successfully!');
            //     navigate('/AdminModule/AdminTeams/ViewAdminTeams');
            // }
            // setFormData(initialFormValues);
            navigate('/AdminModule/AdminTeams/ViewSpecificAdminTeams/1');
        } catch (error: any) {
            const newError: any = {};
            error.inner.forEach((err: any) => {
                newError[err.path] = err.message;
            });
            setValidationError(newError);
        }
    };
    const handleCancel = () => {
        navigate('/AdminModule/AdminTeams/ViewAdminTeams');
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
                        currentPath === '/AdminModule/AdminTeams/ViewAdminTeams' ? 'text-blue-600' : ''
                    }`}
                >
                    <Link
                        to="/AdminModule/AdminTeams/ViewAdminTeams"
                        className={currentPage === '/AdminModule/AdminTeams/ViewAdminTeams' ? 'active' : ''}
                        onClick={() => setCurrent('/viewAdminTeams')}
                    >
                        Admin Teams
                    </Link>
                </li>
                <li
                    className={`before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                        currentPath === '/AdminModule/AdminTeams/CreateAdminTeams' ? 'text-blue-600' : ''
                    }`}
                >
                    Create Admin Teams
                </li>
            </ol>

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <AdminTeamModule
                        tabs={false}
                        details={formData}
                        onInputChange={handleInputChange}
                        showStatus={false}
                        viewSpecific={false}
                        redirect={false}
                        showApprovalFields={false}
                        Validation={ValidationError}
                        isEditPage={false}
                    />

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
        </>
    );
};

export default CreateAdminTeams;
