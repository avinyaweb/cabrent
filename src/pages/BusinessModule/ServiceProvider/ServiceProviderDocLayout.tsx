import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import CarouselModel from '@/components/Carousel/CarouselModel';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import '../../../assets/css/file-upload-preview.css';
import IconX from '@/components/Icon/IconX';

import UpdateStatus from '@/components/Models/UpdateStatus';
import { successAlert } from '@/utils/Toast';
import { FaTimesCircle } from 'react-icons/fa';
import { MdCheckBox } from 'react-icons/md';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';

interface AdminProps {
    details: {
        serviceProviderType: string;
        driverKey: string;
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
        password: string;
        permanentAddress: string;
        presentAddress: string;
        registerAddress: string;
        fk_serviceCity: string;
        badgeNumber: string;
        badgeValidity: string;
        isAvailable: boolean;
        driverStatus: string;
        driverLocation: boolean;
        emergencyContact: string;
        driverApprovalDate: string;
        panNumber: string;
        rtoDisplayCard: string;
        stateAndRto: string;
        verificationHistory: string;
        archive: string;

        profileImage: string;
        drivinglicense: string;
        aadharCard: string;
        aadharImages: string;
        panImages: string;
        panCard: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    viewSpecific?: boolean;
}

const ServiceProviderDocLayout: React.FC<AdminProps> = ({ details, onInputChange, viewSpecific }) => {
    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [modal1, setModal1] = useState(false);
    const [modal2, setmodal2] = useState(false);
    const [modal3, setmodal3] = useState(false);
    const [modal4, setmodal4] = useState(false);

    const profileImage = [
        { title: 'Profile Image', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9UdkG68P9AHESMfKJ-2Ybi9pfnqX1tqx3wQ&usqp=CAU' },
        // Add more image URLs as needed
    ];
    const drivinglicenseImage = [
        { title: 'Front Image', url: 'https://itzeazy.in/blog/wp-content/uploads/2021/08/istockphoto-1073597286-612x612-1.webp' },
        { title: 'Back Image', url: 'https://itzeazy.in/blog/wp-content/uploads/2021/08/istockphoto-1073597286-612x612-1.webp' },
    ];
    const CSVImage = [
        { title: 'CSV Image', url: 'https://assets-global.website-files.com/6064b31ff49a2d31e0493af1/63ff784daa460f472e688fb0_csv%20(2).png' },
        // Add more image URLs as needed
    ];

    // static datas.
    const aadhaarImages = [
        { title: 'Front Image', url: 'https://aadhaarcard.co.in/wp-content/uploads/2023/04/sample-aadhaar-card-800x445.png' },
        { title: 'Back Image', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyA2pOjWYdRfr-xZvpweeaE1mGRr6YX9LQhiaSWsqOKuevz0R2k-prIT3UoE0cFaV-tUA&usqp=CAU' },
        // Add more image URLs as needed
    ];
    const pancardImages = [
        { title: 'Front Image', url: 'https://www.pancardapp.com/blog/wp-content/uploads/2019/04/sample-pan-card.jpg' },
        { title: 'Back Image', url: 'https://static.abplive.com/wp-content/uploads/sites/2/2017/11/15100034/Pan-Card-1.jpg?impolicy=abp_cdn&imwidth=640' },
        // Add more image URLs as needed
    ];

    // states.
    const [profileImg, setprofileImg] = useState<any>([]);
    const [drivinglicenseImg, setDrivingLicenseImg] = useState<any>([]);
    const [aadharImages, setAadharImg] = useState<any>([]);
    const [panImages, setPanImg] = useState<any>([]);

    const maxNumber = 69;

    // handle image upload.
    const handleProfileImg = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setprofileImg(imageList as never[]);
    };
    // handle image upload.
    const handleDrivingLicenseImg = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setDrivingLicenseImg(imageList as never[]);
    };

    // handle image upload.
    const handleAadharImg = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setAadharImg(imageList as never[]);
    };
    // handle image upload.
    const handlePanImgImg = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setPanImg(imageList as never[]);
    };

    const [modal9, setmodal9] = useState(false);
    const [updatedStatus, setUpdatedStatus] = useState(false);

    const handleAddUpdateStatus = (selectedItem: any) => {
        if (selectedItem === 'Approved') {
            setUpdatedStatus(true);
        } else if (selectedItem === 'Reject') {
            setUpdatedStatus(false);
        }
        setmodal9(false); // Close the modal after selection
    };

    // State for PAN update status
    const [modalPAN, setModalPAN] = useState(false);
    const [updatedStatusPAN, setUpdatedStatusPAN] = useState(false);

    const handleAddUpdateStatusPAN = (selectedItem: any) => {
        if (selectedItem === 'Approved') {
            setUpdatedStatusPAN(true);
        } else if (selectedItem === 'Reject') {
            setUpdatedStatusPAN(false);
        }
        setModalPAN(false); // Close the modal after selection
    };

    const [modalDrivingLicense, setModalDrivingLicense] = useState(false);
    const [updatedStatusDrivingLicense, setUpdatedStatusDrivingLicense] = useState(false);

    const handleAddUpdateStatusDrivingLicense = (selectedItem: any) => {
        if (selectedItem === 'Approved') {
            setUpdatedStatusDrivingLicense(true);
        } else if (selectedItem === 'Reject') {
            setUpdatedStatusDrivingLicense(false);
        }
        setModalDrivingLicense(false); // Close the modal after selection
    };

    return (
        <>
            <h1 className="text-2xl  font-bold mt-6">Documents</h1>
            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6 ">
                <div className="lg:w-1/2">
                    {viewSpecific ? (
                        <div>
                            <label htmlFor="cancelledCQImages" className="block mb-1 text-md font-bold">
                                Profile
                            </label>
                            {profileImage?.map((data, ind) => {
                                return (
                                    <div key={data.title} className="w-1/2">
                                        <label htmlFor={data.title} className="block mb-1 text-md font-bold">
                                            {data.title}
                                        </label>
                                        <div className="w-full  mt-3 relative">
                                            <img src={data.url} alt="Pan" className="object-cover cursor-pointer rounded-md shadow-md border" />
                                            <a href={data.url} target="_blank" rel="noopener">
                                                <div className="absolute inset-0 flex items-center rounded-md cursor-pointer justify-center gap-2 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 text-white hover:font-bold text-center hover:underline">
                                                    View in Detail <FaArrowUpRightFromSquare />
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="mb-5">
                            <div className="custom-file-container" data-upload-id="mySecondImage">
                                <div className="label-container">
                                    <label>
                                        Upload <span className="text-black text-md font-bold"> - Profile Image</span>{' '}
                                    </label>
                                    <button
                                        type="button"
                                        className="custom-file-container__image-clear"
                                        title="Clear Image"
                                        onClick={() => {
                                            setprofileImg([]);
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                                <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                                <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                <ImageUploading multiple value={profileImg} onChange={handleProfileImg} maxNumber={maxNumber}>
                                    {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                                        <div className="upload__image-wrapper">
                                            <div className="custom-file-container__custom-file__custom-file-control" onClick={onImageUpload}>
                                                Choose File...
                                            </div>
                                            &nbsp;
                                            <div className="grid gap-4 sm:grid-cols-3 grid-cols-1">
                                                {Array.isArray(imageList) &&
                                                    imageList.map((image, index) => (
                                                        <div key={index} className="custom-file-container__image-preview relative">
                                                            <button
                                                                type="button"
                                                                className="custom-file-container__image-clear bg-dark-light dark:bg-dark dark:text-white-dark rounded-full block w-fit p-0.5 absolute top-0 left-0"
                                                                title="Clear Image"
                                                                onClick={() => onImageRemove(index)}
                                                            >
                                                                <IconX className="w-3 h-3" />
                                                            </button>
                                                            <img src={image.dataURL} alt="img" className="object-cover shadow rounded w-full !max-h-48" />
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    )}
                                </ImageUploading>
                            </div>
                        </div>
                    )}
                    {/* <CarouselModel event={modal1} closeModal={() => setModal1(false)} title={'Profile Image'} files={profileImage} /> */}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between items-start gap-5 mt-6 mb-6">
                <div className="lg:w-1/2">
                    {viewSpecific ? (
                        <label htmlFor="drivingLicense" className="block mb-1 text-md font-bold ">
                            Driving License Number
                            <div className="flex flex-row items-center justify-between">
                                {updatedStatusDrivingLicense ? <MdCheckBox className="text-green-600 text-lg" /> : <FaTimesCircle className="text-red-600 text-lg" />}
                                <button className="btn btn-primary block sm:inline-block text-center mt-0 px-2 py-1 text-xs" onClick={() => setModalDrivingLicense(true)}>
                                    Update Status
                                </button>
                            </div>
                        </label>
                    ) : (
                        <label htmlFor="drivingLicense" className="block mb-1 text-md font-bold">
                            Driving License Number
                        </label>
                    )}
                    <input
                        name="Pancard"
                        type="text"
                        id="Pancard"
                        placeholder={`${viewSpecific ? `` : `Enter Pancard`}`}
                        className={`form-input w-full mt-3 ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        // value={details.aadhar}
                        value="DL14 20110012345"
                        // onChange={onInputChange}
                    />
                </div>

                <UpdateStatus event={modalDrivingLicense} closeModal={() => setModalDrivingLicense(false)} onSubmit={handleAddUpdateStatusDrivingLicense} />
                <div className="lg:w-1/2 ">
                    <label htmlFor="cancelledCQImages" className="block mb-1 text-md font-bold">
                        Driving License Image
                    </label>
                    {viewSpecific ? (
                        <div className="flex gap-6">
                            {drivinglicenseImage?.map((data, ind) => {
                                return (
                                    <div key={data.title} className="w-1/2">
                                        <label htmlFor={data.title} className="block mb-1 text-md font-bold">
                                            {data.title}
                                        </label>
                                        <div className="w-full  mt-3 relative">
                                            <img src={data.url} alt="Pan" className="object-cover cursor-pointer rounded-md shadow-md border" />
                                            <a href={data.url} target="_blank" rel="noopener">
                                                <div className="absolute inset-0 flex items-center rounded-md cursor-pointer justify-center gap-2 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 text-white hover:font-bold text-center hover:underline">
                                                    View in Detail <FaArrowUpRightFromSquare />
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="mb-5">
                            <div className="custom-file-container" data-upload-id="mySecondImage">
                                <div className="label-container">
                                    <label>
                                        Upload <span className="text-black text-md font-bold "> - Driving License Card Image</span>{' '}
                                    </label>
                                    <button
                                        type="button"
                                        className="custom-file-container__image-clear"
                                        title="Clear Image"
                                        onClick={() => {
                                            setDrivingLicenseImg([]);
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                                <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                                <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                <ImageUploading multiple value={drivinglicenseImg} onChange={handleDrivingLicenseImg} maxNumber={maxNumber}>
                                    {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                                        <div className="upload__image-wrapper">
                                            <div className="custom-file-container__custom-file__custom-file-control" onClick={onImageUpload}>
                                                Choose File...
                                            </div>
                                            &nbsp;
                                            <div className="grid gap-4 sm:grid-cols-3 grid-cols-1">
                                                {Array.isArray(imageList) &&
                                                    imageList.map((image, index) => (
                                                        <div key={index} className="custom-file-container__image-preview relative">
                                                            <button
                                                                type="button"
                                                                className="custom-file-container__image-clear bg-dark-light dark:bg-dark dark:text-white-dark rounded-full block w-fit p-0.5 absolute top-0 left-0"
                                                                title="Clear Image"
                                                                onClick={() => onImageRemove(index)}
                                                            >
                                                                <IconX className="w-3 h-3" />
                                                            </button>
                                                            <img src={image.dataURL} alt="img" className="object-cover shadow rounded w-full !max-h-48" />
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    )}
                                </ImageUploading>
                            </div>
                        </div>
                    )}
                </div>
                {/* <CarouselModel event={modal2} closeModal={() => setmodal2(false)} title={'drivinglicense'} files={drivinglicenseImage} /> */}
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between items-start gap-5 mt-6 mb-6">
                <div className="lg:w-1/2">
                    {viewSpecific ? (
                        <>
                            <label htmlFor="aadharCard" className="mb-1 text-xl font-bold flex flex-row gap-4">
                                Aadhar
                            </label>
                            <div className="flex flex-row items-center justify-between h-5">
                                <label htmlFor="aadharCard" className="mb-1 text-md font-bold flex flex-row gap-4">
                                    Aadhar Card Number
                                    <div className="flex flex-row items-center justify-between">
                                        {updatedStatus ? <MdCheckBox className="text-green-600 text-lg" /> : <FaTimesCircle className="text-red-600 text-lg" />}
                                    </div>
                                </label>
                                <div className="flex flex-row gap-3">
                                    <button className="btn btn-primary block sm:inline-block text-center mt-0 px-2 py-1 text-xs" onClick={() => setmodal9(true)}>
                                        Update Status
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <label htmlFor="aadharCard" className="block mb-1 text-md font-bold">
                            Aadhar Card Number
                        </label>
                    )}
                    <input
                        name="aadhar"
                        type="text"
                        id="aadhar"
                        placeholder={`${viewSpecific ? `` : `Enter Aadhar`}`}
                        className={`form-input w-full mt-3 ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        // value={details.aadhar}
                        value="34678934778379"
                        // onChange={onInputChange}
                    />
                </div>
                {/* <UpdateStatus event={modal9} closeModal={() => setmodal9(false)} onSubmit={handleAddUpdateStatus} /> */}

                <div className="lg:w-1/2">
                    {viewSpecific && (
                        <label htmlFor="cancelledCQImages" className="block mb-1 text-md font-bold">
                            Aadhar Image
                        </label>
                    )}
                    {viewSpecific ? (
                        <div className="flex gap-6">
                            {aadhaarImages?.map((data, ind) => {
                                return (
                                    <div key={data.title} className="w-1/2">
                                        <label htmlFor={data.title} className="block mb-1 text-md font-bold">
                                            {data.title}
                                        </label>
                                        <div className="w-full  mt-3 relative">
                                            <img src={data.url} alt="Pan" className="object-cover cursor-pointer rounded-md shadow-md border" />
                                            <a href={data.url} target="_blank" rel="noopener">
                                                <div className="absolute inset-0 flex items-center rounded-md cursor-pointer justify-center gap-2 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 text-white hover:font-bold text-center hover:underline">
                                                    View in Detail <FaArrowUpRightFromSquare />
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="mb-5">
                            <div className="custom-file-container" data-upload-id="mySecondImage">
                                <div className="label-container">
                                    <label>
                                        Upload <span className="text-black text-md font-bold"> - Aadhar Card Image</span>{' '}
                                    </label>
                                    <button
                                        type="button"
                                        className="custom-file-container__image-clear"
                                        title="Clear Image"
                                        onClick={() => {
                                            setAadharImg([]);
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                                <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                                <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                <ImageUploading multiple value={aadharImages} onChange={handleAadharImg} maxNumber={maxNumber}>
                                    {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                                        <div className="upload__image-wrapper">
                                            <div className="custom-file-container__custom-file__custom-file-control" onClick={onImageUpload}>
                                                Choose File...
                                            </div>
                                            &nbsp;
                                            <div className="grid gap-4 sm:grid-cols-3 grid-cols-1">
                                                {Array.isArray(imageList) &&
                                                    imageList.map((image, index) => (
                                                        <div key={index} className="custom-file-container__image-preview relative">
                                                            <button
                                                                type="button"
                                                                className="custom-file-container__image-clear bg-dark-light dark:bg-dark dark:text-white-dark rounded-full block w-fit p-0.5 absolute top-0 left-0"
                                                                title="Clear Image"
                                                                onClick={() => onImageRemove(index)}
                                                            >
                                                                <IconX className="w-3 h-3" />
                                                            </button>
                                                            <img src={image.dataURL} alt="img" className="object-cover shadow rounded w-full !max-h-48" />
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    )}
                                </ImageUploading>
                            </div>
                        </div>
                    )}
                </div>
                {/* <CarouselModel event={modal3} closeModal={() => setmodal3(false)} title={'pancard'} files={aadhaarImages} /> */}
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between items-start gap-5 mt-6 mb-6">
                <div className="lg:w-1/2">
                    {viewSpecific ? (
                        <label htmlFor="panCard" className="block mb-1 text-md font-bold ">
                            PAN Card Number
                            <div className="flex flex-row items-center justify-between">
                                {updatedStatusPAN ? <MdCheckBox className="text-green-600 text-lg" /> : <FaTimesCircle className="text-red-600 text-lg" />}
                                <button className="btn btn-primary block sm:inline-block text-center mt-0 px-2 py-1 text-xs" onClick={() => setModalPAN(true)}>
                                    Update Status
                                </button>
                            </div>
                        </label>
                    ) : (
                        <label htmlFor="panCard" className="block mb-1 text-md font-bold">
                            PAN Card Number
                        </label>
                    )}
                    <input
                        name="panCard"
                        type="text"
                        id="panCard"
                        placeholder={viewSpecific ? '' : 'Enter PAN Card Number'}
                        className={`form-input w-full mt-3 ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={`${viewSpecific ? 'pan - 512635127162' : details.panCard}`}
                        onChange={onInputChange}
                    />
                </div>
                <UpdateStatus event={modalPAN} closeModal={() => setModalPAN(false)} onSubmit={handleAddUpdateStatusPAN} />

                <div className="lg:w-1/2">
                    {viewSpecific && (
                        <label htmlFor="cancelledCQImages" className="block mb-1 text-md font-bold">
                            PAN Image
                        </label>
                    )}
                    {viewSpecific ? (
                        <div className="flex gap-6">
                            {pancardImages?.map((data, ind) => (
                                <div key={data.title} className="w-1/2">
                                    <label htmlFor={data.title} className="block mb-1 text-md font-bold">
                                        {data.title}
                                    </label>
                                    <div className="w-full  mt-3 relative">
                                        <img src={data.url} alt="Pan" className="object-cover cursor-pointer rounded-md shadow-md border" />
                                        <a href={data.url} target="_blank" rel="noopener">
                                            <div className="absolute inset-0 flex items-center rounded-md cursor-pointer justify-center gap-2 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 text-white hover:font-bold text-center hover:underline">
                                                View in Detail <FaArrowUpRightFromSquare />
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="mb-5">
                            <div className="custom-file-container" data-upload-id="myPanImage">
                                <div className="label-container">
                                    <label>
                                        Upload <span className="text-black text-md font-bold"> - PAN Card Image</span>{' '}
                                    </label>
                                    <button
                                        type="button"
                                        className="custom-file-container__image-clear"
                                        title="Clear Image"
                                        onClick={() => {
                                            setPanImg([]);
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                                <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                                <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                <ImageUploading multiple value={panImages} onChange={handlePanImgImg} maxNumber={maxNumber}>
                                    {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                                        <div className="upload__image-wrapper">
                                            <div className="custom-file-container__custom-file__custom-file-control" onClick={onImageUpload}>
                                                Choose File...
                                            </div>
                                            &nbsp;
                                            <div className="grid gap-4 sm:grid-cols-3 grid-cols-1">
                                                {Array.isArray(imageList) &&
                                                    imageList.map((image, index) => (
                                                        <div key={index} className="custom-file-container__image-preview relative">
                                                            <button
                                                                type="button"
                                                                className="custom-file-container__image-clear bg-dark-light dark:bg-dark dark:text-white-dark rounded-full block w-fit p-0.5 absolute top-0 left-0"
                                                                title="Clear Image"
                                                                onClick={() => onImageRemove(index)}
                                                            >
                                                                <IconX className="w-3 h-3" />
                                                            </button>
                                                            <img src={image.dataURL} alt="img" className="object-cover shadow rounded w-full !max-h-48" />
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    )}
                                </ImageUploading>
                            </div>
                        </div>
                    )}
                </div>

                {/* <CarouselModel event={modal4} closeModal={() => setmodal4(false)} title={'PAN'} files={pancardImages} /> */}
            </div>
        </>
    );
};

export default ServiceProviderDocLayout;
