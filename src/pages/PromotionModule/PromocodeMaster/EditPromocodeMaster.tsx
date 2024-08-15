import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import PromocodeMasterModule from './PromocodeMasterModule';
import { staticPromocodeMasterData } from './ViewPromocodeMaster';

interface FormValues {
    id: string;
    promoCode: string;
    discountType: string;
    validityStart: string;
    validityEnd: string;
    startTime: string;
    endTime: string;
    usage: string;
    usageLimit: string;
    perUserUsageLimit: string;
    fk_serviceCity: string;
    tripType: string;
    days: string;
    archive: string;
}

const EditPromocodeMaster: React.FC = () => {
    const { promocodeMasterId } = useParams();
    const initialFormValues: FormValues = {
        id: '',
        promoCode: '',
        discountType: '',
        validityStart: '',
        validityEnd: '',
        startTime: '',
        endTime: '',
        usage: '',
        usageLimit: '',
        perUserUsageLimit: '',
        fk_serviceCity: '',
        tripType: '',
        days: '',
        archive: '',
    };

    const [formData, setFormData] = useState<FormValues>(initialFormValues);
    const [currentPage, setCurrentPage] = useState<string>('');

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to set the current page based on the path
    const setCurrent = (path: string) => {
        setCurrentPage(path);
    };

    // useEffect(() => {
    //     const specificData = staticPromocodeMasterData.find((data) => data.id === promocodeMasterId);
    //     if (specificData) {
    //         setFormData(specificData); // Set the entire form data
    //     }
    // }, [promocodeMasterId]);

    useEffect(() => {
        const specificData = staticPromocodeMasterData.find((data) => data.id === promocodeMasterId);
        if (specificData) {
            // Provide a default value for perUserUsageLimit
            const formDataCopy: FormValues = {
                ...specificData,
                perUserUsageLimit: '', // Provide a default value here
            };
            setFormData(formDataCopy);
        }
    }, [promocodeMasterId]);

    const navItems = [
        {
            label: 'Home',
            to: '/',
            className: '',
        },
        {
            label: 'Promocode Master',
            to: '/PromotionModule/PromocodeMaster/ViewPromocodeMaster',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/PromotionModule/PromocodeMaster/ViewPromocodeMaster' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Edit Promocode Master',
            to: '',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `` ? 'text-blue-600' : ''
            }`,
        },
    ];

    const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    {
        /* 
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await createAdminTicketsData(formData);
            console.log('API Response:', response);
            console.log('Admin Tickets created successfully!');
            setFormData(initialFormValues);
        } catch (error: any) {
            console.error('Error creating admin tickets:', error.message);
        }
    };
    */
    }

    const handleSubmit = () => {
        window.location.reload();
    };

    const handleCancel = () => {
        window.location.reload();
    };

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <PromocodeMasterModule details={formData} onInputChange={handleInputChange} showStatus={true} isEditPage={true} />

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

export default EditPromocodeMaster;
