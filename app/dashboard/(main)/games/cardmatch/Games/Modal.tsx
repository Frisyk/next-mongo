import Link from "next/link";

interface ModalComponentProps {
    showModal: boolean;
    nextGame: () => void;
  }
  
  const ModalComponent: React.FC<ModalComponentProps> = ({ showModal, nextGame }) => (
    <div className={!showModal ? "hidden" : "fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"}>
      <div className="bg-white p-5 rounded-lg m-5">
        <p className="text-2xl text-blue-800 font-bold">Selamat!! <br /> Kamu menyelesaikan semuanya 🎉✨</p>
        <div className="flex justify-between mt-4 m-5">
          <button className="px-4 py-2 text-xl font-bold bg-blue-500 text-white rounded outline hover:bg-blue-600 mr-2" onClick={nextGame}>
            Lanjut⏭️
          </button>
          <Link className="px-4 py-2 text-xl flex items-center font-bold bg-transparent text-blue-800 rounded outline" href={'/dashboard/quest/cardmatch'}>
            Kembali
          </Link>
        </div>
      </div>
    </div>
  );
  
  export default ModalComponent;
  