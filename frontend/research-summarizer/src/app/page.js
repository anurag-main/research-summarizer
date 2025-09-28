"use client";
import { useState } from "react";
import styles from "./home.module.css";
export default function Home() {
  const [paper, setPaper] = useState("Attention Is All You Need");
  const [style, setStyle] = useState("Beginner-Friendly");
  const [length, setLength] = useState("Short (1-2 paragraphs)");
  const [summary, setSummary] = useState("");
  async function handleSummarize() {
    const response = await fetch("http://127.0.0.1:8000/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paper_input: paper,
        style_input: style,
        length_input: length,
      }),
    });
    const data = await response.json();
    setSummary(data.summary);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Research Summarizer</h1>

      <div>
        <label className={styles.label}>Paper:</label>
        <select className={styles.select} value={paper} onChange={(e) => setPaper(e.target.value)}>
          <option>Attention Is All You Need</option>
          <option>BERT: Pre-training of Deep Bidirectional Transformers</option>
          <option>GPT-3: Language Models are Few-Shot Learners</option>
          <option>Diffusion Models Beat GANs on Image Synthesis</option>
        </select>
      </div>

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
