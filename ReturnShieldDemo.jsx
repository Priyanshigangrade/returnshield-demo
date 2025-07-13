import React, { useState } from 'react';

export default function ReturnShieldDemo() {
  const [sellerImages, setSellerImages] = useState([null, null, null]);
  const [buyerImages, setBuyerImages] = useState([null, null, null]);
  const [result, setResult] = useState(null);

<<<<<<< HEAD
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
=======
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
>>>>>>> 43c9d7b8e6bc7e44fad77544e889b9fe8ed899aa
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
<<<<<<< HEAD
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
=======
        <h2>📦 Seller Product Upload</h2>
        {[0, 1, 2].map((i) => (
          <div key={i}>
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, i, true)} />
            {sellerImages[i] && <img src={sellerImages[i]} alt={`Seller ${i}`} width="100" />}
>>>>>>> 43c9d7b8e6bc7e44fad77544e889b9fe8ed899aa
          </div>
        ))}
      </div>

      <div className="card">
<<<<<<< HEAD
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
=======
        <h2>🔁 Buyer Return Upload</h2>
        {[0, 1, 2].map((i) => (
          <div key={i}>
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, i, false)} />
            {buyerImages[i] && <img src={buyerImages[i]} alt={`Buyer ${i}`} width="100" />}
>>>>>>> 43c9d7b8e6bc7e44fad77544e889b9fe8ed899aa
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