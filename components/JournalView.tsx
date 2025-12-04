
import React from 'react';
import type { JournalEntry } from '../types';
import { TrashIcon } from './Icons';

interface JournalViewProps {
  entry: JournalEntry;
  onDelete: (id: string) => void;
}

const JournalView: React.FC<JournalViewProps> = ({ entry, onDelete }) => {
  const formattedDate = new Date(entry.date).toLocaleString(undefined, {
    dateStyle: 'full',
    timeStyle: 'short',
  });

  return (
    <article className="max-w-4xl mx-auto h-full flex flex-col">
      <div className="flex-shrink-0 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-start">
            <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">{entry.title}</h2>
                <time className="text-gray-500 dark:text-gray-400">{formattedDate}</time>
            </div>
            <button
                onClick={() => onDelete(entry.id)}
                className="ml-4 p-2 rounded-full text-gray-500 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/50 dark:hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                aria-label="Delete entry"
            >
                <TrashIcon className="h-5 w-5" />
            </button>
        </div>
      </div>
      <div className="prose prose-lg dark:prose-invert max-w-none flex-1 overflow-y-auto">
        <p className="whitespace-pre-wrap">{entry.content}</p>
      </div>
    </article>
  );
};

export default JournalView;
