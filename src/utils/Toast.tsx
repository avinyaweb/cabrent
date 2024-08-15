import { toast, ToastOptions } from 'react-hot-toast';

//--------------------------------------

export const errorAlert = async (message: string): Promise<void> => {
    toast.error(message, {
        position: 'top-center',
    });
};

export const successAlert = async (message: string): Promise<void> => {
    toast.success(message, {
        position: 'top-center',
        style: {
            zIndex: 9999,
        },
    });
};

export const warnAlert = async (message: string): Promise<void> => {
    toast.success(message, {
        style: {
            border: '1px solid #fff',
            padding: '11px',
            color: '#713200',
            backgroundColor: '#fae105',
        },
        iconTheme: {
            primary: '#d4c00d',
            secondary: '#FFFAEE',
        },
    } as ToastOptions);
};
