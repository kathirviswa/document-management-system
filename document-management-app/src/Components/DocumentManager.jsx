import { useState } from "react";
import { PlusCircle, Trash, FileText } from "lucide-react";

function DocumentManager() {
  const [applications, setApplications] = useState([
    { id: "1", name: "Category 1", documents: [{ id: "1", name: "Document 1" }] },
    {
      id: "1",
      name: "Category 1",
      documents: [
        {
          id: "1",
          name: "Document 1",
          images: [{ id: "1", name: "Image 1", file: null }],
        },
      ],
    },
  ]);

  // const [activeApplication, setActiveApplication] = useState(null);
  const [activeDocument, setActiveDocument] = useState(null);

  const addApplication = () => {
    const newId = (applications.length + 1).toString();
    setApplications([...applications, { id: newId, name: `Category ${newId}`, documents: [] }]);
  };

  const addDocument = (applicationId) => {
    const app = applications.find((app) => app.id === applicationId);
    if (app) {
      const newDocId = (app.documents.length + 1).toString();
      setApplications(
        applications.map((app) => {
          if (app.id === applicationId) {
            return {
              ...app,
              documents: [
                ...app.documents,
                { id: newDocId, name: `Document ${newDocId}`, images: [] },
              ],
            };
          }
          return app;
        })
      );
    }
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
    if (activeDocument === documentId) {
      setActiveDocument(null);
    }
  };

  const addImagesToDocument = (applicationId, documentId, imageFiles) => {
    setApplications(
      applications.map((app) => {
        if (app.id === applicationId) {
          return {
            ...app,
            documents: app.documents.map((doc) => {
              if (doc.id === documentId) {
                const newImages = Array.from(imageFiles).map((file, index) => ({
                  id: (doc.images.length + index + 1).toString(),
                  name: `Image ${doc.images.length + index + 1}`,
                  file: file,
                }));
                return {
                  ...doc,
                  images: [...doc.images, ...newImages],
                };
              }
              return doc;
            }),
          };
        }
        return app;
      })
    );
  };

  const deleteImage = (applicationId, documentId, imageId) => {
    setApplications(
      applications.map((app) => {
        if (app.id === applicationId) {
          return {
            ...app,
            documents: app.documents.map((doc) => {
              if (doc.id === documentId) {
                return {
                  ...doc,
                  images: doc.images.filter((img) => img.id !== imageId),
                };
              }
              return doc;
            }),
          };
        }
        return app;
      })
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Document Manager</h2>
      <div className="flex flex-col gap-2">
        {applications.map((app) => (
          <div key={app.id} className="p-2 flex justify-between items-center rounded border border-gray-300">
            <div className="flex items-center gap-2">
              <FileText size={18} />
              <span>{app.name}</span>
            </div>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => setApplications(app.id)}
            >
              <Trash size={18} />
            </button>
          </div>
        ))}
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={addApplication}
        >
          <PlusCircle size={18} className="inline mr-2" /> Add Category
        </button>
      </div>
      {applications.map((app) => (
        <div key={app.id} className="mt-4">
          <h3 className="text-lg font-bold mb-2">{app.name}</h3>
          <div className="flex flex-col gap-2">
            {app.documents.map((doc) => (
              <div
                key={doc.id}
                className={`p-2 flex justify-between items-center rounded cursor-pointer border border-gray-300 ${
                  activeDocument === doc.id ? "bg-blue-100" : ""
                }`}
                onClick={() => setActiveDocument(doc.id)}
              >
                <div className="flex items-center gap-2">
                  <FileText size={18} />
                  <span>{doc.name}</span>
                </div>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteDocument(app.id, doc.id);
                  }}
                >
                  <Trash size={18} />
                </button>
              </div>
            ))}
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => addDocument(app.id)}
            >
              <PlusCircle size={18} className="inline mr-2" /> Add Document
            </button>
          </div>
          {activeDocument && (
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">
                Upload Images for Document{" "}
                {app.documents.find((doc) => doc.id === activeDocument)?.name}
              </h3>
              <div className="flex flex-col gap-2">
                {app.documents
                  .find((doc) => doc.id === activeDocument)
                  ?.images.map((img) => (
                    <div key={img.id} className="flex justify-between items-center">
                      <span>{img.name}</span>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => deleteImage(app.id, activeDocument, img.id)}
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  ))}
              </div>
              <input
                type="file"
                multiple
                onChange={(e) => {
                  const files = e.target.files;
                  if (files) {
                    addImagesToDocument(app.id, activeDocument, files);
                  }
                }}
                className="mt-2"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default DocumentManager;