import React, { useState } from 'react';

export default function ReturnShieldDemo() {
  const [sellerImages, setSellerImages] = useState([null, null, null]);
  const [buyerImages, setBuyerImages] = useState([null, null, null]);
  const [result, setResult] = useState(null);

  const handleImageUpload = (e, index, isSeller) => {
    const file = e.target.files[0];
    const imageUrl = file ? URL.createObjectURL(file) : null;

    if (isSeller) {
      const newImages = [...sellerImages];
      newImages[index] = imageUrl;
      setSellerImages(newImages);
    } else {
      const newImages = [...buyerImages];
      newImages[index] = imageUrl;
      setBuyerImages(newImages);
    }
  };

  const checkFraud = () => {
    if (sellerImages.every(Boolean) && buyerImages.every(Boolean)) {
      const match = Math.random() > 0.4;
      const score = match ? Math.floor(Math.random() * 15 + 85) : Math.floor(Math.random() * 30 + 40);
      setResult({ match, score });
    } else {
      alert("Please upload all 3 images for both Seller and Buyer.");
    }
  };

  return (
    <div className="container">
      <h1>ReturnShield.AI Demo</h1>
      <p className="subtitle">Fraud Return Detection using Image Comparison</p>

      <div className="card">
        <h2>📦 Seller Product Upload</h2>
        {[0, 1, 2].map((i) => (
          <div key={i}>
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, i, true)} />
            {sellerImages[i] && <img src={sellerImages[i]} alt={`Seller ${i}`} width="100" />}
          </div>
        ))}
      </div>

      <div className="card">
        <h2>🔁 Buyer Return Upload</h2>
        {[0, 1, 2].map((i) => (
          <div key={i}>
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, i, false)} />
            {buyerImages[i] && <img src={buyerImages[i]} alt={`Buyer ${i}`} width="100" />}
          </div>
        ))}
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
