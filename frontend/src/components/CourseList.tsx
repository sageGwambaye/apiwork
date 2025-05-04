
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface Course {
  id: number;
  code: string;
  name: string;
  year: 1 | 2 | 3 | 4;
  credits: number;
}

const CourseList = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [yearFilter, setYearFilter] = useState<string>("all");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        // Connect to your actual Spring API endpoint
        const response = await fetch("http://api:3000/subjects");
        
        // If API is not available or for development, fall back to mock data
        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        setCourses(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching courses:", err);
        
        // Fall back to mock data if API is not available
        console.log("Falling back to mock data...");
        const mockCourses: Course[] = [
          { id: 1, code: "SE101", name: "Introduction to Software Engineering", year: 1, credits: 3 },
          { id: 2, code: "CS150", name: "Programming Fundamentals", year: 1, credits: 4 },
          { id: 3, code: "MATH101", name: "Calculus I", year: 1, credits: 3 },
          { id: 4, code: "SE201", name: "Data Structures and Algorithms", year: 2, credits: 4 },
          { id: 5, code: "SE210", name: "Software Design Patterns", year: 2, credits: 3 },
          { id: 6, code: "CS250", name: "Computer Architecture", year: 2, credits: 3 },
          { id: 7, code: "SE301", name: "Software Testing and Quality Assurance", year: 3, credits: 4 },
          { id: 8, code: "SE310", name: "Web Application Development", year: 3, credits: 3 },
          { id: 9, code: "CS350", name: "Operating Systems", year: 3, credits: 4 },
          { id: 10, code: "SE401", name: "Software Project Management", year: 4, credits: 3 },
          { id: 11, code: "SE410", name: "Cloud Computing", year: 4, credits: 3 },
          { id: 12, code: "SE450", name: "Capstone Project", year: 4, credits: 6 }
        ];
        setCourses(mockCourses);
        setError("Could not connect to API. Showing mock data instead.");
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = yearFilter === "all" 
    ? courses 
    : courses.filter(course => course.year === parseInt(yearFilter));

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
      <Card className="border-t-4 border-t-emerald-600">
        <CardHeader>
          <CardTitle className="text-2xl">Software Engineering Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={yearFilter} onValueChange={setYearFilter} className="w-full mb-6">
            <TabsList className="grid grid-cols-5 w-full max-w-md mx-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="1">Year 1</TabsTrigger>
              <TabsTrigger value="2">Year 2</TabsTrigger>
              <TabsTrigger value="3">Year 3</TabsTrigger>
              <TabsTrigger value="4">Year 4</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading
              ? Array.from({ length: 9 }).map((_, index) => (
                  <Card key={`skeleton-${index}`}>
                    <CardContent className="p-4">
                      <Skeleton className="h-6 w-1/3 mb-2" />
                      <Skeleton className="h-8 w-full mb-2" />
                      <div className="flex justify-between mt-4">
                        <Skeleton className="h-6 w-1/4" />
                        <Skeleton className="h-6 w-1/4" />
                      </div>
                    </CardContent>
                  </Card>
                ))
              : filteredCourses.map(course => (
                  <Card key={course.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-gray-500 mb-1">
                        {course.code}
                      </div>
                      <h3 className="font-bold text-lg">{course.name}</h3>
                      <div className="flex justify-between mt-4">
                        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          Year {course.year}
                        </span>
                        <span className="text-sm bg-emerald-100 text-emerald-800 px-2 py-1 rounded">
                          {course.credits} credits
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseList;
