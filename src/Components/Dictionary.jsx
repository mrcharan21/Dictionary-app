import React, { useState } from "react";
import axios from "axios";
import WordCard from "./WordCard";

export default function Dictionary() {
  const [word, setWord] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchWord = async () => {
    if (!word.trim()) return;
    try {
      const res = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      setData(res.data[0]);
      setError("");
    } catch (err) {
      setError("Word not found 😢");
      setData(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWord();
  };

  return (
    <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-4 text-indigo-600">Dictionary App</h1>

      <form onSubmit={handleSubmit} className="flex mb-4">
        <input
          type="text"
          placeholder="Enter a word..."
          value={word}
          onChange={(e) => setWord(e.target.value)}
          className="flex-1 border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="bg-indigo-500 text-white px-4 py-2 rounded-r hover:bg-indigo-600 transition"
        >
          Search
        </button>
      </form>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {data && <WordCard data={data} />}
    </div>
  );
}

