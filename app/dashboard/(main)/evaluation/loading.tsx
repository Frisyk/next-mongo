export default function Loader() {
    return (
        <div className="w-full flex justify-center items-center">
            <div className="relative w-20 h-12">
                <span className="absolute top-0 text-sm text-[#C8B6FF] animate-text">loading</span>
                <span className="absolute bottom-0 w-4 h-4 bg-[#9A79FF] rounded-full transform translate-x-16 animate-loading">
                <span className="absolute w-full h-full bg-[#D1C2FF] rounded-full animate-loading2"></span>
                </span>
            </div>
        </div>
    );
  }
  