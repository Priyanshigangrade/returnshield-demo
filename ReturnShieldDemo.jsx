import React, { useState } from 'react';

export default function ReturnShieldDemo() {
  const [sellerImages, setSellerImages] = useState([]);
  const [buyerImages, setBuyerImages] = useState([]);
  const [result, setResult] = useState(null);

  const handleImageUpload = (e, isSeller) => {
    const files = Array.from(e.target.files).slice(0, 3);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    isSeller ? setSellerImages(imageUrls) : setBuyerImages(imageUrls);
  };

  const checkFraud = () => {
    if (sellerImages.length === 3 && buyerImages.length === 3) {
      const match = Math.random() > 0.4;
      const score = match ? Math.floor(Math.random() * 15 + 85) : Math.floor(Math.random() * 30 + 40);
      setResult({ match, score });
    } else {
      alert("Upload 3 images from both Seller and Buyer side.");
    }
  };

  return (
    <div className="container">
      <h1>ReturnShield.AI Demo</h1>
      <p className="subtitle">Fraud Return Detection using Image Comparison</p>

      <div className="card">
        <h2>📦 Seller Product Upload</h2>
        <input type="file" accept="image/*" multiple onChange={(e) => handleImageUpload(e, true)} />
        <div className="image-row">
          {sellerImages.map((img, i) => (
            <img key={i} src={img} alt={`Seller ${i}`} />
          ))}
        </div>
      </div>

      <div className="card">
        <h2>🔁 Buyer Return Upload</h2>
        <input type="file" accept="image/*" multiple onChange={(e) => handleImageUpload(e, false)} />
        <div className="image-row">
          {buyerImages.map((img, i) => (
            <img key={i} src={img} alt={`Buyer ${i}`} />
          ))}
        </div>
      </div>

      <div className="center">
        <button onClick={checkFraud}>🔍 Check for Fraud</button>
      </div>

      {result && (
        <div className="card">
          <h2>🧠 AI Verdict</h2>
          <p>Match Status: {result.match ? "✅ Match (Genuine Return)" : "❌ Mismatch (Possible Fraud)"}</p>
          <p>Fraud Score: {result.score}%</p>
        </div>
      )}
    </div>
  );
}
