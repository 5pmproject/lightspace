import React, { useState } from 'react';
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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
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

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="absolute inset-x-4 top-1/2 transform -translate-y-1/2 bg-white rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Find Similar Lights</h3>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
            {uploadedImage ? (
              <div className="space-y-4">
                <img src={uploadedImage} alt="Uploaded" className="w-32 h-32 object-cover rounded-lg mx-auto" />
                <p className="text-sm text-gray-600">Image uploaded! Analyzing...</p>
                <button 
                  onClick={handleFindSimilar}
                  className="bg-green-800 text-white px-4 py-2 rounded-lg"
                >
                  Find Similar Products
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-gray-600 mb-2">Upload a photo of lighting you like</p>
                  <label className="bg-green-800 text-white px-4 py-2 rounded-lg cursor-pointer inline-block">
                    Choose Photo
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};