
import { PageContainer } from "@/components/layout/PageContainer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Mock data for dashboard
const testRunsData = [
  { name: "Project A", passed: 85, failed: 15 },
  { name: "Project B", passed: 65, failed: 35 },
  { name: "Project C", passed: 92, failed: 8 },
  { name: "Project D", passed: 78, failed: 22 },
];

const testStatusData = [
  { name: "Passed", value: 75, color: "#22c55e" },
  { name: "Failed", value: 15, color: "#ef4444" },
  { name: "Blocked", value: 5, color: "#f97316" },
  { name: "Not Run", value: 5, color: "#64748b" },
];

const recentProjects = [
  { name: "API Testing", progress: 68, tests: 125 },
  { name: "Mobile App", progress: 32, tests: 84 },
  { name: "Dashboard UI", progress: 90, tests: 56 },
];

export default function Dashboard() {
  return (
    <PageContainer title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Test Runs</CardTitle>
            <CardDescription>Recent test execution status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={testRunsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="passed" stackId="a" fill="#22c55e" />
                  <Bar dataKey="failed" stackId="a" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Test Status</CardTitle>
            <CardDescription>Overall test result distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={testStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => 
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {testStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>Test progress by project</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentProjects.map((project) => (
                <div key={project.name} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{project.name}</span>
                    <span className="text-muted-foreground text-sm">
                      {project.progress}% ({project.tests} tests)
                    </span>
                  </div>
                  <Progress value={project.progress} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-brand-purple pl-4 py-2">
                <p className="font-medium">Test Run Created</p>
                <p className="text-sm text-muted-foreground">Sprint 23 Regression by John Doe</p>
                <p className="text-xs text-muted-foreground">10 minutes ago</p>
              </div>
              <div className="border-l-4 border-brand-blue pl-4 py-2">
                <p className="font-medium">Test Case Updated</p>
                <p className="text-sm text-muted-foreground">Login functionality by Sarah Smith</p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
              <div className="border-l-4 border-brand-orange pl-4 py-2">
                <p className="font-medium">Project Created</p>
                <p className="text-sm text-muted-foreground">Mobile App v2.0 by Mike Johnson</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Testing metrics overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted rounded-lg p-4">
                <p className="text-sm font-medium text-muted-foreground">Total Test Cases</p>
                <p className="text-3xl font-bold">1,286</p>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                <p className="text-3xl font-bold">8</p>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <p className="text-sm font-medium text-muted-foreground">Pass Rate</p>
                <p className="text-3xl font-bold">86%</p>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <p className="text-sm font-medium text-muted-foreground">Test Runs This Week</p>
                <p className="text-3xl font-bold">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
