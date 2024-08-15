import React, { useState, ChangeEvent } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

interface EmailTemplateModuleProps {
    details: {
        title: string;
        email: string;
        emailSubject: string;
        message: string;
        archive: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean;
    viewSpecific?: boolean;
}

const EmailTemplateModule: React.FC<EmailTemplateModuleProps> = ({ details, onInputChange, showStatus = true, viewSpecific }) => {
    const [moduleDetails, setModuleDetails] = useState(details);
    const [quillContent, setQuillContent] = useState('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setModuleDetails({ ...moduleDetails, [name]: value });
        onInputChange(event); // Pass the event to the parent component
    };

    const handleQuillChange = (content: string) => {
        setQuillContent(content);
    };

    const handleImageUpload = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append('image', file);

            // Replace 'your_upload_endpoint' with your actual image upload endpoint
            const response = await axios.post('your_upload_endpoint', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Assuming your server responds with the uploaded image URL
            const imageUrl = response.data.imageUrl;

            const editor = quillRef.current?.getEditor();
            if (editor) {
                const range = editor.getSelection(true);
                editor.insertEmbed(range.index, 'image', imageUrl);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const quillRef = React.useRef<ReactQuill>(null);

    return (
        <>
            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-5">
                <div className="lg:w-1/2">
                    <label htmlFor="title" className="block mb-1">
                        Title
                    </label>
                    <input
                        name="title"
                        type="title"
                        id="title"
                        placeholder="Enter title"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details?.title}
                        onChange={onInputChange}
                    />
                </div>

                <div className="lg:w-1/2">
                    <label htmlFor="email" className="block mb-1">
                        Email
                    </label>
                    <input
                        name="email"
                        type="text"
                        id="email"
                        placeholder="sample@gmail.com"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details?.email}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/2">
                    <label htmlFor="emailSubject" className="block mb-1">
                        Email Subject
                    </label>
                    <input
                        name="emailSubject"
                        type="text"
                        id="emailSubject"
                        placeholder="Type email subject.."
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details?.emailSubject}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-5">
                <div className="lg:w-1/2">
                    <label htmlFor="message" className="block mb-1">
                        Message
                    </label>
                    <ReactQuill
                        ref={quillRef}
                        value={quillContent}
                        onChange={handleQuillChange}
                        modules={{
                            toolbar: [['bold', 'italic', 'underline', 'strike'], [{ header: 1 }, { header: 2 }], [{ list: 'ordered' }, { list: 'bullet' }], ['link', 'image'], ['clean']],
                        }}
                    />
                </div>

                {showStatus && (
                    <div className="lg:w-1/2">
                        <label htmlFor="status" className="block mb-1">
                            Status
                        </label>
                        {viewSpecific ? (
                            <input name="status" type="text" id="status" placeholder="Enter Status" className="form-input w-full pointer-events-none" value={details.archive} readOnly />
                        ) : (
                            <input
                                name="status"
                                type="text"
                                id="status"
                                placeholder="Enter Status"
                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                readOnly={viewSpecific}
                                value={details.archive}
                                onChange={onInputChange}
                            />
                        )}
                    </div>
                )}
                {!showStatus && <div className="lg:w-1/3" />}
            </div>
        </>
    );
};

export default EmailTemplateModule;
