
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
import { Plus, Search, Calendar, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// Sample test runs data
const testRunsData = [
  {
    id: "TR-001",
    name: "Sprint 53 Regression",
    status: "In Progress",
    totalTests: 45,
    passed: 32,
    failed: 5,
    blocked: 2,
    notRun: 6,
    assignee: "John Doe",
    createdDate: "2023-07-10",
    environment: "Production",
  },
  {
    id: "TR-002",
    name: "Login Feature",
    status: "Completed",
    totalTests: 12,
    passed: 11,
    failed: 1,
    blocked: 0,
    notRun: 0,
    assignee: "Sarah Smith",
    createdDate: "2023-07-08",
    environment: "Staging",
  },
  {
    id: "TR-003",
    name: "Payment Gateway Integration",
    status: "In Progress",
    totalTests: 28,
    passed: 15,
    failed: 3,
    blocked: 5,
    notRun: 5,
    assignee: "Mike Johnson",
    createdDate: "2023-07-05",
    environment: "Development",
  },
  {
    id: "TR-004",
    name: "Mobile App v2.1",
    status: "Not Started",
    totalTests: 34,
    passed: 0,
    failed: 0,
    blocked: 0,
    notRun: 34,
    assignee: "Jane Wilson",
    createdDate: "2023-07-02",
    environment: "Testing",
  },
];

export default function TestRuns() {
  const [testRuns, setTestRuns] = useState(testRunsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const [newRun, setNewRun] = useState({
    name: "",
    description: "",
    environment: "Testing",
    assignee: "",
  });
  
  const filteredRuns = testRuns.filter((run) =>
    run.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateRun = () => {
    if (!newRun.name.trim()) {
      toast.error("Test run name is required");
      return;
    }

    const newId = `TR-${String(testRuns.length + 1).padStart(3, '0')}`;
    
    const createdRun = {
      id: newId,
      name: newRun.name,
      status: "Not Started",
      totalTests: 0,
      passed: 0,
      failed: 0,
      blocked: 0,
      notRun: 0,
      assignee: newRun.assignee || "Unassigned",
      createdDate: new Date().toISOString().split('T')[0],
      environment: newRun.environment,
    };
    
    setTestRuns([...testRuns, createdRun]);
    setNewRun({
      name: "",
      description: "",
      environment: "Testing",
      assignee: "",
    });
    setDialogOpen(false);
    toast.success("Test run created successfully");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-500">{status}</Badge>;
      case "In Progress":
        return <Badge className="bg-brand-blue">{status}</Badge>;
      case "Not Started":
        return <Badge variant="outline">{status}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <PageContainer title="Test Runs">
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search test runs..." 
            className="pl-8" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Test Run
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Test Run</DialogTitle>
              <DialogDescription>
                Add details for your new test execution
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="run-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="run-name"
                  className="col-span-3"
                  value={newRun.name}
                  onChange={(e) => setNewRun({ ...newRun, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="run-description" className="text-right">
                  Description
                </Label>
                <Input
                  id="run-description"
                  className="col-span-3"
                  value={newRun.description}
                  onChange={(e) => setNewRun({ ...newRun, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="environment" className="text-right">
                  Environment
                </Label>
                <Select
                  value={newRun.environment}
                  onValueChange={(value) => setNewRun({ ...newRun, environment: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select environment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Development">Development</SelectItem>
                    <SelectItem value="Testing">Testing</SelectItem>
                    <SelectItem value="Staging">Staging</SelectItem>
                    <SelectItem value="Production">Production</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="assignee" className="text-right">
                  Assignee
                </Label>
                <Input
                  id="assignee"
                  className="col-span-3"
                  value={newRun.assignee}
                  onChange={(e) => setNewRun({ ...newRun, assignee: e.target.value })}
                  placeholder="Assign to user (optional)"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateRun}>Create Test Run</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Test Execution</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead className="w-[250px]">Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Results</TableHead>
                    <TableHead>Environment</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRuns.map((run) => (
                    <TableRow key={run.id}>
                      <TableCell className="font-medium">{run.id}</TableCell>
                      <TableCell>{run.name}</TableCell>
                      <TableCell>{getStatusBadge(run.status)}</TableCell>
                      <TableCell className="w-[200px]">
                        <div className="w-full">
                          <div className="flex justify-between text-xs mb-1">
                            <span>{Math.round((run.passed + run.failed) / run.totalTests * 100) || 0}% complete</span>
                            <span>{run.passed + run.failed}/{run.totalTests}</span>
                          </div>
                          <Progress value={(run.passed + run.failed) / run.totalTests * 100} />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <span className="flex items-center text-xs">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                            {run.passed}
                          </span>
                          <span className="flex items-center text-xs">
                            <XCircle className="h-3 w-3 text-red-500 mr-1" />
                            {run.failed}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{run.environment}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span className="text-xs">{run.createdDate}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Execute
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="active">
              <div className="flex justify-center items-center p-10 text-muted-foreground">
                Same list filtered to only show active runs
              </div>
            </TabsContent>
            
            <TabsContent value="completed">
              <div className="flex justify-center items-center p-10 text-muted-foreground">
                Same list filtered to only show completed runs
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
