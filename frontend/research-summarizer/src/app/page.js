"use client";
import { useState } from "react";
import styles from "./home.module.css";

export default function Home() {
  const [file, setFile] = useState(null);
  const [style, setStyle] = useState("Beginner-Friendly");
  const [length, setLength] = useState("Short (1-2 paragraphs)");
  const [summary, setSummary] = useState("");

  async function handleSummarize() {
    if (!file) {
      alert("Please upload a text file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("style_input", style);
    formData.append("length_input", length);

    const response = await fetch("http://127.0.0.1:8000/summarize", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setSummary(data.summary);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Research Summarizer</h1>

      <label className={styles.label}>Upload a .txt file:</label>
      <input
  type="file"
  accept=".txt,.pdf"
  onChange={(e) => setFile(e.target.files[0])}
  className={styles.input}
/>


      <div>
        <label className={styles.label}>Style:</label>
        <select className={styles.select} value={style} onChange={(e) => setStyle(e.target.value)}>
          <option>Beginner-Friendly</option>
          <option>Technical</option>
          <option>Code-Oriented</option>
          <option>Mathematical</option>
        </select>
      </div>

      <div>
        <label className={styles.label}>Length:</label>
        <select className={styles.select} value={length} onChange={(e) => setLength(e.target.value)}>
          <option>Short (1-2 paragraphs)</option>
          <option>Medium (3-5 paragraphs)</option>
          <option>Long (detailed explanation)</option>
        </select>
      </div>

      <button className={styles.button} onClick={handleSummarize}>Summarize</button>

      {summary && <div className={styles.summaryBox}>{summary}</div>}
    </div>
  );
}
