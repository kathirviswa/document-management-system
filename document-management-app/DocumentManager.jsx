import  { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Upload, File, Eye, Trash2, X } from 'lucide-react'

export default function DocumentManager() {
  const [applications, setApplications] = useState([
    { id: '1', name: 'Application_1', documents: [{ id: '1', name: 'Document_1' }] }
  ])
  const [activeApplication, setActiveApplication] = useState("1")
  const [activeDocument, setActiveDocument] = useState("1")

  const addApplication = () => {
    const newId = (applications.length + 1).toString()
    setApplications([...applications, { id: newId, name: `Application_${newId}`, documents: [] }])
    setActiveApplication(newId)
  }

  const deleteApplication = (id) => {
    setApplications(applications.filter(app => app.id !== id))
    if (activeApplication === id) {
      setActiveApplication(applications[0]?.id || "")
    }
  }

  const addDocument = (applicationId) => {
    setApplications(applications.map(app => {
      if (app.id === applicationId) {
        const newDocId = (app.documents.length + 1).toString()
        return {
          ...app,
          documents: [...app.documents, { id: newDocId, name: `Document_${newDocId}` }]
        }
      }
      return app
    }))
  }

  const deleteDocument = (applicationId, documentId) => {
    setApplications(applications.map(app => {
      if (app.id === applicationId) {
        return {
          ...app,
          documents: app.documents.filter(doc => doc.id !== documentId)
        }
      }
      return app
    }))
    if (activeDocument === documentId) {
      setActiveDocument(applications.find(app => app.id === applicationId)?.documents[0]?.id || "")
    }
  }

  const handleFileChange = (applicationId, documentId, file) => {
    setApplications(applications.map(app => {
      if (app.id === applicationId) {
        return {
          ...app,
          documents: app.documents.map(doc => {
            if (doc.id === documentId) {
              return { ...doc, file }
            }
            return doc
          })
        }
      }
      return app
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white/50 backdrop-blur-sm p-4 border-r">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Documents</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                  <Plus className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Document</DialogTitle>
                </DialogHeader>
                <Button onClick={() => addDocument(activeApplication)} className="bg-blue-500 hover:bg-blue-600 text-white">
                  Add Document
                </Button>
              </DialogContent>
            </Dialog>
          </div>
          <ScrollArea className="h-[calc(100vh-8rem)]">
            {applications.find(app => app.id === activeApplication)?.documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between mb-1">
                <Button
                  variant={activeDocument === doc.id ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveDocument(doc.id)}
                >
                  <File className="h-4 w-4 mr-2" />
                  {doc.name}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteDocument(activeApplication, doc.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4">
          <Tabs value={activeApplication} onValueChange={setActiveApplication}>
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                {applications.map((app) => (
                  <TabsTrigger key={app.id} value={app.id}>
                    {app.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Application
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Application</DialogTitle>
                    </DialogHeader>
                    <Button onClick={addApplication} className="bg-blue-500 hover:bg-blue-600 text-white">
                      Add Application
                    </Button>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="outline"
                  onClick={() => deleteApplication(activeApplication)}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Application
                </Button>
              </div>
            </div>

            {applications.map((app) => (
              <TabsContent key={app.id} value={app.id}>
                <Card className="bg-white/50 backdrop-blur-sm">
                  <div className="p-4">
                    <h3 className="text-lg font-medium mb-4">
                      Upload File for {app.name} - {applications.find(a => a.id === activeApplication)?.documents.find(d => d.id === activeDocument)?.name}
                    </h3>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                          Drag and drop your files here, or click to browse
                        </p>
                        <Input
                          id={`file-upload-${app.id}`}
                          type="file"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              handleFileChange(app.id, activeDocument, file)
                            }
                          }}
                        />
                        <Button
                          variant="outline"
                          onClick={() => document.getElementById(`file-upload-${app.id}`).click()}
                        >
                          Choose File
                        </Button>
                      </div>
                    </div>
                    {app.documents.find(d => d.id === activeDocument)?.file && (
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Uploaded File:</h4>
                        <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                          <span className="flex items-center">
                            <File className="h-4 w-4 mr-2" />
                            {app.documents.find(d => d.id === activeDocument)?.file?.name}
                          </span>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleFileChange(app.id, activeDocument, null)}
                            >
                              <X className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  )
}

