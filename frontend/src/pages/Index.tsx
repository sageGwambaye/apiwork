
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import StudentList from "@/components/StudentList";
import CourseList from "@/components/CourseList";
import NodeIndicator from "@/components/NodeIndicator";

const Index = () => {
  const [activeTab, setActiveTab] = useState<string>("home");
  const { toast } = useToast();
  const [nodeId, setNodeId] = useState<string>("Unknown");

  useEffect(() => {
    // Get the node ID from custom header
    const fetchNodeId = async () => {
      try {
        const response = await fetch("/api/node-id");
        const nodeIdHeader = response.headers.get("X-Node-ID");
        if (nodeIdHeader) {
          setNodeId(nodeIdHeader);
        }
      } catch (error) {
        console.error("Failed to fetch node ID:", error);
      }
    };

    fetchNodeId();
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    if (value !== "home") {
      toast({
        title: value === "students" ? "Loading Students" : "Loading Courses",
        description: "Fetching data from server...",
        duration: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-blue-700">
              Student Portal
            </h1>
            <NodeIndicator nodeId={nodeId} />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs
          defaultValue="home"
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
          </TabsList>
          
          <TabsContent value="home" className="mt-6">
            <Card className="border-t-4 border-t-blue-600">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Welcome to Student Portal</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-6">
                <p className="text-center text-gray-600 max-w-lg">
                  Access information about our students and courses offered in the Software Engineering program.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
                  <Button 
                    size="lg" 
                    className="h-24 text-lg bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleTabChange("students")}
                  >
                    Students
                  </Button>
                  <Button 
                    size="lg" 
                    className="h-24 text-lg bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => handleTabChange("courses")}
                  >
                    Courses
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="students" className="mt-6">
            <StudentList />
          </TabsContent>
          
          <TabsContent value="courses" className="mt-6">
            <CourseList />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center text-sm">
          © {new Date().getFullYear()} Student Portal. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
