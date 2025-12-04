
import React, { useState } from 'react';
import type { JournalEntry } from '../types';

interface NewEntryFormProps {
  onSave: (entryData: Omit<JournalEntry, 'id' | 'date'>) => void;
  onCancel: () => void;
}

const NewEntryForm: React.FC<NewEntryFormProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() || content.trim()) {
      onSave({ title, content });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto h-full flex flex-col">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">New Journal Entry</h2>
      <div className="mb-6">
        <label htmlFor="title" className="sr-only">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Entry Title"
          className="w-full text-2xl font-semibold p-2 bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none transition-colors"
        />
      </div>
      <div className="flex-1 flex flex-col mb-6">
        <label htmlFor="content" className="sr-only">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing..."
          className="w-full h-full flex-1 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none leading-relaxed text-lg"
        />
      </div>
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 dark:disabled:bg-blue-800 disabled:cursor-not-allowed transition-colors"
          disabled={!title.trim() && !content.trim()}
        >
          Save Entry
        </button>
      </div>
    </form>
  );
};

export default NewEntryForm;
