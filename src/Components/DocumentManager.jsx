import { useState } from 'react'
import { Plus, File, Trash } from 'lucide-react'

export default function DocumentManager() {
  const [applications, setApplications] = useState([
    { id: 1, name: 'Application_1' },
  
  ])

  const [documents, setDocuments] = useState([
    { id: 1, name: 'Document_1' },
  
      ])

  const [activeApp, setActiveApp] = useState(1)
  const [activeDoc, setActiveDoc] = useState(1)

  const addApplication = () => {
    const newId = applications.length + 1
    setApplications([...applications, { id: newId, name: `Application_${newId}` }])
  }

  const addDocument = () => {
    const newId = documents.length + 1
    setDocuments([...documents, { id: newId, name: `Document_${newId}` }])
  }

  const deleteApplication = (id) => {
    setApplications(applications.filter(app => app.id !== id))
    if (activeApp === id) {
      setActiveApp(applications[0]?.id || null)
    }
  }

  const deleteDocument = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id))
    if (activeDoc === id) {
      setActiveDoc(documents[0]?.id || null)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Applications Navigation */}
      <div className="border-b border-gray-200">
        <div className="flex items-center gap-2 p-4">
          {applications.map((app) => (
            <div key={app.id} className="flex items-center">
              <button
                onClick={() => setActiveApp(app.id)}
                className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                  activeApp === app.id
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <File className="h-4 w-4" />
                {app.name}
              </button>
              <button
                onClick={() => deleteApplication(app.id)}
                className="ml-2 p-1 text-red-500 hover:text-red-700"
              >
                <Trash className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            onClick={addApplication}
            className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Documents Sidebar */}
        <div className="w-64 border-r border-gray-200 p-4">
          <div className="space-y-2">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between">
                <button
                  onClick={() => setActiveDoc(doc.id)}
                  className={`flex-grow text-left px-4 py-2 rounded-md flex items-center gap-2 ${
                    activeDoc === doc.id
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <File className="h-4 w-4" />
                  {doc.name}
                </button>
                <button
                  onClick={() => deleteDocument(doc.id)}
                  className="ml-2 p-1 text-red-500 hover:text-red-700"
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              onClick={addDocument}
              className="w-full px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Upload File for Application_{activeApp} - Document_{activeDoc}
            </h2>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">
                Choose file
              </label>
              
              <div className="mt-1 flex items-center">
              <input type="file" className="block w-full text-sm text-gray file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0
                file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700
                hover:file:bg-gray-200
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

