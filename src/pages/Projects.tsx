
import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { FolderPlus, Search, Users } from "lucide-react";
import { toast } from "sonner";

// Sample project data
const projectsData = [
  {
    id: 1,
    name: "E-commerce Website",
    description: "Testing for the new online store platform",
    testCases: 86,
    progress: 65,
    members: 4,
  },
  {
    id: 2,
    name: "Mobile Banking App",
    description: "Core functionality testing for iOS and Android",
    testCases: 124,
    progress: 42,
    members: 6,
  },
  {
    id: 3,
    name: "CRM Dashboard",
    description: "UI and functionality validation for admin console",
    testCases: 53,
    progress: 91,
    members: 3,
  },
  {
    id: 4,
    name: "Payment Gateway",
    description: "Integration and security testing for payment processing",
    testCases: 72,
    progress: 28,
    members: 5,
  },
];

export default function Projects() {
  const [projects, setProjects] = useState(projectsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
  });
  
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateProject = () => {
    if (!newProject.name.trim()) {
      toast.error("Project name is required");
      return;
    }

    const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    
    const createdProject = {
      id: newId,
      name: newProject.name,
      description: newProject.description,
      testCases: 0,
      progress: 0,
      members: 1,
    };
    
    setProjects([...projects, createdProject]);
    setNewProject({ name: "", description: "" });
    setDialogOpen(false);
    toast.success("Project created successfully");
  };

  return (
    <PageContainer title="Projects">
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search projects..." 
            className="pl-8" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <FolderPlus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Add details for your new testing project
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input 
                  id="project-name" 
                  value={newProject.name}
                  onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                  placeholder="Enter project name" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-description">Description</Label>
                <Textarea 
                  id="project-description" 
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  placeholder="Brief description of the project" 
                  rows={4} 
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateProject}>Create Project</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="hover-scale">
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Test Cases: {project.testCases}</span>
                      <span>Progress: {project.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div 
                        className="bg-brand-purple h-2.5 rounded-full" 
                        style={{ width: `${project.progress}%` }} 
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-1" />
                    {project.members} members
                  </div>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="active">
          <div className="flex justify-center items-center p-10 text-muted-foreground">
            Same list filtered to only show active projects
          </div>
        </TabsContent>
        
        <TabsContent value="archived">
          <div className="flex justify-center items-center p-10 text-muted-foreground">
            No archived projects found
          </div>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}
