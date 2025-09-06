import React, { useState, useEffect, useRef } from 'react';
import { X, Upload } from 'lucide-react';

interface ImageUploadModalProps {
  show: boolean;
  onClose: () => void;
  onUploadComplete: () => void;
}

export const ImageUploadModal: React.FC<ImageUploadModalProps> = ({ 
  show, 
  onClose, 
  onUploadComplete 
}) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Focus management for accessibility
  useEffect(() => {
    if (show) {
      // Focus the close button when modal opens
      closeButtonRef.current?.focus();
      
      // Trap focus within modal
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [show, onClose]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Please select an image smaller than 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFindSimilar = () => {
    onClose();
    onUploadComplete();
    setUploadedImage(null);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" aria-hidden="true"></div>
      <div 
        ref={modalRef}
        className="relative bg-white rounded-2xl p-6 w-full max-w-md mx-auto shadow-xl"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 id="modal-title" className="text-lg font-semibold text-gray-900">
            Find Similar Lights
          </h3>
          <button 
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close modal"
            className="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-offset-2"
          >
            <X className="w-6 h-6 text-gray-400" aria-hidden="true" />
          </button>
        </div>
        
        <p id="modal-description" className="text-sm text-gray-600 mb-4">
          Upload a photo of lighting you like and we'll help you find similar products in our catalog.
        </p>
        
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-400 transition-colors">
            {uploadedImage ? (
              <div className="space-y-4">
                <img 
                  src={uploadedImage} 
                  alt="Uploaded lighting image for search" 
                  className="w-32 h-32 object-cover rounded-lg mx-auto shadow-md" 
                />
                <p className="text-sm text-gray-600">Image uploaded successfully! Analyzing...</p>
                <button 
                  onClick={handleFindSimilar}
                  className="bg-green-800 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 font-medium"
                >
                  Find Similar Products
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="w-12 h-12 text-gray-400 mx-auto" aria-hidden="true" />
                <div>
                  <p className="text-gray-600 mb-4">Upload a photo of lighting you like</p>
                  <label className="bg-green-800 text-white px-6 py-3 rounded-lg cursor-pointer inline-block hover:bg-green-700 transition-colors focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 font-medium">
                    Choose Photo
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      className="sr-only"
                      aria-label="Upload image file"
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-2">
                    Supports JPG, PNG, WebP. Max size: 5MB
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};