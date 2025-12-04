
import React, { useState, useMemo, useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { JournalEntry } from './types';
import JournalList from './components/JournalList';
import JournalView from './components/JournalView';
import NewEntryForm from './components/NewEntryForm';
import { PlusIcon, MenuIcon } from './components/Icons';

type ViewMode = 'viewing' | 'creating' | 'idle';

export default function App() {
  const [entries, setEntries] = useLocalStorage<JournalEntry[]>('journal-entries', []);
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('idle');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sortedEntries = useMemo(() => {
    return [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [entries]);

  const selectedEntry = useMemo(() => {
    return entries.find(entry => entry.id === selectedEntryId) || null;
  }, [entries, selectedEntryId]);

  const handleSelectEntry = useCallback((id: string) => {
    setSelectedEntryId(id);
    setViewMode('viewing');
    setIsSidebarOpen(false);
  }, []);

  const handleCreateNew = useCallback(() => {
    setSelectedEntryId(null);
    setViewMode('creating');
    setIsSidebarOpen(false);
  }, []);

  const handleSaveEntry = useCallback((entryData: Omit<JournalEntry, 'id' | 'date'>) => {
    const newEntry: JournalEntry = {
      ...entryData,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };
    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    setSelectedEntryId(newEntry.id);
    setViewMode('viewing');
  }, [entries, setEntries]);

  const handleDeleteEntry = useCallback((id: string) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      const updatedEntries = entries.filter(entry => entry.id !== id);
      setEntries(updatedEntries);
      setSelectedEntryId(null);
      setViewMode('idle');
    }
  }, [entries, setEntries]);

  const renderMainContent = () => {
    switch (viewMode) {
      case 'viewing':
        return selectedEntry ? <JournalView entry={selectedEntry} onDelete={handleDeleteEntry} /> : <IdleState onCreate={handleCreateNew} />;
      case 'creating':
        return <NewEntryForm onSave={handleSaveEntry} onCancel={() => setViewMode(selectedEntry ? 'viewing' : 'idle')} />;
      case 'idle':
      default:
        return <IdleState onCreate={handleCreateNew} />;
    }
  };
  
  return (
    <div className="h-screen font-sans text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 md:flex overflow-hidden">
      <JournalList
        entries={sortedEntries}
        selectedEntryId={selectedEntryId}
        onSelectEntry={handleSelectEntry}
        onCreateNew={handleCreateNew}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        ></div>
      )}
      <main className="flex-1 p-6 sm:p-8 md:p-12 transition-all duration-300 ease-in-out overflow-y-auto">
        <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden fixed top-4 left-4 z-20 p-2 rounded-full text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            aria-label="Open menu"
        >
            <MenuIcon className="h-6 w-6" />
        </button>
        {renderMainContent()}
      </main>
    </div>
  );
}

interface IdleStateProps {
  onCreate: () => void;
}

const IdleState: React.FC<IdleStateProps> = ({ onCreate }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mb-4 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v11.494m-9-5.747h18" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.5 3.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM19.5 3.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM9.5 20.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM19.5 20.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 10h18M3 14h18" />
        <rect x="2" y="2" width="20" height="20" rx="3" ry="3" stroke="currentColor" fill="none" />
      </svg>
      <h2 className="text-2xl font-semibold mb-2">Welcome to your Journal</h2>
      <p className="mb-6 max-w-sm">Select an entry from the list to read, or create a new one to start writing.</p>
      <button
        onClick={onCreate}
        className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
      >
        <PlusIcon className="h-5 w-5 mr-2" />
        Create New Entry
      </button>
    </div>
  );
};
