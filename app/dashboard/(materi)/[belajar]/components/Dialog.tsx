'use client'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


export const confirmEndTest = (handleSubmit : () => Promise<void>) => {    
    toast.warn(
            <div className="flex flex-col p-4 relative items-center justify-center bg-gray-800 border border-gray-800 shadow-lg rounded-2xl">
                <div className="text-center p-3 flex-auto justify-center">
                    <h2 className="text-xl font-bold py-4 text-gray-200">Apakah Anda yakin?</h2>
                    <p className="text-sm text-gray-500 px-2">
                        Apakah Anda yakin ingin mengakhiri ujian?  
                    </p>
                </div>
                <div className="p-2 mt-2 w-full text-center space-x-1 md:block">
                    <button
                        onClick={() => {
                            handleSubmit();
                            toast.dismiss();
                        }}
                        className="bg-green-400 hover:bg-green-500 px-5 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-green-300 hover:border-green-500 text-white rounded-full transition ease-in duration-300"
                    >
                        Ya
                    </button>
                    <button
                        onClick={() => toast.dismiss()}
                        className="mb-2 md:mb-0 bg-gray-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border-2 border-gray-600 hover:border-gray-700 text-gray-300 rounded-full hover:shadow-lg hover:bg-gray-800 transition ease-in duration-300"
                    >
                        Batal
                    </button>
                </div>
            </div>,
        {
            theme: 'dark',
            position: 'top-center',
            autoClose: false,
            icon: false,
            closeOnClick: false,
            draggable: false,
        }
    );
};
