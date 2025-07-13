import React, { useState } from 'react';

export default function ReturnShieldDemo() {
  const [sellerImages, setSellerImages] = useState([null, null, null]);
  const [buyerImages, setBuyerImages] = useState([null, null, null]);
  const [result, setResult] = useState(null);

  const handleImageChange = (e, index, side) => {
    const file = e.target.files[0];
    const imageUrl = file ? URL.createObjectURL(file) : null;

    const newImages = side === 'seller' ? [...sellerImages] : [...buyerImages];
    newImages[index] = { file, url: imageUrl };

    if (side === 'seller') {
      setSellerImages(newImages);
    } else {
      setBuyerImages(newImages);
    }

    setResult(null); // reset result on image change
  };

  const checkFraud = () => {
    if (result) return; // don't change result again

    const allSellerUploaded = sellerImages.every(img => img && img.file);
    const allBuyerUploaded = buyerImages.every(img => img && img.file);

    if (!allSellerUploaded || !allBuyerUploaded) {
      alert("Please upload all 3 images from Seller and Buyer.");
      return;
    }

    let isMatch = true;
    for (let i = 0; i < 3; i++) {
      if (sellerImages[i].file.name !== buyerImages[i].file.name) {
        isMatch = false;
        break;
      }
    }

    setResult({
      match: isMatch,
      score: isMatch ? 98 : 51
    });
  };

  return (
    <div className="container" style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>ReturnShield.AI Demo</h1>
      <p>Fraud Detection using Separate Image Inputs</p>

      <div className="card">
        <h2>📦 Seller Image Uploads</h2>
        {[0, 1, 2].map(index => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, index, 'seller')}
            />
            {sellerImages[index]?.url && (
              <img src={sellerImages[index].url} alt={`Seller ${index}`} width="100" />
            )}
          </div>
        ))}
      </div>

      <div className="card">
        <h2>🔁 Buyer Image Uploads</h2>
        {[0, 1, 2].map(index => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, index, 'buyer')}
            />
            {buyerImages[index]?.url && (
              <img src={buyerImages[index].url} alt={`Buyer ${index}`} width="100" />
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px' }}>
        <button onClick={checkFraud} style={{ padding: '10px 20px', fontSize: '16px' }}>
          🔍 Check for Fraud
        </button>
      </div>

      {result && (
        <div className="card" style={{ marginTop: '20px' }}>
          <h2>🧠 AI Result</h2>
          <p>Match Status: {result.match ? '✅ Match (Genuine)' : '❌ Mismatch (Possible Fraud)'}</p>
          <p>Fraud Score: {result.score}%</p>
        </div>
      )}
    </div>
  );
}