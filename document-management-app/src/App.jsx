'use client';

import { useState } from 'react';
import { Plus, Trash2, Upload, } from 'lucide-react';

function App() {
  const [applications, setApplications] = useState([
    { id: '1', name: 'Application 1', documents: [{ id: '1', name: 'Document 1' }] },
  ]);
  const [activeAppId, setActiveAppId] = useState('1');
  const [activeDocId, setActiveDocId] = useState('1');

  const addApplication = () => {
    const newAppId = (applications.length + 1).toString();
    setApplications([...applications, { id: newAppId, name: `Application ${newAppId}`, documents: [] }]);
    setActiveAppId(newAppId);
  };

  const deleteApplication = (id) => {
    setApplications(applications.filter((app) => app.id !== id));
    setActiveAppId(applications[0]?.id || '');
  };

  const addDocument = () => {
    setApplications(applications.map((app) => {
      if (app.id === activeAppId) {
        const newDocId = (app.documents.length + 1).toString();
        return {
          ...app,
          documents: [...app.documents, { id: newDocId, name: `Document ${newDocId}` }],
        };
      }
      return app;
    }));
  };

  const deleteDocument = (docId) => {
    setApplications(applications.map((app) => {
      if (app.id === activeAppId) {
        return {
          ...app,
          documents: app.documents.filter((doc) => doc.id !== docId),
        };
      }
      return app;
    }));
    setActiveDocId(applications.find((app) => app.id === activeAppId)?.documents[0]?.id || '');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Applications</h2>
          <button className="text-blue-500" onClick={addApplication}><Plus size={20} /></button>
        </div>
        <div>
          {applications.map((app) => (
            <div key={app.id} className="flex items-center justify-between py-1">
              <button
                className={`w-full text-left ${activeAppId === app.id ? 'font-bold' : ''}`}
                onClick={() => setActiveAppId(app.id)}
              >
                {app.name}
              </button>
              <button className="text-red-500" onClick={() => deleteApplication(app.id)}><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-medium">Documents</h3>
          <button className="text-blue-500" onClick={addDocument}><Plus size={20} /></button>
        </div>

        <div>
          {applications.find((app) => app.id === activeAppId)?.documents.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between py-1">
              <button
                className={`w-full text-left ${activeDocId === doc.id ? 'font-bold' : ''}`}
                onClick={() => setActiveDocId(doc.id)}
              >
                {doc.name}
              </button>
              <button className="text-red-500" onClick={() => deleteDocument(doc.id)}><Trash2 size={16} /></button>
            </div>
          ))}
        </div>

        {activeDocId && (
          <div className="mt-6 p-4 border rounded bg-white">
            <h4 className="font-medium mb-2">Upload File</h4>
            <div className="border-dashed border-2 p-6 text-center">
              <Upload className="mx-auto mb-2" size={40} />
              <p className="text-sm text-gray-500">Drag and drop or click to upload</p>
              <button className="text-blue-500 mt-2">Choose File</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

