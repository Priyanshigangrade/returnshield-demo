<div>
  <label>Upload Seller Images (3 angles):</label><br />

  <input type="file" accept="image/*" onChange={(e) => handleSingleSellerImageUpload(e, 0)} /><br />
  <input type="file" accept="image/*" onChange={(e) => handleSingleSellerImageUpload(e, 1)} /><br />
  <input type="file" accept="image/*" onChange={(e) => handleSingleSellerImageUpload(e, 2)} />
</div>
const handleSingleSellerImageUpload = (e, index) => {
  const file = e.target.files[0];
  if (!file) return;
  const updatedImages = [...sellerImages];
  updatedImages[index] = file;
  setSellerImages(updatedImages);
};
