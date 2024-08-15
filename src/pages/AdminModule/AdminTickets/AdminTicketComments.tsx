import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaPaperclip, FaTrash } from 'react-icons/fa'; // Importing icons from react-icons
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface CommentFormValues {
    id: number;
    content: string;
    userId: string; // Assuming you have a user ID associated with comments
    attachedImage?: string; // Optional field for attached image URL
    attachedFile?: File | null; // Optional field for attached file
}

const AdminTicketComments: React.FC = () => {
    const [comments, setComments] = useState<CommentFormValues[]>([]);
    const [formData, setFormData] = useState<CommentFormValues>({
        id: 0,
        content: '',
        userId: '', // Initialize with the current user's ID if applicable
        attachedImage: '', // Initially empty, can be updated when an image is attached
        attachedFile: null, // Initially null, will be updated when a file is attached
    });

    const handleInputChange = (value: string) => {
        setFormData({ ...formData, content: value });
    };

    const handlePostComment = () => {
        if (formData.content.trim() !== '') {
            const newComment = { ...formData, id: comments.length + 1 };
            setComments([...comments, newComment]);
            setFormData({
                id: 0,
                content: '',
                userId: '',
                attachedImage: '',
                attachedFile: null,
            });
            toast.success('Comment Posted Successfully.');
        } else {
            toast.error('Please enter a valid comment.');
        }
    };

    const handleDeleteComment = (id: number) => {
        const updatedComments = comments.filter((comment) => comment.id !== id);
        setComments(updatedComments);
        toast.success('Comment Deleted Successfully.');
    };

    return (
        <>
            <div className="mt-6">
                <label htmlFor="description" className="block mb-1">
                    Comment box
                </label>
                <ReactQuill theme="snow" value={formData.content} onChange={handleInputChange} placeholder="Enter description" />
            </div>
            <div className="mt-2">
                <button onClick={handlePostComment} type="submit" className="btn btn-primary !mt-6 mr-4 btn-green">
                    Post Comment
                </button>
            </div>

            <div className="mt-6">
                {comments.map((comment) => (
                    <div key={comment.id} className="border p-3 mb-2 flex justify-between items-center">
                        <div dangerouslySetInnerHTML={{ __html: comment.content }} />
                        <button onClick={() => handleDeleteComment(comment.id)} className="bg-red-500 text-white px-3 py-1">
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default AdminTicketComments;
