import { useState } from "react";

function ReturnShieldDemo() {
  const [sellerImages, setSellerImages] = useState([]);

  const handleSingleSellerImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const updatedImages = [...sellerImages];
    updatedImages[index] = file;
    setSellerImages(updatedImages);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Upload Seller Images (1-by-1)</h2>

      <div style={{ marginBottom: "15px" }}>
        <label>Image 1:</label><br />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleSingleSellerImageUpload(e, 0)}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Image 2:</label><br />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleSingleSellerImageUpload(e, 1)}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Image 3:</label><br />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleSingleSellerImageUpload(e, 2)}
        />
      </div>

      <h4>Uploaded Images Preview:</h4>
      <div style={{ display: "flex", gap: "10px" }}>
        {sellerImages.map((img, idx) =>
          img ? (
            <img
              key={idx}
              src={URL.createObjectURL(img)}
              alt={`seller-${idx}`}
              width="100"
              height="100"
            />
          ) : (
            <div
              key={idx}
              style={{
                width: "100px",
                height: "100px",
                border: "1px dashed gray",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "gray",
              }}
            >
              No Image
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default ReturnShieldDemo;
