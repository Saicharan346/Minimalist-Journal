
import React from 'react';
import type { JournalEntry } from '../types';

interface JournalListItemProps {
  entry: JournalEntry;
  isActive: boolean;
  onSelect: (id: string) => void;
}

const JournalListItem: React.FC<JournalListItemProps> = ({ entry, isActive, onSelect }) => {
  const date = new Date(entry.date);
  const formattedDate = date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const dayOfWeek = date.toLocaleDateString(undefined, { weekday: 'long' });

  return (
    <button
      onClick={() => onSelect(entry.id)}
      className={`w-full text-left p-4 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200 ${
        isActive
          ? 'bg-blue-100 dark:bg-blue-900/50'
          : 'hover:bg-gray-100 dark:hover:bg-gray-700/50'
      }`}
    >
      <p
        className={`font-semibold truncate ${
          isActive ? 'text-blue-800 dark:text-blue-200' : 'text-gray-800 dark:text-gray-100'
        }`}
      >
        {entry.title || 'Untitled Entry'}
      </p>
      <div className="flex justify-between items-center text-sm mt-1">
        <p className={`${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
          {dayOfWeek}
        </p>
        <p className={`${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'}`}>
          {formattedDate}
        </p>
      </div>
    </button>
  );
};

export default JournalListItem;
