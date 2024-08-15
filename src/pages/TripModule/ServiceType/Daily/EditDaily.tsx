import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import DailyModule from './DailyModule';

interface FormValues {
    packageName: string;
    packageDistunce: string;
    packageDuration: string;
    fk_serviceCity: string;
}

const EditDaily: React.FC = () => {
    // future code -->>
    // const dispatch = useDispatch();
    const navigate = useNavigate();

    const { DailyID }: { DailyID?: any } = useParams();

    console.log(DailyID);

    const initialFormValues: FormValues = {
        packageName: '',
        packageDistunce: '',
        packageDuration: '',
        fk_serviceCity: '',
    };

    const [DailyDetails, setDailyDetails] = useState<FormValues>(initialFormValues);

    // useEffect(() => {
    //     const fetchChannelPartnerDetails = async () => {
    //         try {
    //             const response = await getDailyById(DailyID);
    //             console.log('Fetched Data', response);
    //             setDailyDetails(response.data.Daily);
    //         } catch (error: any) {
    //             console.error('Error fetching channel partner details:', error.message);
    //         }
    //     };
    //     fetchChannelPartnerDetails();
    // }, [DailyID]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setDailyDetails({ ...DailyDetails, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // try {
        //     await updateDaily(DailyID, DailyDetails);
        //     console.log('Channel Partner details updated successfully!');
        //     navigate('/TripModule/ServiceType/Daily/ViewDaily');
        // } catch (error: any) {
        //     console.error('Error updating channel partner details:', error.message);
        // }
    };

    // const handleSubmit = () => {
    //   window.location.reload();
    // };

    const handleCancel = () => {
        window.location.reload();
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
            label: 'Daily Package',
            to: '/TripModule/ServiceType/Daily/ViewDaily',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/TripModule/ServiceType/Daily/ViewDaily' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Edit Daily Package',
            to: '/TripModule/ServiceType/Daily/EditDaily',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `/TripModule/ServiceType/Daily/EditDaily/${DailyID}` ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <DailyModule details={DailyDetails} onInputChange={handleInputChange} showStatus={false} isEditPage={true} />

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

export default EditDaily;
