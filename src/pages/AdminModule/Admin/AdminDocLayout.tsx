import React, { useState, ChangeEvent } from 'react';
import CarouselModel from '@/components/Carousel/CarouselModel';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import '../../../assets/css/file-upload-preview.css';
import IconX from '@/components/Icon/IconX';
import { MdCheckBox } from 'react-icons/md';
import { FaTimesCircle } from 'react-icons/fa';
import IconEdit from '@/components/Icon/IconEdit';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';

interface AdminProps {
    details: {
        profileImage: string;
        aadharCard: string;
        aadharImages: string;
        panImages: string;
        panCard: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    editableItem?: any;
    viewSpecific?: any;
    createAction: any;
}

const AdminDocLayout: React.FC<AdminProps> = ({ details, onInputChange, viewSpecific, editableItem, createAction }) => {
    // future code -->>
    // const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [modal1, setModal1] = useState(false);
    const [modal3, setmodal3] = useState(false);
    const [modal4, setmodal4] = useState(false);

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
        'https://res.cloudinary.com/do4lbzbdo/image/upload/v1714992568/Towner/xoz8nrrc8zqcg3ptxhn0.webp',
        // Add more image URLs as needed
    ];

    // states.
    const [profileImg, setprofileImg] = useState<any>([]);
    const [aadharImages, setAadharImg] = useState<any>([]);
    const [panImages, setPanImg] = useState<any>([]);
    const maxNumber = 69;

    // handle image upload.
    const handleProfileImg = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setprofileImg(imageList as never[]);
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

    const [modal10, setmodal10] = useState(false);
    const [updatedPanStatus, setupdatedPanStatus] = useState(false);

    const handleAddPANUpdateStatus = (selectedItem: any) => {
        if (selectedItem === 'Approved') {
            setupdatedPanStatus(true);
        } else if (selectedItem === 'Reject') {
            setupdatedPanStatus(false);
        }
        setmodal10(false); // Close the modal after selection
    };

    return (
        <>
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
                                    <div className="relative w-1/3">
                                        <img src={imgUrl} alt="Pan" className="object-cover cursor-pointer rounded-md shadow-md border" />
                                        <a href={imgUrl} target="_blank" rel="noopener">
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
                                    <>
                                        <button className="btn btn-primary block sm:inline-block text-center mt-0 px-2 py-1 text-xs" onClick={() => handleAddUpdateStatus('Approved')}>
                                            Approved
                                        </button>
                                        <button className="btn btn-danger block sm:inline-block text-center mt-0 px-2 py-1 text-xs" onClick={() => handleAddUpdateStatus('Reject')}>
                                            Reject
                                        </button>
                                    </>
                                </div>
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
                        placeholder={viewSpecific ? '' : 'Enter Aadhar Card Number'}
                        className={`form-input w-full mt-3 ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={`${viewSpecific ? '1273512635127162' : details.aadharCard}`}
                        onChange={onInputChange}
                    />
                </div>

                <div className="lg:w-1/2 ">
                    {viewSpecific && (
                        <label htmlFor="cancelledCQImages" className="block mb-1 text-xl font-bold">
                            Aadhar Document
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
                                        Upload <span className="text-black text-md font-bold "> - Aadhar Card Image</span>{' '}
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
                {/* <CarouselModel event={modal3} closeModal={() => setmodal3(false)} title={'Aadhar'} files={aadhaarImages} /> */}
                {/* <UpdateStatus event={modal9} closeModal={() => setmodal9(false)} onSubmit={handleAddUpdateStatus} /> */}
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between items-start gap-5 mt-6 mb-6">
                <div className="lg:w-1/2">
                    {viewSpecific ? (
                        <>
                            <label htmlFor="aadharCard" className="mb-1 text-xl font-bold flex flex-row gap-4">
                                Pan
                            </label>
                            <div className="flex flex-row items-center justify-between h-5">
                                <label htmlFor="aadharCard" className="mb-1 text-md font-bold flex flex-row gap-4">
                                    PAN Card Number
                                    <div className="flex flex-row items-center justify-between">
                                        {updatedPanStatus ? <MdCheckBox className="text-green-600 text-lg" /> : <FaTimesCircle className="text-red-600 text-lg" />}
                                    </div>
                                </label>
                                <div className="flex flex-row gap-3">
                                    <>
                                        <button className="btn btn-primary block sm:inline-block text-center mt-0 px-2 py-1 text-xs" onClick={() => handleAddPANUpdateStatus('Approved')}>
                                            Approved
                                        </button>
                                        <button className="btn btn-danger block sm:inline-block text-center mt-0 px-2 py-1 text-xs" onClick={() => handleAddPANUpdateStatus('Reject')}>
                                            Reject
                                        </button>
                                    </>
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
                        placeholder={viewSpecific ? '' : 'Enter PAN Card Number'}
                        className={`form-input w-full mt-3 ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={`${viewSpecific ? 'pan - 512635127162' : details.panCard}`}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/2 ">
                    {viewSpecific && (
                        <div className="flex gap-3 items-center">
                            <label htmlFor="cancelledCQImages" className="block mb-1 text-xl font-bold">
                                Pan Doc
                            </label>
                        </div>
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
        </>
    );
};

export default AdminDocLayout;
