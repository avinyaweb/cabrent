import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import CarouselModel from '@/components/Carousel/CarouselModel';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import '../../../assets/css/file-upload-preview.css';
import IconX from '@/components/Icon/IconX';
import BankDocumentModuleInCH from './BankDocumentModuleInCH';
import UpdateStatus from '@/components/Models/UpdateStatus';
import { successAlert } from '@/utils/Toast';
import { FaTimesCircle } from 'react-icons/fa';
import { MdCheckBox } from 'react-icons/md';
import IconEdit from '@/components/Icon/IconEdit';

interface AdminProps {
    details: {
        profileImage: string;
        aadharCard: string;
        aadharImages: string;
        panImages: string;
        panCard: string;
        companyRegCertiImage: string;
        companyRegCertificate: string;
        gstImage: string;
        gst: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    viewSpecific?: boolean;
}

const ChannelPartnerDocModule: React.FC<AdminProps> = ({ details, onInputChange, viewSpecific }) => {
    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [modal3, setmodal3] = useState(false);
    const [modal4, setmodal4] = useState(false);
    const [modal7, setModal7] = useState(false);
    const [modal8, setModal8] = useState(false);

    // static datas.
    const aadhaarImages = [
        'https://aadhaarcard.co.in/wp-content/uploads/2023/04/sample-aadhaar-card-800x445.png',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyA2pOjWYdRfr-xZvpweeaE1mGRr6YX9LQhiaSWsqOKuevz0R2k-prIT3UoE0cFaV-tUA&usqp=CAU',
        // Add more image URLs as needed
    ];
    const pancardImages = [
        'https://www.pancardapp.com/blog/wp-content/uploads/2019/04/sample-pan-card.jpg',
        'https://static.abplive.com/wp-content/uploads/sites/2/2017/11/15100034/Pan-Card-1.jpg?impolicy=abp_cdn&imwidth=640',
        // Add more image URLs as needed
    ];

    const profileImage = [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9UdkG68P9AHESMfKJ-2Ybi9pfnqX1tqx3wQ&usqp=CAU',
        // Add more image URLs as needed
    ];
    const partnerLogo = [
        'https://images-platform.99static.com//fD27nVqSf6Em4oWhKx1cUzqfeNk=/0x0:2040x2040/fit-in/500x500/99designs-contests-attachments/125/125643/attachment_125643974',
        // Add more image URLs as needed
    ];

    // static datas.
    const gstImage = [
        'https://img.indiafilings.com/learn/wp-content/uploads/2017/07/12010420/Sample-Provisional-GST-Registration-Certificate.png',
        'https://taxheal.com/wp-content/uploads/2016/09/gst-certificate-format.png',
        // Add more image URLs as needed
    ];
    const companyRegCertiImage = [
        'https://www.udhamdigital.com/assets/uploads/startup-india-registration-banner.webp',
        'https://www.mylegalclinic.com/wp-content/uploads/2023/01/private-limited-company-certificate-of-incorporation-sample-5.png',
        // Add more image URLs as needed
    ];

    // states.
    const [profileImg, setprofileImg] = useState<any>([]);
    const [PartnerLogoImg, setPartnerLogoImg] = useState<any>([]);
    const [aadharImages, setAadharImg] = useState<any>([]);
    const [panImages, setPanImg] = useState<any>([]);

    const [companyRegCertiImg, setcompanyRegCertiImage] = useState<any>([]);
    const [gstImg, setgstImg] = useState<any>([]);

    const [aadharDetails, setAadharDetails] = useState({ aadharCard: '' });
    const [panDetails, setPanDetails] = useState({ panCard: '' });

    const [companyRegCertiDetails, setcompanyRegCertiDetails] = useState({ companyRegCertificate: '' });
    const [gstDeatails, setDeatails] = useState({ gst: '' });

    const maxNumber = 69;

    // handle image upload.
    const handleProfileImg = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setprofileImg(imageList as never[]);
    };
    // handle image upload.
    const handlePartnerLogoImg = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setPartnerLogoImg(imageList as never[]);
    };
    // handle image upload.
    const handleAadharImg = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setAadharImg(imageList as never[]);
    };

    const handlePanImg = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setPanImg(imageList as never[]);
    };

    // handle image upload.
    const handlegstImg = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setgstImg(imageList as never[]);
    };

    // handle image upload.
    const handleCompanyCerti = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setcompanyRegCertiImage(imageList as never[]);
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

    // State for company registration update status
    const [modalCompanyReg, setModalCompanyReg] = useState(false);
    const [updatedStatusCompanyReg, setUpdatedStatusCompanyReg] = useState(false);

    // State for GST number update status
    const [modalGSTNum, setModalGSTNum] = useState(false);
    const [updatedStatusGSTNum, setUpdatedStatusGSTNum] = useState(false);

    const handleAddUpdateStatusPAN = (selectedItem: any) => {
        if (selectedItem === 'Approved') {
            setUpdatedStatusPAN(true);
        } else if (selectedItem === 'Reject') {
            setUpdatedStatusPAN(false);
        }
        setModalPAN(false); // Close the modal after selection
    };

    const handleAddUpdateStatusCompanyReg = (selectedItem: any) => {
        if (selectedItem === 'Approved') {
            setUpdatedStatusCompanyReg(true);
        } else if (selectedItem === 'Reject') {
            setUpdatedStatusCompanyReg(false);
        }
        setModalCompanyReg(false); // Close the modal after selection
    };

    const handleAddUpdateStatusGSTNum = (selectedItem: any) => {
        if (selectedItem === 'Approved') {
            setUpdatedStatusGSTNum(true);
        } else if (selectedItem === 'Reject') {
            setUpdatedStatusGSTNum(false);
        }
        setModalGSTNum(false); // Close the modal after selection
    };

    return (
        <>
            {/* <div className="space-y-2 prose dark:prose-headings:text-white-dark mt-6 mb-6">
                <h2>Documents</h2>
            </div> */}

            {!viewSpecific ? (
                <div className="space-y-2 prose dark:prose-headings:text-white-dark mt-6 mb-6">
                    <h2>Documents</h2>
                </div>
            ) : (
                <></>
            )}

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6 mb-6">
                <div className="lg:w-1/2">
                    {viewSpecific ? (
                        <div>
                            <label htmlFor="cancelledCQImages" className="block mb-1 text-md font-bold">
                                Profile Image
                            </label>
                            {profileImage?.map((imgUrl, ind) => {
                                return (
                                    <img
                                        src={imgUrl}
                                        alt="Aadhar"
                                        key={ind}
                                        className="w-1/3 object-cover cursor-pointer rounded-md hover:scale-105 transition duration-300 shadow-md border"
                                        onClick={() => setModal1(true)}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <div className="mb-5">
                            <div className="custom-file-container" data-upload-id="mySecondImage">
                                <div className="label-container">
                                    <label>
                                        Upload <span className="text-black text-lg font-bold"> - Profile Image</span>{' '}
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
                                            <button className="custom-file-container__custom-file__custom-file-control" onClick={onImageUpload}>
                                                Choose File...
                                            </button>
                                            &nbsp;
                                            <div className="grid gap-4 sm:grid-cols-3 grid-cols-1">
                                                {imageList.map((image, index) => (
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
                    <CarouselModel event={modal1} closeModal={() => setModal1(false)} title={'Profile Image'} files={profileImage} />
                </div>
                <div className="lg:w-1/2">
                    {viewSpecific ? (
                        <div>
                            <label htmlFor="cancelledCQImages" className="block mb-1 text-md font-bold">
                                Partner Logo
                            </label>
                            {partnerLogo?.map((imgUrl, ind) => {
                                return (
                                    <img
                                        src={imgUrl}
                                        alt="Aadhar"
                                        key={ind}
                                        className="w-1/3 object-cover cursor-pointer rounded-md hover:scale-105 transition duration-300 shadow-md border"
                                        onClick={() => setModal2(true)}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <div className="mb-5">
                            <div className="custom-file-container" data-upload-id="mySecondImage">
                                <div className="label-container">
                                    <label className="block mb-1 text-md font-bold">
                                        Upload <span className="text-black text-lg font-bold"> - Partner Logo</span>{' '}
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
                                <ImageUploading multiple value={PartnerLogoImg} onChange={handlePartnerLogoImg} maxNumber={maxNumber}>
                                    {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                                        <div className="upload__image-wrapper">
                                            <div className="custom-file-container__custom-file__custom-file-control" onClick={onImageUpload}>
                                                Choose File...
                                            </div>
                                            &nbsp;
                                            <div className="grid gap-4 sm:grid-cols-3 grid-cols-1">
                                                {imageList.map((image, index) => (
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
                    <CarouselModel event={modal2} closeModal={() => setModal2(false)} title={'Logo Image'} files={partnerLogo} />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between items-start gap-5 mt-6 mb-6">
                <div className="lg:w-1/2">
                    {/* {viewSpecific ? (
                        <label htmlFor="aadharCard" className="block mb-1 text-md font-bold ">
                            Aadhar Card Number
                            <div className="flex flex-row items-center justify-between">
                                {updatedStatus ? <MdCheckBox className="text-green-600 text-lg" /> : <FaTimesCircle className="text-red-600 text-lg" />}
                                <button className="btn btn-primary block sm:inline-block text-center mt-0 px-2 py-1 text-xs" onClick={() => setmodal9(true)}>
                                    Update Status
                                </button>
                            </div>
                        </label>
                    ) : (
                        <label htmlFor="aadharCard" className="block mb-1 text-md font-bold">
                            Aadhar Card Number
                        </label>
                    )} */}

                    {viewSpecific ? (
                        <>
                            <label htmlFor="aadharCard" className="block mb-1 text-md font-bold flex flex-row gap-4">
                                Aadhar Card Number
                                <div className="flex flex-row items-center justify-between">
                                    {updatedStatus ? <MdCheckBox className="text-green-600 text-lg" /> : <FaTimesCircle className="text-red-600 text-lg" />}
                                </div>
                            </label>

                            <div className="flex flex-row items-center justify-between h-5">
                                <div className="cursor-pointer text-blue-500 text-1xl " onClick={() => setmodal9(true)}>
                                    <IconEdit />
                                </div>

                                {modal9 && (
                                    <div className="flex flex-row gap-3">
                                        <button className="btn btn-primary block sm:inline-block text-center mt-0 px-2 py-1 text-xs" onClick={() => handleAddUpdateStatus('Approved')}>
                                            Approved
                                        </button>
                                        <button className="btn btn-danger block sm:inline-block text-center mt-0 px-2 py-1 text-xs" onClick={() => handleAddUpdateStatus('Reject')}>
                                            Reject
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <label htmlFor="aadharCard" className="block mb-1 text-md font-bold">
                            Aadhar Card Number
                        </label>
                    )}

                    <input
                        name="aadharCard"
                        type="text"
                        id="aadharCard"
                        placeholder={`${viewSpecific ? `` : `Enter Aadhar Card Number`}`}
                        className={`form-input w-full mt-3 ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={aadharDetails.aadharCard}
                        onChange={onInputChange}
                    />
                </div>
                {/* <UpdateStatus event={modal9} closeModal={() => setmodal9(false)} onSubmit={handleAddUpdateStatus} /> */}
                <div className="lg:w-1/2 ">
                    {viewSpecific && (
                        <label htmlFor="cancelledCQImages" className="block mb-1 text-md font-bold">
                            Aadhar Image
                        </label>
                    )}
                    {viewSpecific ? (
                        <div className="flex gap-6 justify-around">
                            {aadhaarImages?.map((imgUrl, ind) => {
                                return (
                                    <img
                                        src={imgUrl}
                                        alt="Aadhar"
                                        className="w-1/3 object-cover cursor-pointer rounded-md hover:scale-105 transition duration-300 shadow-md border"
                                        onClick={() => setmodal3(true)}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <div className="mb-5">
                            <div className="custom-file-container" data-upload-id="mySecondImage">
                                <div className="label-container">
                                    <label>
                                        Upload <span className="text-black text-lg font-bold "> - Aadhar Card Image</span>{' '}
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
                                                {imageList.map((image, index) => (
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
                <CarouselModel event={modal3} closeModal={() => setmodal3(false)} title={'Aadhar'} files={aadhaarImages} />
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between items-start gap-5 mt-6 mb-6">
                <div className="lg:w-1/2">
                    {/* {viewSpecific ? (
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
                    )} */}

                    {viewSpecific ? (
                        <>
                            <label htmlFor="panCard" className="block mb-1 text-md font-bold flex flex-row gap-4">
                                PAN Card Number
                                <div className="flex flex-row items-center justify-between">
                                    {updatedStatusPAN ? <MdCheckBox className="text-green-600 text-lg" /> : <FaTimesCircle className="text-red-600 text-lg" />}
                                </div>
                            </label>

                            <div className="flex flex-row items-center justify-between h-5">
                                <div className="cursor-pointer text-blue-500 text-1xl " onClick={() => setModalPAN(true)}>
                                    <IconEdit />
                                </div>

                                <div>
                                    {modalPAN && (
                                        <div className="flex flex-row gap-3">
                                            <button className="btn btn-primary block sm:inline-block text-center mt-0 px-2 py-1 text-xs" onClick={() => handleAddUpdateStatusPAN('Approved')}>
                                                Approved
                                            </button>
                                            <button className="btn btn-danger block sm:inline-block text-center mt-0 px-2 py-1 text-xs" onClick={() => handleAddUpdateStatusPAN('Reject')}>
                                                Reject
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <label htmlFor="panCard" className="block mb-1 text-md font-bold">
                            PAN Card Number
                        </label>
                    )}

                    <input
                        name="panCard"
                        type="text"
                        id="panCard"
                        placeholder={`${viewSpecific ? `` : `Enter PAN Card Number`}`}
                        className={`form-input w-full mt-3 ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.panCard}
                        onChange={onInputChange}
                    />
                </div>
                {/* <UpdateStatus event={modalPAN} closeModal={() => setModalPAN(false)} onSubmit={handleAddUpdateStatusPAN} /> */}
                <div className="lg:w-1/2 ">
                    {viewSpecific && (
                        <label htmlFor="cancelledCQImages" className="block mb-1 text-md font-bold">
                            Pan Image
                        </label>
                    )}
                    {viewSpecific ? (
                        <div className="flex gap-6 justify-around">
                            {pancardImages?.map((imgUrl, ind) => {
                                return (
                                    <img
                                        src={imgUrl}
                                        alt="Pan"
                                        className="w-1/3 object-cover cursor-pointer rounded-md hover:scale-105 transition duration-300 shadow-md border"
                                        onClick={() => setmodal4(true)}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <div className="mb-5">
                            <div className="custom-file-container" data-upload-id="mySecondImage">
                                <div className="label-container">
                                    <label>
                                        Upload <span className="text-black text-lg font-bold"> - PAN Card Image</span>{' '}
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
                                <ImageUploading multiple value={panImages} onChange={handlePanImg} maxNumber={maxNumber}>
                                    {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                                        <div className="upload__image-wrapper">
                                            <div className="custom-file-container__custom-file__custom-file-control" onClick={onImageUpload}>
                                                Choose File...
                                            </div>
                                            &nbsp;
                                            <div className="grid gap-4 sm:grid-cols-3 grid-cols-1">
                                                {imageList.map((image, index) => (
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

                <CarouselModel event={modal4} closeModal={() => setmodal4(false)} title={'pan'} files={pancardImages} />
            </div>

            {/* company reg certifi and gst doc */}

            <div className="grid grid-cols-1 sm:flex justify-between items-start gap-5 mt-6 mb-6">
                <div className="lg:w-1/2">
                    {viewSpecific ? (
                        <label htmlFor="companyRegistration" className="block mb-1 text-md font-bold ">
                            Company Registration
                            <div className="flex flex-row items-center justify-between">
                                {updatedStatusCompanyReg ? <MdCheckBox className="text-green-600 text-lg" /> : <FaTimesCircle className="text-red-600 text-lg" />}
                                <button className="btn btn-primary block sm:inline-block text-center mt-0 px-2 py-1 text-xs" onClick={() => setModalCompanyReg(true)}>
                                    Update Status
                                </button>
                            </div>
                        </label>
                    ) : (
                        <label htmlFor="companyRegistration" className="block mb-1 text-md font-bold">
                            Company Registration
                        </label>
                    )}

                    <input
                        name="companyRegCertificate"
                        type="text"
                        id="companyRegCertificate"
                        placeholder={`${viewSpecific ? `` : `Enter Company Registration Certificate Number`}`}
                        className={`form-input w-full mt-3 ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={companyRegCertiDetails.companyRegCertificate}
                        onChange={onInputChange}
                    />
                </div>
                <UpdateStatus event={modalCompanyReg} closeModal={() => setModalCompanyReg(false)} onSubmit={handleAddUpdateStatusCompanyReg} />
                <div className="lg:w-1/2 ">
                    {viewSpecific && (
                        <label htmlFor="companyRegCertificateImages" className="block mb-1 text-md font-bold">
                            Company Registration Certificate
                        </label>
                    )}
                    {viewSpecific ? (
                        <div className="flex gap-6 justify-around">
                            {companyRegCertiImage?.map((imgUrl, ind) => {
                                return (
                                    <img
                                        src={imgUrl}
                                        alt="Company Registration Certificate"
                                        className="w-1/3 object-cover cursor-pointer rounded-md hover:scale-105 transition duration-300 shadow-md border"
                                        onClick={() => setModal7(true)}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <div className="mb-5">
                            <div className="custom-file-container" data-upload-id="companyRegCertificateImages">
                                <div className="label-container">
                                    <label>
                                        Upload <span className="text-black text-lg font-bold "> - Company Registration Certificate Image</span>{' '}
                                    </label>
                                    <button
                                        type="button"
                                        className="custom-file-container__image-clear"
                                        title="Clear Image"
                                        onClick={() => {
                                            setcompanyRegCertiImage([]);
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                                <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                                <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                <ImageUploading multiple value={companyRegCertiImg} onChange={handleCompanyCerti} maxNumber={maxNumber}>
                                    {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                                        <div className="upload__image-wrapper">
                                            <div className="custom-file-container__custom-file__custom-file-control" onClick={onImageUpload}>
                                                Choose File...
                                            </div>
                                            &nbsp;
                                            <div className="grid gap-4 sm:grid-cols-3 grid-cols-1">
                                                {imageList.map((image, index) => (
                                                    <div key={index} className="custom-file-container__image-preview relative">
                                                        <button
                                                            type="button"
                                                            className="custom-file-container__image-clear bg-dark-light dark:bg-dark dark:text-white-dark rounded-full block w-fit p-0.5 absolute top-0 left-0"
                                                            title="Clear Image"
                                                            onClick={() => onImageRemove(index)}
                                                        >
                                                            ×
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
                <CarouselModel event={modal7} closeModal={() => setModal7(false)} title={'Company Registration Certificate'} files={companyRegCertiImage} />
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between items-start gap-5 mt-6 mb-6">
                <div className="lg:w-1/2">
                    {viewSpecific ? (
                        <label htmlFor="gstNumber" className="block mb-1 text-md font-bold ">
                            GST Number
                            <div className="flex flex-row items-center justify-between">
                                {updatedStatusGSTNum ? <MdCheckBox className="text-green-600 text-lg" /> : <FaTimesCircle className="text-red-600 text-lg" />}
                                <button className="btn btn-primary block sm:inline-block text-center mt-0 px-2 py-1 text-xs" onClick={() => setModalGSTNum(true)}>
                                    Update Status
                                </button>
                            </div>
                        </label>
                    ) : (
                        <label htmlFor="gstNumber" className="block mb-1 text-md font-bold">
                            GST Number
                        </label>
                    )}

                    <input
                        name="gst"
                        type="text"
                        id="gst"
                        placeholder={`${viewSpecific ? `` : `Enter GST Number`}`}
                        className={`form-input w-full mt-3 ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={gstDeatails.gst}
                        onChange={onInputChange}
                    />
                </div>
                <UpdateStatus event={modalGSTNum} closeModal={() => setModalGSTNum(false)} onSubmit={handleAddUpdateStatusGSTNum} />
                <div className="lg:w-1/2 ">
                    {viewSpecific && (
                        <label htmlFor="gstImages" className="block mb-1 text-md font-bold">
                            GST Image
                        </label>
                    )}
                    {viewSpecific ? (
                        <div className="flex gap-6 justify-around">
                            {gstImage?.map((imgUrl, ind) => {
                                return (
                                    <img
                                        src={imgUrl}
                                        alt="GST"
                                        className="w-1/3 object-cover cursor-pointer rounded-md hover:scale-105 transition duration-300 shadow-md border"
                                        onClick={() => setModal8(true)}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <div className="mb-5">
                            <div className="custom-file-container" data-upload-id="gstImages">
                                <div className="label-container">
                                    <label>
                                        Upload <span className="text-black text-lg font-bold"> - GST Image</span>{' '}
                                    </label>
                                    <button
                                        type="button"
                                        className="custom-file-container__image-clear"
                                        title="Clear Image"
                                        onClick={() => {
                                            setgstImg([]);
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                                <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                                <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                <ImageUploading multiple value={gstImg} onChange={handlegstImg} maxNumber={maxNumber}>
                                    {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                                        <div className="upload__image-wrapper">
                                            <div className="custom-file-container__custom-file__custom-file-control" onClick={onImageUpload}>
                                                Choose File...
                                            </div>
                                            &nbsp;
                                            <div className="grid gap-4 sm:grid-cols-3 grid-cols-1">
                                                {imageList.map((image, index) => (
                                                    <div key={index} className="custom-file-container__image-preview relative">
                                                        <button
                                                            type="button"
                                                            className="custom-file-container__image-clear bg-dark-light dark:bg-dark dark:text-white-dark rounded-full block w-fit p-0.5 absolute top-0 left-0"
                                                            title="Clear Image"
                                                            onClick={() => onImageRemove(index)}
                                                        >
                                                            ×
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
                <CarouselModel event={modal8} closeModal={() => setModal8(false)} title={'gst'} files={gstImage} />
            </div>
        </>
    );
};

export default ChannelPartnerDocModule;
