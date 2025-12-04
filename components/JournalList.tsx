
import React from 'react';
import type { JournalEntry } from '../types';
import JournalListItem from './JournalListItem';
import { PlusIcon, XIcon } from './Icons';

interface JournalListProps {
  entries: JournalEntry[];
  selectedEntryId: string | null;
  onSelectEntry: (id: string) => void;
  onCreateNew: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const JournalList: React.FC<JournalListProps> = ({ entries, selectedEntryId, onSelectEntry, onCreateNew, isOpen, onClose }) => {
  return (
    <aside className={`
      w-full md:w-80 lg:w-96 bg-gray-50 dark:bg-gray-800/50 border-r border-gray-200 dark:border-gray-700 
      flex flex-col h-full fixed md:relative z-40
      transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
    `}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Journal</h1>
        <div className="flex items-center gap-2">
            <button
                onClick={onCreateNew}
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                aria-label="Create new entry"
            >
                <PlusIcon className="h-6 w-6" />
            </button>
            <button
                onClick={onClose}
                className="md:hidden p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                aria-label="Close menu"
            >
                <XIcon className="h-6 w-6" />
            </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {entries.length > 0 ? (
          <ul>
            {entries.map((entry) => (
              <li key={entry.id}>
                <JournalListItem
                  entry={entry}
                  isActive={entry.id === selectedEntryId}
                  onSelect={onSelectEntry}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            <p>No entries yet.</p>
            <p>Click the '+' button to start writing.</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default JournalList;
