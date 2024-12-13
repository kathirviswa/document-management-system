import { useState } from 'react'
import { Plus, File, Trash2, } from 'lucide-react'

export default function DocumentManager() {
  const [applications, setApplications] = useState([
    { id: '1', name: 'Application_1', documents: [] },
    { id: '2', name: 'Application_2', documents: [] },
    { id: '3', name: 'Application_3', documents: [] },
    { id: '4', name: 'Application_4', documents: [] },
    { id: '5', name: 'Application_5', documents: [] },
  ])

  const [activeApp, setActiveApp] = useState(null)

  const addApplication = () => {
    const newId = Date.now().toString()
    setApplications([...applications, { id: newId, name: `Application_${applications.length + 1}`, documents: [] }])
  }

  const addDocument = (appId) => {
    setApplications(applications.map(app => {
      if (app.id === appId) {
        const newDocId = Date.now().toString()
        return {
          ...app,
          documents: [...app.documents, { id: newDocId, name: `Document_${app.documents.length + 1}`, file: null }]
        }
      }
      return app
    }))
  }

  const deleteApplication = (id) => {
    setApplications(applications.filter(app => app.id !== id))
    if (activeApp === id) {
      setActiveApp(null)
    }
  }

  const deleteDocument = (appId, docId) => {
    setApplications(applications.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          documents: app.documents.filter(doc => doc.id !== docId)
        }
      }
      return app
    }))
  }

  const handleFileUpload = (appId, docId, event) => {
    const file = event.target.files[0]
    if (file) {
      setApplications(applications.map(app => {
        if (app.id === appId) {
          return {
            ...app,
            documents: app.documents.map(doc => {
              if (doc.id === docId) {
                return { ...doc, file: file }
              }
              return doc
            })
          }
        }
        return app
      }))
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            {applications.map((app) => (
              <div key={app.id} className="flex items-center">
                <button
                  onClick={() => setActiveApp(app.id)}
                  className={`px-4 py-2 rounded-l-md flex items-center gap-2 ${
                    activeApp === app.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <File className="h-4 w-4" />
                  {app.name}
                </button>
                <button
                  onClick={() => deleteApplication(app.id)}
                  className="p-2 rounded-r-md bg-red-500 text-white hover:bg-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              onClick={addApplication}
              className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 flex items-center gap-2 flex-shrink-0"
            >
              <Plus className="h-4 w-4" />
              Add Application
            </button>
          </div>
        </div>

        {activeApp && (
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">{applications.find(app => app.id === activeApp)?.name} Documents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {applications.find(app => app.id === activeApp)?.documents.map((doc) => (
                <div key={doc.id} className="border rounded-md p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{doc.name}</span>
                    <button
                      onClick={() => deleteDocument(activeApp, doc.id)}
                      className="p-1 rounded-md bg-red-500 text-white hover:bg-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload file
                    </label>
                    <div className="flex items-center">
                      <input
                        type="file"
                        onChange={(e) => handleFileUpload(activeApp, doc.id, e)}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </div>
                  </div>
                  {doc.file && (
                    <div className="mt-2 text-sm text-gray-600">
                      File: {doc.file.name} ({(doc.file.size / 1024).toFixed(2)} KB)
                    </div>
                  )}
                </div>
              ))}
              <button
                onClick={() => addDocument(activeApp)}
                className="border-2 border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center text-gray-500 hover:text-gray-700 hover:border-gray-400"
              >
                <Plus className="h-8 w-8 mb-2" />
                <span>Add Document</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

