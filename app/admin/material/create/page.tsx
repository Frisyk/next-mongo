'use client'
import { addNewMaterialWithObject } from '@/lib/admin/materialAdmin';
import { useState, useRef, ChangeEvent, useEffect, FormEvent } from 'react';
import { marked } from 'marked';
import { FaSave, FaMarkdown, FaBookOpen } from 'react-icons/fa';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllBabs } from '@/lib/admin/babAdmin';
import ImageUpload from '@/components/ui/image-upload';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function AddMaterial() {
  const router = useRouter();
  const [markdownContent, setMarkdownContent] = useState('');
  const [title, setTitle] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const [babTema, setBabTema] = useState('');
  const [babList, setBabList] = useState<Array<{_id: string, nama: string}>>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

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

  // Render HTML dari markdown
  function renderHTML(text: string) {
    return marked(text);
  }

  // Submit form
  const submitMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !markdownContent || !babTema) {
      toast.error('Judul, konten, dan bab harus diisi');
      return;
    }

    try {
      setIsLoading(true);
      const result = await addNewMaterialWithObject({
        title,
        content: markdownContent,
        babId: babTema,
        thumbnail: thumbnailUrl || '',
      });

      if (result.success) {
        toast.success('Materi berhasil dibuat');
        router.push('/admin/material');
      } else {
        toast.error(`Gagal membuat materi: ${result.message}`);
      }
    } catch (error) {
      console.error('Error creating material:', error);
      toast.error('Terjadi kesalahan saat membuat materi');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-5">
      <ToastContainer position="top-center" theme="colored" />
      
      <h1 className="text-2xl font-bold mb-4">Tambah Materi Baru</h1>
      
      <form onSubmit={submitMaterial} className="w-full">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Judul Materi</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Masukkan judul materi"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Bab/Tema</label>
              <select
                value={babTema}
                onChange={(e) => setBabTema(e.target.value)}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Pilih Bab/Tema</option>
                {babList.map((bab) => (
                  <option key={bab._id} value={bab._id}>
                    {bab.nama}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Thumbnail Materi</label>
              <ImageUpload
                value={thumbnailUrl}
                onChange={setThumbnailUrl}
                onUploading={setIsUploading}
                folder="materials/thumbnails"
                maxSizeMB={2}
                className="h-64"
              />
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="mb-2 flex justify-between items-center">
              <label className="block text-sm font-medium">Konten Materi</label>
              <button
                type="button"
                onClick={() => setPreviewMode(!previewMode)}
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                {previewMode ? "Mode Edit" : "Mode Preview"}
              </button>
            </div>
            
            {previewMode ? (
              <div 
                className="prose h-96 overflow-auto p-4 border rounded bg-white"
                dangerouslySetInnerHTML={{ __html: renderHTML(markdownContent) }}
              />
            ) : (
              <textarea
                value={markdownContent}
                onChange={handleEditorChange}
                className="w-full p-3 border rounded h-96 font-mono"
                placeholder="Tulis konten dalam format markdown..."
                required
              />
            )}
          </div>
        </div>
        
        <div className="mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 flex items-center"
            disabled={isLoading || isUploading}
          >
            {(isLoading || isUploading) ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <FaSave className="mr-2" />
                <span>Simpan Materi</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
