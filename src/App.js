import React, { useState } from "react";
import "./App.css"
function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = () => {
    if (!longUrl) {
      alert("Please enter a URL");
      return;
    }

    // for now just simulate a shortened URL (later we call backend)
    const fakeShortUrl = "http://short.ly/" + Math.random().toString(36).substring(7);
    setShortUrl(fakeShortUrl);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>URL Shortener</h2>
      <input
        type="text"
        placeholder="Enter your long URL"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        style={{ width: "300px", padding: "10px" }}
      />
      <button
        onClick={handleShorten}
        style={{ marginLeft: "10px", padding: "10px" }}
      >
        Shorten
      </button>

      {shortUrl && (
        <div style={{ marginTop: "20px" }}>
          <p>Short URL:</p>
          <a href={longUrl} target="_blank" rel="noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
