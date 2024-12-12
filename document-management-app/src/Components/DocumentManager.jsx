import  { useState } from "react";
import { PlusCircle, Trash, FileText, } from "lucide-react";

function DocumentManager() {
  const [applications, setApplications] = useState([
    { id: "1", name: "Category 1", documents: [{ id: "1", name: "Document 1" }] },
  ]);
  const [activeApplication, setActiveApplication] = useState("1");

  const addApplication = () => {
    const newId = (applications.length + 1).toString();
    setApplications([
      ...applications,
      { id: newId, name: `Category ${newId}`, documents: [] },
    ]);
    setActiveApplication(newId);
  };

  const deleteApplication = (id) => {
    setApplications(applications.filter((app) => app.id !== id));
    if (activeApplication === id) {
      setActiveApplication(applications[0]?.id || "");
    }
  };

  const addDocument = (applicationId) => {
    setApplications(
      applications.map((app) => {
        if (app.id === applicationId) {
          const newDocId = (app.documents.length + 1).toString();
          return {
            ...app,
            documents: [...app.documents, { id: newDocId, name: `Document ${newDocId}` }],
          };
        }
        return app;
      })
    );
  };

  const deleteDocument = (applicationId, documentId) => {
    setApplications(
      applications.map((app) => {
        if (app.id === applicationId) {
          return {
            ...app,
            documents: app.documents.filter((doc) => doc.id !== documentId),
          };
        }
        return app;
      })
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4 bg-white shadow rounded p-4">
          <h2 className="text-lg font-bold mb-4">Applications</h2>
          <div className="flex flex-col gap-2">
            {applications.map((app) => (
              <div
                key={app.id}
                className={`p-2 flex justify-between items-center rounded cursor-pointer border ${
                  activeApplication === app.id ? "bg-blue-100 border-blue-500" : "bg-white border-gray-300"
                }`}
                onClick={() => setActiveApplication(app.id)}
              >
                <span>{app.name}</span>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteApplication(app.id);
                  }}
                >
                  <Trash size={18} />
                </button>
              </div>
            ))}
          </div>
          <button
            className="w-full mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={addApplication}
          >
            <PlusCircle size={18} className="inline mr-2" /> Add Application
          </button>
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-3/4 bg-white shadow rounded p-4">
          <h2 className="text-lg font-bold mb-4">
            {applications.find((app) => app.id === activeApplication)?.name || "Select an Application"}
          </h2>
          {activeApplication && (
            <div>
              <div className="flex flex-col gap-2">
                {applications
                  .find((app) => app.id === activeApplication)
                  ?.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-2 flex justify-between items-center rounded border border-gray-300"
                    >
                      <div className="flex items-center gap-2">
                        <FileText size={18} />
                        <span>{doc.name}</span>
                      </div>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => deleteDocument(activeApplication, doc.id)}
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  ))}
              </div>
              <button
                className="mt-4 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() => addDocument(activeApplication)}
              >
                <PlusCircle size={18} className="inline mr-2" /> Add Document
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DocumentManager;
