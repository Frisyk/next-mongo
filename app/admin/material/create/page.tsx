'use client'
import { addNewMaterial } from '@/lib/admin/materialAdmin';
import { useFormState } from 'react-dom';
import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { marked } from 'marked';
import { FaSave, FaMarkdown, FaBookOpen } from 'react-icons/fa';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllBabs } from '@/lib/admin/babAdmin';

export default function AddMaterial() {
  const [state, action] = useFormState(addNewMaterial, undefined);
  const [markdownContent, setMarkdownContent] = useState('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const [babTema, setBabTema] = useState('');
  const [babList, setBabList] = useState<Array<{_id: string, nama: string}>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // Load daftar bab ketika komponen dimuat
  useEffect(() => {
    async function loadBabs() {
      try {
        setIsLoading(true);
        const response = await getAllBabs();
        if (response.success) {
          setBabList(response.data);
        } else {
          toast.error(response.error || 'Gagal memuat daftar bab/tema');
        }
      } catch (error) {
        toast.error('Terjadi kesalahan saat memuat daftar bab/tema');
      } finally {
        setIsLoading(false);
      }
    }
    
    loadBabs();
  }, []);

  // Handle perubahan editor markdown
  function handleEditorChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setMarkdownContent(e.target.value);
  }

  // Generate slug otomatis dari title
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setSlug(newTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
  };

  // Render HTML dari markdown
  function renderHTML(text: string) {
    return marked(text);
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFileName(e.target.files[0].name);
    } else {
      setSelectedFileName('');
    }
  };

  return (
    <div className="min-h-screen p-6 flex flex-col w-full">
      <ToastContainer position="top-center" theme="colored" />
      
      <div className="mb-8 bg-white dark:bg-slate-800 shadow-md rounded-lg p-6 w-full">
        <h1 className="text-2xl font-bold mb-6 text-blue-600 flex items-center">
          <FaMarkdown className="mr-2" /> Tambah Materi Baru
        </h1>
        
        <form action={action} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Judul</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={handleTitleChange}
                className="w-full p-3 border dark:bg-slate-700 rounded-lg"
                placeholder="Masukkan judul materi"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Slug URL</label>
              <input
                type="text"
                name="slug"
                value={slug}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSlug(e.target.value)}
                className="w-full p-3 border dark:bg-slate-700 rounded-lg"
                placeholder="nama-url-materi"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Quiz ID (opsional)</label>
              <input
                type="text"
                name="quizPath"
                className="w-full p-3 border dark:bg-slate-700 rounded-lg"
                placeholder="ID quiz terkait (opsional)"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center">
                <FaBookOpen className="mr-2" /> Bab/Tema
              </label>
              {isLoading ? (
                <div className="w-full p-3 border dark:bg-slate-700 rounded-lg animate-pulse bg-gray-200 dark:bg-gray-600 h-12"></div>
              ) : (
                <select
                  name="bab"
                  value={babTema}
                  onChange={(e) => setBabTema(e.target.value)}
                  className="w-full p-3 border dark:bg-slate-700 rounded-lg"
                  required
                >
                  <option value="">Pilih Bab/Tema</option>
                  {babList.map((bab) => (
                    <option key={bab._id} value={bab.nama}>
                      {bab.nama}
                    </option>
                  ))}
                </select>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Bab/Tema digunakan untuk mengelompokkan materi
              </p>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Thumbnail</label>
            <div className="relative">
              <input
                ref={fileInputRef}
                type="file"
                name="imagePath"
                id="imageInput"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                required
                onChange={handleFileChange}
              />
              <div className="w-full p-3 border dark:bg-slate-700 rounded-lg flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400 truncate">
                  {selectedFileName || "Pilih file gambar..."}
                </span>
                <button 
                  type="button" 
                  className="bg-blue-500 text-white px-4 py-1 rounded"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Browse
                </button>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">Konten Materi (Markdown)</label>
              <button 
                type="button" 
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center text-sm text-blue-600 hover:text-blue-500"
              >
                {previewMode 
                  ? <><IoMdEyeOff className="mr-1" /> Edit Mode</> 
                  : <><IoMdEye className="mr-1" /> Preview Mode</>
                }
              </button>
            </div>
            
            {previewMode ? (
              <div 
                className="prose prose-sm md:prose-base lg:prose-lg max-w-none dark:prose-invert min-h-[500px] p-4 border rounded-lg bg-white dark:bg-slate-700 overflow-auto"
                dangerouslySetInnerHTML={{ __html: renderHTML(markdownContent) }}
              />
            ) : (
              <textarea
                name="content"
                value={markdownContent}
                onChange={handleEditorChange}
                className="w-full p-3 border dark:bg-slate-700 rounded-lg min-h-[500px] font-mono"
                placeholder="# Judul Utama&#10;&#10;Konten materi dalam format markdown..."
                required
              />
            )}
          </div>
          
          {/* Tag field hidden untuk meneruskan bab/tema sebagai tag */}
          <input 
            type="hidden" 
            name="tags" 
            value={babTema} 
          />
          
          {state?.error && (
            <div className="p-3 rounded-md bg-red-50 text-red-700">
              {state.error}
            </div>
          )}
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 font-medium flex items-center"
            >
              <FaSave className="mr-2" /> Simpan Materi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
