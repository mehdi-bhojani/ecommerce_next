import { useState } from "react";
import { Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ecommerce_store"); // Your Cloudinary upload preset

    try {
      setUploading(true);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/ductyehjx/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      const imageUrl = data.secure_url;
      onChange(imageUrl);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div className=" flex flex-wrap items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[100px] h-[100px]">
            <div className="absolute top-0 right-0 z-10">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                size="sm"
                className="bg-red-600 text-white"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              src={url}
              alt="collection"
              className="object-cover rounded-lg"
              width={100}
              height={100}
            />
          </div>
        ))}
      </div>

      <input
        type="file"
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload">
        <Button
          type="button"
          onClick={() => document.getElementById("file-upload")?.click()}
          className="bg-secondary text-white"
          disabled={uploading}
        >
          {uploading ? (
            "Uploading..."
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Upload Image
            </>
          )}
        </Button>
      </label>
    </div>
  );
};

export default ImageUpload;
