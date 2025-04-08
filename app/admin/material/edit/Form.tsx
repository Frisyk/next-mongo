'use client';
import { useState, useEffect, ChangeEvent, useRef } from 'react';
import { marked } from 'marked';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { FaSave, FaMarkdown, FaBookOpen } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { updateMaterial } from '@/lib/admin/materialAdmin';
import { getAllBabs } from '@/lib/admin/babAdmin';

export default function Form({m}: {m: string}) {
  const router = useRouter();
  const data = JSON.parse(m);
  
  // States
  const [title, setTitle] = useState<string>(data?.title || '');
  const [slug, setSlug] = useState<string>(data?.slug || '');
  const [content, setContent] = useState<string>(data?.content || '');
  const [previewMode, setPreviewMode] = useState<boolean>(false);
  const [babTema, setBabTema] = useState<string>(data?.tags?.[0] || '');
  const [babList, setBabList] = useState<Array<{_id: string, nama: string}>>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>(data?.thumbnail || '');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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
  
  // Title change handler
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // Slug change handler
  const handleSlugChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value);
  };

  // Content change handler
  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // Thumbnail change handler
  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  // Render HTML dari markdown
  const renderHTML = (markdown: string) => {
    return { __html: marked(markdown) };
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !slug || !content) {
      toast.error('Harap isi semua field yang diperlukan');
      return;
    }
    
    try {
      const formData = new FormData();
      formData.append('id', data._id);
      formData.append('title', title);
      formData.append('slug', slug);
      formData.append('content', content);
      formData.append('tags', babTema);
      
      if (thumbnail) {
        formData.append('thumbnail', thumbnail);
      }
      
      const response = await updateMaterial(formData);
      
      if (response.success) {
        toast.success('Material berhasil diperbarui');
        setTimeout(() => {
          router.push('/admin/material');
        }, 2000);
      } else {
        toast.error(response.error || 'Gagal memperbarui material');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat memperbarui material');
      console.error('Error updating material:', error);
    }
  };

  return (
    <div className="min-h-screen p-6 w-full">
      <ToastContainer position="top-center" theme="colored" />
      
      <div className="mb-8 bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 w-full">
        <h1 className="text-2xl font-bold mb-6 text-blue-600 flex items-center">
          <FaMarkdown className="mr-2" /> Edit Materi
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Judul</label>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                className="w-full p-3 border dark:bg-slate-700 rounded-lg"
                placeholder="Judul materi"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Slug URL</label>
              <input
                type="text"
                value={slug}
                onChange={handleSlugChange}
                className="w-full p-3 border dark:bg-slate-700 rounded-lg"
                placeholder="url-materi"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                URL yang akan digunakan untuk mengakses materi ini
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Quiz ID (opsional)</label>
              <input
                type="text"
                name="quizId"
                defaultValue={data?.quizId}
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
            <div className="mb-2">
              {thumbnailPreview && (
                <div className="relative w-40 h-40 overflow-hidden rounded-lg mb-2">
                  <img 
                    src={thumbnailPreview} 
                    alt="Thumbnail Preview" 
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
            </div>
            <div className="relative">
              <input
                ref={fileInputRef}
                type="file"
                id="thumbnail"
                onChange={handleThumbnailChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="w-full p-3 border dark:bg-slate-700 rounded-lg flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  {thumbnail ? thumbnail.name : "Pilih thumbnail baru (opsional)"}
                </span>
                <button 
                  type="button" 
                  className="bg-blue-500 text-white px-4 py-1 rounded"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Browse
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Biarkan kosong jika tidak ingin mengubah thumbnail
              </p>
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
                dangerouslySetInnerHTML={renderHTML(content)} 
              />
            ) : (
              <textarea
                value={content}
                onChange={handleContentChange}
                className="w-full p-3 border dark:bg-slate-700 rounded-lg min-h-[500px] font-mono"
                placeholder="# Judul Utama&#10;&#10;Konten materi dalam format markdown..."
                required
              />
            )}
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 font-medium flex items-center"
            >
              <FaSave className="mr-2" /> Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
