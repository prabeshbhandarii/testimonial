"use client"
import React, { useState } from 'react';

const ScriptDisplay = ({spaceName}: {spaceName: string}) => {
  const [isCopied, setIsCopied] = useState(false);
  
  const scriptCode = `<iframe height="500px" width="700px" id="example-iframe" src="/pages/wol/${spaceName}"></iframe>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(scriptCode).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Embed Script</h2>
      <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-4">
        <code>{scriptCode}</code>
      </pre>
      <button
        onClick={copyToClipboard}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        {isCopied ? 'Copied!' : 'Copy code'}
      </button>
    </div>
  );
};

export default ScriptDisplay;