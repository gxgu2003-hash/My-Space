import { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProjectById } from '@/data/projects';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Folder, 
  Upload, 
  X, 
  FileText, 
  Image as ImageIcon,
  Download,
  Trash2
} from 'lucide-react';
import Footer from '@/components/Footer';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface UploadedImage {
  id: string;
  url: string;
  name: string;
}

interface UploadedFile {
  id: string;
  name: string;
  url: string;
  type: string;
}

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = id ? getProjectById(id) : undefined;
  
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  
  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load saved data from localStorage
  useEffect(() => {
    if (id) {
      const savedImages = localStorage.getItem(`project_${id}_images`);
      const savedFiles = localStorage.getItem(`project_${id}_files`);
      if (savedImages) setImages(JSON.parse(savedImages));
      if (savedFiles) setFiles(JSON.parse(savedFiles));
    }
  }, [id]);

  // Save to localStorage when data changes
  useEffect(() => {
    if (id) {
      localStorage.setItem(`project_${id}_images`, JSON.stringify(images));
    }
  }, [images, id]);

  useEffect(() => {
    if (id) {
      localStorage.setItem(`project_${id}_files`, JSON.stringify(files));
    }
  }, [files, id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-pixel-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-pixel text-2xl text-pixel-dark mb-4">项目未找到</h1>
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-pixel text-sm text-pixel-orange hover:underline"
          >
            <ArrowLeft size={16} />
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const newImage: UploadedImage = {
            id: Date.now().toString() + Math.random().toString(),
            url: event.target?.result as string,
            name: file.name,
          };
          setImages((prev) => [...prev, newImage]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files;
    if (!uploadedFiles) return;

    Array.from(uploadedFiles).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newFile: UploadedFile = {
          id: Date.now().toString() + Math.random().toString(),
          name: file.name,
          url: event.target?.result as string,
          type: file.type,
        };
        setFiles((prev) => [...prev, newFile]);
      };
      reader.readAsDataURL(file);
    });
  };

  const deleteImage = (imageId: string) => {
    setImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  const deleteFile = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const openImageViewer = (url: string) => {
    setSelectedImage(url);
    setIsImageDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-pixel-bg">
      {/* Header */}
      <div className="pt-24 pb-8 px-4">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 font-pixel text-sm text-pixel-dark hover:text-pixel-orange transition-colors mb-6"
          >
            <ArrowLeft size={18} />
            返回
          </button>

          {/* Project Header Card */}
          <div className="bg-pixel-paper border-2 border-pixel-dark rounded-xl p-6 md:p-8 shadow-pixel relative">
            {/* Pin */}
            <div className="absolute -top-3 left-8 w-5 h-5 bg-pixel-pink rounded-full border-2 border-pixel-dark" />

            {/* Category Badge */}
            <div className="mb-4">
              <span
                className={`font-pixel text-xs px-3 py-1 rounded-full border-2 border-pixel-dark ${
                  project.category === 'structure'
                    ? 'bg-pixel-green text-white'
                    : 'bg-pixel-pink text-white'
                }`}
              >
                {project.category === 'structure' ? '结构' : '艺术'}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-pixel text-2xl md:text-3xl text-pixel-dark mb-4">
              {project.name}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 text-sm text-pixel-dark/70 mb-6">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-pixel-orange" />
                <span>{project.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-pixel-green" />
                <span>{project.location}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-pixel-dark/80 leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-8 px-4">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Project Details */}
          <section>
            <h2 className="font-pixel text-xl text-pixel-dark mb-4 flex items-center gap-2">
              <Folder size={20} className="text-pixel-orange" />
              项目详情
            </h2>
            <div className="bg-pixel-paper border-2 border-pixel-dark rounded-xl p-6 shadow-pixel-sm">
              <ul className="space-y-3">
                {project.details.map((detail, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-pixel-dark/80"
                  >
                    <span className="w-2 h-2 bg-pixel-orange rounded-full mt-2 flex-shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Project Images */}
          <section>
            <h2 className="font-pixel text-xl text-pixel-dark mb-4 flex items-center gap-2">
              <ImageIcon size={20} className="text-pixel-green" />
              项目图片
            </h2>
            
            {/* Default Project Image */}
            <div className="mb-6">
              <div 
                className="bg-pixel-paper border-2 border-pixel-dark rounded-xl overflow-hidden shadow-pixel-sm cursor-pointer"
                onClick={() => openImageViewer(project.image)}
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-64 md:h-80 object-cover hover:scale-105 transition-transform"
                />
              </div>
            </div>

            {/* Uploaded Images */}
            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="relative group bg-pixel-paper border-2 border-pixel-dark rounded-lg overflow-hidden shadow-pixel-sm"
                  >
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-full h-32 object-cover cursor-pointer"
                      onClick={() => openImageViewer(image.url)}
                    />
                    <button
                      onClick={() => deleteImage(image.id)}
                      className="absolute top-2 right-2 p-1 bg-pixel-dark/80 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload Images Button */}
            <div className="flex justify-center">
              <input
                type="file"
                ref={imageInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                multiple
                className="hidden"
              />
              <button
                onClick={() => imageInputRef.current?.click()}
                className="inline-flex items-center gap-2 font-pixel text-sm bg-pixel-green text-white px-6 py-3 border-2 border-pixel-dark rounded-lg btn-press"
              >
                <Upload size={18} />
                上传图片
              </button>
            </div>
          </section>

          {/* Project Files */}
          <section>
            <h2 className="font-pixel text-xl text-pixel-dark mb-4 flex items-center gap-2">
              <FileText size={20} className="text-pixel-pink" />
              项目文件
            </h2>

            {/* File List */}
            {files.length > 0 && (
              <div className="bg-pixel-paper border-2 border-pixel-dark rounded-xl p-4 mb-6 shadow-pixel-sm">
                <div className="space-y-2">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-3 bg-pixel-bg rounded-lg border border-pixel-dark/20"
                    >
                      <div className="flex items-center gap-3">
                        <FileText size={20} className="text-pixel-orange" />
                        <span className="text-sm text-pixel-dark truncate max-w-[200px] md:max-w-md">
                          {file.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={file.url}
                          download={file.name}
                          className="p-2 text-pixel-green hover:bg-pixel-green/10 rounded transition-colors"
                        >
                          <Download size={18} />
                        </a>
                        <button
                          onClick={() => deleteFile(file.id)}
                          className="p-2 text-pixel-pink hover:bg-pixel-pink/10 rounded transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload Files Button */}
            <div className="flex justify-center">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                multiple
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 font-pixel text-sm bg-pixel-pink text-white px-6 py-3 border-2 border-pixel-dark rounded-lg btn-press"
              >
                <Upload size={18} />
                上传文件
              </button>
            </div>
          </section>
        </div>
      </div>

      <Footer />

      {/* Image Viewer Dialog */}
      <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
          {selectedImage && (
            <div className="relative">
              <img
                src={selectedImage}
                alt="Preview"
                className="w-full h-auto rounded-lg border-4 border-pixel-dark"
              />
              <button
                onClick={() => setIsImageDialogOpen(false)}
                className="absolute -top-4 -right-4 p-2 bg-pixel-dark text-white rounded-full border-2 border-white"
              >
                <X size={20} />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
