import React from "react";

export default function WordCard({ data }) {
  const playAudio = (url) => {
    if (url) {
      const audio = new Audio(url);
      audio.play();
    }
  };

  // Find first available audio URL
  const audioUrl =
    data.phonetics &&
    data.phonetics.find((p) => p.audio && p.audio.length > 0)?.audio;

  return (
    <div className="bg-gray-50 p-4 rounded shadow mt-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
        <h2 className="text-2xl font-bold text-gray-800">{data.word}</h2>
        {audioUrl && (
          <button
            onClick={() => playAudio(audioUrl)}
            className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600 transition mt-2 sm:mt-0"
          >
            🔊 Pronounce
          </button>
        )}
      </div>

      {data.phonetics && data.phonetics[0]?.text && (
        <p className="italic text-gray-600 mb-2">{data.phonetics[0].text}</p>
      )}

      {data.meanings.map((meaning, idx) => (
        <div key={idx} className="mb-2">
          <h3 className="font-semibold text-indigo-700">{meaning.partOfSpeech}</h3>
          <ul className="list-disc list-inside">
            {meaning.definitions.map((def, i) => (
              <li key={i}>{def.definition}</li>
            ))}
          </ul>

          <h4 className='text-center mt-2'>Definition</h4>
            <p className='text-center mt-2'>{data.meanings[0].definitions[0].definition}</p>
            <h4 className='text-center mt-2'>Example</h4>
            <p className='text-center mt-2'>{data.meanings[0].definitions[0].example}</p>
            {data.meanings[0].synonyms && (
              <div>
                <h4 className='text-center mt-2'>Synonyms</h4>
                <p className='text-center mt-2'>{data.meanings[0].synonyms.join(", ")}</p>
              </div>
            )}
            {data.meanings[0].antonyms && (
              <div>
                <h4 className='text-center mt-2'>Antonyms</h4>
                <p className='text-center mt-2'>{data.meanings[0].antonyms.join(", ")}</p>
              </div>
            )}
        </div>
      ))}
    </div>
  );
}
