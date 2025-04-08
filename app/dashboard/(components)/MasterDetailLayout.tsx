'use client'

import React, { useState, ReactNode, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface MasterDetailLayoutProps {
  masterView: ReactNode;
  detailView: ReactNode | null;
  onCloseDetail?: () => void;
}

export default function MasterDetailLayout({
  masterView,
  detailView,
  onCloseDetail,
}: MasterDetailLayoutProps) {
  const [isDetailOpenMobile, setIsDetailOpenMobile] = useState(false);

  useEffect(() => {
    if (detailView) {
      setIsDetailOpenMobile(true);
    } 
    // Note: Tidak otomatis menutup saat detailView jadi null,
    // agar animasi exit bisa berjalan saat navigasi kembali.
    // Penutupan di-handle oleh user atau onCloseDetail.
  }, [detailView]);

  const closeDetailMobile = () => {
    setIsDetailOpenMobile(false);
    if (onCloseDetail) {
      onCloseDetail(); 
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.2 } } // Durasi exit backdrop
  };

  const modalVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20, mass: 0.8 } },
    exit: { y: "100%", opacity: 0, transition: { duration: 0.3, ease: "easeIn" } }
  };

  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* Master View */}
      <div 
        className={`w-full md:w-1/3 lg:w-[350px] flex-shrink-0 border-r border-gray-200 dark:border-slate-700 overflow-y-auto transition-transform duration-300 ease-in-out ${isDetailOpenMobile ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}
      > 
        {masterView}
      </div>

      {/* Detail View - Desktop */}
      <div className="hidden md:block flex-1 overflow-y-auto bg-gray-50 dark:bg-slate-900/50">
        {detailView ? (
          <div className="h-full">{detailView}</div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400 px-4 text-center">
            Pilih Bab dari daftar di samping untuk melihat materinya.
          </div>
        )}
      </div>

      {/* Detail View - Mobile Modal */}
      <AnimatePresence>
        {isDetailOpenMobile && detailView && (
          <motion.div 
            key="backdrop"
            className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeDetailMobile} 
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
         {isDetailOpenMobile && detailView && (
            <motion.div
                key="modal"
                className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-800 rounded-t-2xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <div className="flex justify-end p-2 border-b border-gray-200 dark:border-slate-700 flex-shrink-0">
                    <button onClick={closeDetailMobile} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <span className="sr-only">Tutup</span>
                        <FaTimes className="w-5 h-5" />
                    </button>
                </div>
                <div className="overflow-y-auto flex-grow">
                    {detailView}
                </div>
            </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
} 