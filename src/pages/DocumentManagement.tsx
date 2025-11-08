import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FileText, 
  Search, 
  Filter, 
  Plus, 
  Folder, 
  Tag, 
  Calendar,
  Download,
  Eye,
  Edit,
  Trash2,
  Home,
  Workflow,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { FileUpload } from "@/components/FileUpload";

const DocumentManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showUploadForm, setShowUploadForm] = useState(false);

  // Mock data for documents
  const documents = [
    {
      id: 1,
      title: "Employee Handbook",
      category: "policies",
      tags: ["hr", "compliance"],
      date: "2023-05-15",
      size: "2.4 MB",
      type: "PDF"
    },
    {
      id: 2,
      title: "IT Setup Guide",
      category: "procedures",
      tags: ["it", "onboarding"],
      date: "2023-06-22",
      size: "1.8 MB",
      type: "PDF"
    },
    {
      id: 3,
      title: "Company Values and Culture",
      category: "culture",
      tags: ["culture", "mission"],
      date: "2023-07-10",
      size: "3.1 MB",
      type: "PDF"
    },
    {
      id: 4,
      title: "Health Benefits Overview",
      category: "benefits",
      tags: ["hr", "health"],
      date: "2023-08-05",
      size: "1.2 MB",
      type: "PDF"
    },
    {
      id: 5,
      title: "Security Training Materials",
      category: "training",
      tags: ["security", "compliance"],
      date: "2023-09-18",
      size: "4.7 MB",
      type: "PDF"
    },
    {
      id: 6,
      title: "Onboarding Checklist",
      category: "onboarding",
      tags: ["hr", "onboarding"],
      date: "2023-10-01",
      size: "0.8 MB",
      type: "PDF"
    }
  ];

  const categories = [
    { id: "all", name: "All Documents", count: documents.length },
    { id: "policies", name: "Policies", count: documents.filter(d => d.category === "policies").length },
    { id: "procedures", name: "Procedures", count: documents.filter(d => d.category === "procedures").length },
    { id: "culture", name: "Company Culture", count: documents.filter(d => d.category === "culture").length },
    { id: "benefits", name: "Benefits", count: documents.filter(d => d.category === "benefits").length },
    { id: "training", name: "Training Materials", count: documents.filter(d => d.category === "training").length },
    { id: "onboarding", name: "Onboarding", count: documents.filter(d => d.category === "onboarding").length }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = categoryFilter === "all" || doc.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-12 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                Document Management
              </h1>
              <p className="text-lg text-muted-foreground">
                Organize and access all your company documents
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-2">
              <Link to="/dashboard">
                <Button variant="outline">
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link to="/workflows">
                <Button variant="outline">
                  <Workflow className="mr-2 h-4 w-4" />
                  Workflows
                </Button>
              </Link>
              <Link to="/reports">
                <Button variant="outline">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Reports
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Form */}
        {showUploadForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Upload New Document</CardTitle>
              <CardDescription>
                Add a new document to your company knowledge base
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload />
            </CardContent>
          </Card>
        )}
        
        {/* Filters and Search */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documents..."
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Category Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          {categories.map((category) => (
            <Card 
              key={category.id} 
              className={`cursor-pointer transition-smooth hover:shadow-medium ${
                categoryFilter === category.id ? "border-primary" : ""
              }`}
              onClick={() => setCategoryFilter(category.id)}
            >
              <CardContent className="p-4 text-center">
                <Folder className="h-6 w-6 mx-auto mb-2 text-primary" />
                <h3 className="font-medium text-sm">{category.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{category.count} documents</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Documents List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              {categoryFilter === "all" ? "All Documents" : categories.find(c => c.id === categoryFilter)?.name}
            </h2>
            <div className="flex space-x-2">
              <p className="text-muted-foreground">
                {filteredDocuments.length} {filteredDocuments.length === 1 ? "document" : "documents"}
              </p>
              <Button onClick={() => setShowUploadForm(!showUploadForm)}>
                <Plus className="mr-2 h-4 w-4" />
                {showUploadForm ? "Cancel" : "Upload"}
              </Button>
            </div>
          </div>
          
          {filteredDocuments.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No documents found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button onClick={() => setShowUploadForm(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Upload Document
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocuments.map((document) => (
                <Card key={document.id} className="hover:shadow-medium transition-smooth">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg line-clamp-1">{document.title}</CardTitle>
                          <div className="flex items-center mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {document.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground ml-2">
                              {document.size}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="text-xs">
                        {document.category}
                      </Badge>
                      {document.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Uploaded {document.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DocumentManagement;