import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import '../../../assets/css/file-upload-preview.css';
import IconX from '@/components/Icon/IconX';
import CarouselModel from '@/components/Carousel/CarouselModel';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';

interface BankAccountProps {
    details: {
        accountNumber: string;
        panNumber: string;
        voterId: string;
        aadhar: string;
        verificationHistory: string;
        archive: string;
        approvedBy: string;
        approvedAt: string;
        createdBy: string;
        createdAt: string;
        updatedBy: string;
        updatedAt: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean; // New prop to conditionally show/hide status
    viewSpecific?: boolean;
}

const BankDocumentModuleInCH: React.FC<BankAccountProps> = ({ details, onInputChange, showStatus = true, viewSpecific }) => {
    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [modal5, setModal5] = useState(false);
    const [modal6, setModal6] = useState(false);

    const BankPBImages = [{ title: 'Front Image', url: 'https://rightma.com/wp-content/uploads/2023/02/PNB.png' }];
    const cancelledCQImages = [{ title: 'Front Image', url: 'https://corpseeds.blob.core.windows.net/corpseed/Cancelled_Cheque.png' }];

    // states.
    const [bankPBImage, setBankPBImage] = useState<any>([]);
    const [cancelledCQImage, setCancelledCQImage] = useState<any>([]);
    const maxNumber = 69;

    // handle image upload.
    const handleBankPBImg = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setBankPBImage(imageList as never[]);
    };
    // handle image upload.
    const handleChequeImg = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setCancelledCQImage(imageList as never[]);
    };

    return (
        <>
            <div>
                <div className="grid grid-cols-1 sm:flex justify-between items-start gap-5 mt-6 mb-6">
                    {viewSpecific ? (
                        <div className="lg:w-1/2 ">
                            <label htmlFor="cancelledCQImages" className="block mb-1 text-xl font-bold">
                                Passbook
                            </label>
                            <label htmlFor="cancelledCQImages" className="block mb-1 text-md font-bold">
                                Passbook Doc
                            </label>
                            {BankPBImages?.map((data, ind) => {
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
                        <div className="lg:w-1/2">
                            <div className="mb-5">
                                <div className="custom-file-container" data-upload-id="mySecondImage">
                                    <div className="label-container">
                                        <label>
                                            Upload <span className="text-black font-bold text-lg"> - Bank Pass Book Image</span>{' '}
                                        </label>
                                        {bankPBImage.length > 0 ? (
                                            <button
                                                type="button"
                                                className="custom-file-container__image-clear"
                                                title="Clear Image"
                                                onClick={() => {
                                                    setBankPBImage([]);
                                                }}
                                            >
                                                ×
                                            </button>
                                        ) : null}
                                    </div>
                                    <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                                    <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                    <ImageUploading multiple value={bankPBImage} onChange={handleBankPBImg} maxNumber={maxNumber}>
                                        {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                                            <div className="upload__image-wrapper">
                                                <div className="custom-file-container__custom-file__custom-file-control cursor-pointer " onClick={onImageUpload}>
                                                    Choose File
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
                        </div>
                    )}
                    {/* ==== */}

                    {viewSpecific ? (
                        <div className="lg:w-1/2">
                            <label htmlFor="cancelledCQImages" className="block mb-1 text-xl font-bold">
                                Cancelled Doc
                            </label>
                            <label htmlFor="cancelledCQImages" className="block mb-1 text-md font-bold">
                                Cancelled Cheque Image
                            </label>
                            {cancelledCQImages?.map((data, ind) => {
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
                        <div className="lg:w-1/2">
                            <div className="mb-5">
                                <div className="custom-file-container" data-upload-id="mySecondImage">
                                    <div className="label-container">
                                        <label>
                                            Upload <span className="text-black font-bold text-lg"> - Cancelled Cheque Image</span>{' '}
                                        </label>
                                        {cancelledCQImage.length > 0 ? (
                                            <button
                                                type="button"
                                                className="custom-file-container__image-clear"
                                                title="Clear Image"
                                                onClick={() => {
                                                    setCancelledCQImage([]);
                                                }}
                                            >
                                                ×
                                            </button>
                                        ) : null}
                                    </div>
                                    <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                                    <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                    <ImageUploading multiple value={cancelledCQImage} onChange={handleChequeImg} maxNumber={maxNumber}>
                                        {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                                            <div className="upload__image-wrapper">
                                                <div className="custom-file-container__custom-file__custom-file-control cursor-pointer " onClick={onImageUpload}>
                                                    Choose File
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
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:flex justify-between gap-5 my-14">
                    <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                        <label htmlFor="accountHolderName" className="block mb-1 text-md font-bold">
                            Account Holder Name
                        </label>
                        <input
                            name="accountHolderName"
                            type="text"
                            id="accountHolderName"
                            placeholder={viewSpecific ? '' : 'Account Holder Name'}
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value=" solution"
                            onChange={onInputChange}
                        />
                    </div>

                    <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                        <label htmlFor="accountNumber" className="block mb-1 text-md font-bold">
                            Account Number
                        </label>
                        <input
                            name="accountNumber"
                            type="text"
                            id="accountNumber"
                            placeholder={viewSpecific ? '' : 'Account Number'}
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value="123456789"
                            onChange={onInputChange}
                        />
                    </div>

                    <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                        <label htmlFor="branchName" className="block mb-1 text-md font-bold">
                            Branch Name
                        </label>
                        <input
                            name="branchName"
                            type="text"
                            id="branchName"
                            placeholder={viewSpecific ? '' : 'Branch Name'}
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value="Main Street Branch"
                            onChange={onInputChange}
                        />
                    </div>

                    <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                        <label htmlFor="ifscCode" className="block mb-1 text-md font-bold">
                            IFSC Code
                        </label>
                        <input
                            name="ifscCode"
                            type="text"
                            id="ifscCode"
                            placeholder={viewSpecific ? '' : 'IFSC Code'}
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value="ABC123DEF"
                            onChange={onInputChange}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default BankDocumentModuleInCH;
