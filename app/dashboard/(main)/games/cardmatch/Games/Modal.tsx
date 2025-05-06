import Link from "next/link";
import { Sparkles } from 'lucide-react';

interface ModalComponentProps {
    showModal: boolean;
    nextGame: () => void;
  }
  
  const ModalComponent: React.FC<ModalComponentProps> = ({ showModal, nextGame }) => (
    <div className={!showModal ? "hidden" : "fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-50 backdrop-blur-sm"}>
      <div className="bg-white dark:bg-slate-800 p-5 rounded-lg m-5 shadow-xl animate-fadeIn transform transition-all duration-300 scale-100 dark:text-white">
        <div className="flex flex-col items-center mb-4">
          <Sparkles className="w-16 h-16 text-yellow-500 animate-pulse mb-2" />
          <p className="text-2xl text-blue-800 dark:text-blue-300 font-bold text-center">
            Selamat!! <br /> Kamu menyelesaikan semuanya 🎉✨
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <button 
            className="px-4 py-2 text-xl font-bold bg-blue-500 text-white rounded-lg outline hover:bg-blue-600 transition-all transform hover:scale-105" 
            onClick={nextGame}
          >
            Lanjut⏭️
          </button>
          <Link 
            className="px-4 py-2 text-xl flex items-center justify-center font-bold bg-transparent text-blue-800 dark:text-blue-300 rounded-lg outline border-2 border-blue-800 dark:border-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900 transition-all transform hover:scale-105" 
            href={'/dashboard/games/cardmatch'}
          >
            Kembali
          </Link>
        </div>
      </div>
    </div>
  );
  
  export default ModalComponent;
  