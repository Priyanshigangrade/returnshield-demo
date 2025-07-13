import React, { useState } from 'react';

export default function ReturnShieldDemo() {
  const [sellerImages, setSellerImages] = useState([null, null, null]);
  const [buyerImages, setBuyerImages] = useState([null, null, null]);
  const [result, setResult] = useState(null);

  const handleImageChange = (e, index, type) => {
    const file = e.target.files[0];
    const imageUrl = file ? URL.createObjectURL(file) : null;

    const updatedImages = type === 'seller' ? [...sellerImages] : [...buyerImages];
    updatedImages[index] = { file, url: imageUrl };

    if (type === 'seller') {
      setSellerImages(updatedImages);
    } else {
      setBuyerImages(updatedImages);
    }

    setResult(null); // Reset result on any change
  };

  const checkFraud = () => {
    if (result) return; // prevent rechecking

    const allSeller = sellerImages.every(img => img && img.file);
    const allBuyer = buyerImages.every(img => img && img.file);

    if (!allSeller || !allBuyer) {
      alert("Please upload all 3 images for both seller and buyer.");
      return;
    }

    let matched = true;
    for (let i = 0; i < 3; i++) {
      if (sellerImages[i].file.name !== buyerImages[i].file.name) {
        matched = false;
        break;
      }
    }

    const score = matched ? 97 : 49;

    setResult({
      match: matched,
      score: score
    });
  };

  return (
    <div style={{ fontFamily: 'Arial', padding: '20px' }}>
      <h1>ReturnShield.AI Demo</h1>
      <p>Fraud Detection using AI-based Image Matching</p>

      {/* Seller Section */}
      <div style={{ marginBottom: '30px' }}>
        <h2>📦 Seller Side Upload</h2>
        {[0, 1, 2].map((_, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, index, 'seller')}
            />
            {sellerImages[index]?.url && (
              <img src={sellerImages[index].url} alt={`Seller ${index}`} width="100" style={{ marginTop: '5px' }} />
            )}
          </div>
        ))}
      </div>

      {/* Buyer Section */}
      <div style={{ marginBottom: '30px' }}>
        <h2>🔁 Buyer Side Upload</h2>
        {[0, 1, 2].map((_, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, index, 'buyer')}
            />
            {buyerImages[index]?.url && (
              <img src={buyerImages[index].url} alt={`Buyer ${index}`} width="100" style={{ marginTop: '5px' }} />
            )}
          </div>
        ))}
      </div>

      {/* Check Button */}
      <button
        onClick={checkFraud}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        🔍 Check for Fraud
      </button>

      {/* Result */}
      {result && (
        <div style={{ marginTop: '30px', border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
          <h2>🧠 AI Result</h2>
          <p>Match Status: {result.match ? '✅ Match (Genuine)' : '❌ Mismatch (Possible Fraud)'}</p>
          <p>Fraud Score: {result.score}%</p>
        </div>
      )}
    </div>
  );
}