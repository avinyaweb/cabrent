import React, { useState, ChangeEvent } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import '../../../assets/css/file-upload-preview.css';
import IconX from '@/components/Icon/IconX';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';

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
    // static datas.
    const aadhaarImages = [
        { title: 'Front Image', url: 'https://res.cloudinary.com/do4lbzbdo/image/upload/v1714992305/Towner/vzbvqyl0kdm9tfjuhdi7.png' },
        { title: 'Back Image', url: 'https://res.cloudinary.com/do4lbzbdo/image/upload/v1714992304/Towner/vinpc4laditmom8agjlu.png' },
        // Add more image URLs as needed
    ];
    const pancardImages = [
        { title: 'Front Image', url: 'https://res.cloudinary.com/do4lbzbdo/image/upload/v1714992486/Towner/alygwdtvef9pecm4eobz.jpg' },
        { title: 'Back Image', url: 'https://res.cloudinary.com/do4lbzbdo/image/upload/v1714992486/Towner/r66w5ty2sorza4uksol9.avif' },
    ];

    const profileImage = [
        { title: 'Front Image', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9UdkG68P9AHESMfKJ-2Ybi9pfnqX1tqx3wQ&usqp=CAU' },
        // Add more image URLs as needed
    ];
    const partnerLogo = [
        { title: 'Front Image', url: 'https://images-platform.99static.com//fD27nVqSf6Em4oWhKx1cUzqfeNk=/0x0:2040x2040/fit-in/500x500/99designs-contests-attachments/125/125643/attachment_125643974' },

        // Add more image URLs as needed
    ];

    // static datas.
    const gstImage = [
        { title: 'Front Image', url: 'https://img.indiafilings.com/learn/wp-content/uploads/2017/07/12010420/Sample-Provisional-GST-Registration-Certificate.png' },
        { title: 'Front Image', url: 'https://taxheal.com/wp-content/uploads/2016/09/gst-certificate-format.png' },

        // Add more image URLs as needed
    ];
    const companyRegCertiImage = [
        { title: 'Front Image', url: 'https://www.udhamdigital.com/assets/uploads/startup-india-registration-banner.webp' },
        { title: 'Front Image', url: 'https://www.mylegalclinic.com/wp-content/uploads/2023/01/private-limited-company-certificate-of-incorporation-sample-5.png' },
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

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6 mb-6 ">
                <div className="lg:w-1/2">
                    {viewSpecific ? (
                        <div>
                            <label htmlFor="cancelledCQImages" className="block mb-1 text-xl font-bold">
                                Profile
                            </label>
                            <label htmlFor="cancelledCQImages" className="block mb-1 text-md font-bold">
                                Profile Image
                            </label>
                            {profileImage?.map((data, ind) => {
                                return (
                                    <div className="relative w-1/3 gap-4 gap-y-2">
                                        <img src={data.url} alt="profile image" className="object-cover cursor-pointer rounded-md shadow-md border" />
                                        <a href={data.url} target="_blank" rel="noopener">
                                            <div className="absolute inset-0 flex items-center rounded-md cursor-pointer justify-center gap-2 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 text-white text-center hover:underline">
                                                View in Detail <FaArrowUpRightFromSquare />
                                            </div>
                                        </a>
                                    </div>
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
                </div>
                <div className="lg:w-1/2">
                    {viewSpecific ? (
                        <div>
                            <label htmlFor="cancelledCQImages" className="block mb-1 text-xl font-bold">
                                Distributor
                            </label>
                            <label htmlFor="cancelledCQImages" className="block mb-1 text-md font-bold">
                                Logo
                            </label>
                            {partnerLogo?.map((data, ind) => {
                                return (
                                    <div className="relative w-1/3 gap-4 gap-y-2">
                                        <img src={data?.url} alt="logo" className="object-cover cursor-pointer rounded-md shadow-md border" />
                                        <a href={data?.url} target="_blank" rel="noopener">
                                            <div className="absolute inset-0 flex items-center rounded-md cursor-pointer justify-center gap-2 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 text-white text-center hover:underline">
                                                View in Detail <FaArrowUpRightFromSquare />
                                            </div>
                                        </a>
                                    </div>
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
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between items-start gap-5 mt-6 mb-6">
                <div className="lg:w-1/2">
                    <label htmlFor="aadharCard" className="block mb-1 text-xl font-bold">
                        Aadhar
                    </label>
                    <label htmlFor="aadharCard" className="block mb-1 text-md font-bold">
                        Aadhar Card Number
                    </label>
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

                <div className="lg:w-1/2 ">
                    {viewSpecific && (
                        <label htmlFor="cancelledCQImages" className="block mb-1 text-xl font-bold">
                            Aadhar Doc
                        </label>
                    )}
                    {viewSpecific ? (
                        <div className="flex gap-3">
                            {aadhaarImages?.map((data, ind) => {
                                return (
                                    <div className="w-1/2">
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
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between items-start gap-5 mt-6 mb-6">
                <div className="lg:w-1/2">
                    <label htmlFor="aadharCard" className="mb-1 text-xl font-bold flex flex-row gap-4">
                        Pan
                    </label>
                    <label htmlFor="panCard" className="block mb-1 text-md font-bold">
                        PAN Card Number
                    </label>
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
                <div className="lg:w-1/2 ">
                    {viewSpecific && (
                        <label htmlFor="cancelledCQImages" className="block mb-1 text-xl font-bold">
                            Pan Doc
                        </label>
                    )}
                    {viewSpecific ? (
                        <div className="flex gap-3">
                            {pancardImages?.map((data, ind) => {
                                return (
                                    <div className="w-1/2">
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

                {/* <CarouselModel event={modal4} closeModal={() => setmodal4(false)} title={'pan'} files={pancardImages} /> */}
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between items-start gap-5 mt-6 mb-6">
                <div className="lg:w-1/2">
                    <label htmlFor="companyRegCertificate" className="block mb-1 text-xl font-bold">
                        Company Registration
                    </label>
                    <label htmlFor="companyRegCertificate" className="block mb-1 text-md font-bold">
                        Certificate Number
                    </label>
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

                <div className="lg:w-1/2 ">
                    {viewSpecific && (
                        <label htmlFor="companyRegCertificateImages" className="block mb-1 text-xl  font-bold">
                            Company Registration Doc
                        </label>
                    )}
                    {viewSpecific ? (
                        <div className="flex gap-3">
                            {companyRegCertiImage?.map((data, ind) => {
                                return (
                                    <div className="w-1/2">
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
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between items-start gap-5 mt-6 mb-6">
                <div className="lg:w-1/2">
                    <label htmlFor="gst" className="block mb-1 text-xl font-bold">
                        GST
                    </label>
                    <label htmlFor="gst" className="block mb-1 text-md font-bold">
                        GST Number
                    </label>
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
                <div className="lg:w-1/2 ">
                    {viewSpecific && (
                        <label htmlFor="gstImages" className="block mb-1 text-xl font-bold">
                            GST Doc
                        </label>
                    )}
                    {viewSpecific ? (
                        <div className="flex gap-3">
                            {gstImage?.map((data, ind) => {
                                return (
                                    <div className="w-1/2">
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
            </div>
        </>
    );
};

export default ChannelPartnerDocModule;
