import React, { useState } from 'react';
import TextEditor from './TextEditor';

const ComposeMail = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [editorContent, setEditorContent] = useState('');

  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-3xl mx-auto">
      <div className="mb-4">
        <input
          type="text"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="To"
          className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="text-editor-container">
        {/* Use the TextEditor component */}
        <TextEditor
          value={editorContent}
          onChange={setEditorContent}
        />
      </div>
    </div>
  );
};

export default ComposeMail;