
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface Student {
  id: number;
  name: string;
  program: string;
}

const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        // Connect to your actual Spring API endpoint
        const response = await fetch("http://api:3000/students");
        
        // If API is not available or for development, fall back to mock data
        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        setStudents(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching students:", err);
        
        // Fall back to mock data if API is not available
        console.log("Falling back to mock data...");
        const mockStudents = [
          { id: 1, name: "John Smith", program: "Software Engineering" },
          { id: 2, name: "Emily Johnson", program: "Software Engineering" },
          { id: 3, name: "Michael Brown", program: "Computer Science" },
          { id: 4, name: "Sarah Wilson", program: "Data Science" },
          { id: 5, name: "David Martinez", program: "Software Engineering" },
          { id: 6, name: "Jennifer Lee", program: "Cybersecurity" },
          { id: 7, name: "Robert Taylor", program: "Software Engineering" },
          { id: 8, name: "Jessica Anderson", program: "Artificial Intelligence" },
          { id: 9, name: "Thomas Garcia", program: "Computer Engineering" },
          { id: 10, name: "Lisa Rodriguez", program: "Software Engineering" },
          { id: 11, name: "Daniel Lewis", program: "Information Technology" },
          { id: 12, name: "Michelle Clark", program: "Software Engineering" }
        ];
        setStudents(mockStudents);
        setError("Could not connect to API. Showing mock data instead.");
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div>
      <Card className="border-t-4 border-t-blue-600">
        <CardHeader>
          <CardTitle className="text-2xl">Students</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="warning" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading
              ? Array.from({ length: 12 }).map((_, index) => (
                  <Card key={`skeleton-${index}`} className="overflow-hidden">
                    <CardContent className="p-4">
                      <Skeleton className="h-8 w-3/4 mb-2" />
                      <Skeleton className="h-6 w-1/2" />
                    </CardContent>
                  </Card>
                ))
              : students.map(student => (
                  <Card key={student.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg">{student.name}</h3>
                      <p className="text-gray-600">{student.program}</p>
                    </CardContent>
                  </Card>
                ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentList;
