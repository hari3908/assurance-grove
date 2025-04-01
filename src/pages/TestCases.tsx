
import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, X, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// Sample test cases data
const testCasesData = [
  {
    id: "TC-001",
    title: "Verify user login with valid credentials",
    priority: "High",
    status: "Active",
    type: "Functional",
    createdBy: "John Doe",
    createdDate: "2023-06-15",
  },
  {
    id: "TC-002",
    title: "Validate password reset functionality",
    priority: "Medium",
    status: "Active",
    type: "Functional",
    createdBy: "Sarah Smith",
    createdDate: "2023-06-16",
  },
  {
    id: "TC-003",
    title: "Test product search with special characters",
    priority: "Low",
    status: "Active",
    type: "Functional",
    createdBy: "Mike Johnson",
    createdDate: "2023-06-18",
  },
  {
    id: "TC-004",
    title: "Verify checkout process with multiple items",
    priority: "High",
    status: "Active",
    type: "Integration",
    createdBy: "Jane Wilson",
    createdDate: "2023-06-20",
  },
  {
    id: "TC-005",
    title: "Test responsiveness on mobile devices",
    priority: "Medium",
    status: "Active",
    type: "UI",
    createdBy: "John Doe",
    createdDate: "2023-06-21",
  },
];

// Interface for a test step
interface TestStep {
  id: number;
  description: string;
  expectedResult: string;
}

export default function TestCases() {
  const [testCases, setTestCases] = useState(testCasesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // New state for test steps
  const [testSteps, setTestSteps] = useState<TestStep[]>([
    { id: 1, description: "", expectedResult: "" }
  ]);
  
  const [newTestCase, setNewTestCase] = useState({
    title: "",
    description: "",
    priority: "Medium",
    type: "Functional",
  });
  
  // Add a new test step
  const addTestStep = () => {
    const newId = testSteps.length + 1;
    setTestSteps([...testSteps, { id: newId, description: "", expectedResult: "" }]);
  };
  
  // Update a test step
  const updateTestStep = (id: number, field: 'description' | 'expectedResult', value: string) => {
    const updatedSteps = testSteps.map(step => 
      step.id === id ? { ...step, [field]: value } : step
    );
    setTestSteps(updatedSteps);
  };
  
  // Remove a test step
  const removeTestStep = (id: number) => {
    if (testSteps.length <= 1) {
      toast.error("Test case must have at least one step");
      return;
    }
    const updatedSteps = testSteps.filter(step => step.id !== id);
    setTestSteps(updatedSteps);
  };
  
  const filteredTestCases = testCases.filter((testCase) =>
    testCase.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleCreateTestCase = () => {
    if (!newTestCase.title.trim()) {
      toast.error("Test case title is required");
      return;
    }
    
    // Validate test steps
    const invalidSteps = testSteps.filter(step => !step.description.trim());
    if (invalidSteps.length > 0) {
      toast.error("All test steps must have a description");
      return;
    }
    
    const newId = `TC-${String(testCases.length + 1).padStart(3, '0')}`;
    
    const createdTestCase = {
      id: newId,
      title: newTestCase.title,
      priority: newTestCase.priority,
      status: "Active",
      type: newTestCase.type,
      createdBy: "Current User",
      createdDate: new Date().toISOString().split('T')[0],
    };
    
    setTestCases([...testCases, createdTestCase]);
    
    // Reset form
    setNewTestCase({
      title: "",
      description: "",
      priority: "Medium",
      type: "Functional",
    });
    
    setTestSteps([{ id: 1, description: "", expectedResult: "" }]);
    setDialogOpen(false);
    toast.success("Test case created successfully");
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge variant="destructive">{priority}</Badge>;
      case "Medium":
        return <Badge variant="default" className="bg-brand-orange">{priority}</Badge>;
      case "Low":
        return <Badge variant="outline">{priority}</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  return (
    <PageContainer title="Test Cases">
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search test cases..." 
            className="pl-8" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Test Case
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Test Case</DialogTitle>
              <DialogDescription>
                Add details for your new test case
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  className="col-span-3"
                  value={newTestCase.title}
                  onChange={(e) => setNewTestCase({ ...newTestCase, title: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  className="col-span-3"
                  value={newTestCase.description}
                  onChange={(e) => setNewTestCase({ ...newTestCase, description: e.target.value })}
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Test Steps</h3>
                  <Button type="button" onClick={addTestStep} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Step
                  </Button>
                </div>
                
                {testSteps.map((step, index) => (
                  <div key={step.id} className="border rounded-md p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Step {index + 1}</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTestStep(step.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Trash className="h-4 w-4 text-destructive" />
                        <span className="sr-only">Remove step</span>
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-4 gap-4">
                        <Label htmlFor={`step-${step.id}`} className="text-right pt-2">
                          Description
                        </Label>
                        <Textarea
                          id={`step-${step.id}`}
                          className="col-span-3"
                          placeholder="Enter step description"
                          value={step.description}
                          onChange={(e) => updateTestStep(step.id, 'description', e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-4 gap-4">
                        <Label htmlFor={`expected-${step.id}`} className="text-right pt-2">
                          Expected Result
                        </Label>
                        <Textarea
                          id={`expected-${step.id}`}
                          className="col-span-3"
                          placeholder="Enter expected result"
                          value={step.expectedResult}
                          onChange={(e) => updateTestStep(step.id, 'expectedResult', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="text-right">
                  Priority
                </Label>
                <Select
                  value={newTestCase.priority}
                  onValueChange={(value) => setNewTestCase({ ...newTestCase, priority: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select
                  value={newTestCase.type}
                  onValueChange={(value) => setNewTestCase({ ...newTestCase, type: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Functional">Functional</SelectItem>
                    <SelectItem value="UI">UI</SelectItem>
                    <SelectItem value="Integration">Integration</SelectItem>
                    <SelectItem value="Performance">Performance</SelectItem>
                    <SelectItem value="Security">Security</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTestCase}>Create Test Case</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Test Cases Library</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="functional">Functional</TabsTrigger>
              <TabsTrigger value="ui">UI</TabsTrigger>
              <TabsTrigger value="integration">Integration</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead className="w-[300px]">Title</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTestCases.map((testCase) => (
                    <TableRow key={testCase.id}>
                      <TableCell className="font-medium">{testCase.id}</TableCell>
                      <TableCell>{testCase.title}</TableCell>
                      <TableCell>{getPriorityBadge(testCase.priority)}</TableCell>
                      <TableCell>{testCase.type}</TableCell>
                      <TableCell>{testCase.createdBy}</TableCell>
                      <TableCell>{testCase.createdDate}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="functional">
              <div className="flex justify-center items-center p-10 text-muted-foreground">
                Same list filtered to only show Functional test cases
              </div>
            </TabsContent>
            
            <TabsContent value="ui">
              <div className="flex justify-center items-center p-10 text-muted-foreground">
                Same list filtered to only show UI test cases
              </div>
            </TabsContent>
            
            <TabsContent value="integration">
              <div className="flex justify-center items-center p-10 text-muted-foreground">
                Same list filtered to only show Integration test cases
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
