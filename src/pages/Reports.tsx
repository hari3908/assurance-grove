
import { PageContainer } from "@/components/layout/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

// Sample data for reports
const testResultsData = [
  { name: "Sprint 50", passed: 85, failed: 12, blocked: 3 },
  { name: "Sprint 51", passed: 76, failed: 18, blocked: 6 },
  { name: "Sprint 52", passed: 92, failed: 5, blocked: 3 },
  { name: "Sprint 53", passed: 80, failed: 15, blocked: 5 },
];

const statusDistributionData = [
  { name: "Passed", value: 832, color: "#22c55e" },
  { name: "Failed", value: 145, color: "#ef4444" },
  { name: "Blocked", value: 62, color: "#f97316" },
  { name: "Not Run", value: 251, color: "#64748b" },
];

const executionTrendData = [
  { name: "Week 1", executed: 45, automated: 20 },
  { name: "Week 2", executed: 52, automated: 25 },
  { name: "Week 3", executed: 68, automated: 30 },
  { name: "Week 4", executed: 72, automated: 35 },
  { name: "Week 5", executed: 80, automated: 42 },
  { name: "Week 6", executed: 92, automated: 50 },
];

export default function Reports() {
  return (
    <PageContainer title="Reports & Analytics">
      <div className="flex justify-end mb-6">
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Reports
        </Button>
      </div>

      <Tabs defaultValue="summary">
        <TabsList className="mb-6">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="coverage">Coverage</TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Test Results by Sprint</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={testResultsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="passed" name="Passed" fill="#22c55e" />
                      <Bar dataKey="failed" name="Failed" fill="#ef4444" />
                      <Bar dataKey="blocked" name="Blocked" fill="#f97316" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Test Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusDistributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => 
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {statusDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Test Execution Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={executionTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="executed" 
                      name="Tests Executed" 
                      stroke="#8B5CF6" 
                      strokeWidth={2} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="automated" 
                      name="Automated Tests" 
                      stroke="#0EA5E9" 
                      strokeWidth={2} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends">
          <div className="flex justify-center items-center p-20 text-muted-foreground">
            Detailed trend reports would be shown here
          </div>
        </TabsContent>
        
        <TabsContent value="coverage">
          <div className="flex justify-center items-center p-20 text-muted-foreground">
            Test coverage metrics would be shown here
          </div>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}
