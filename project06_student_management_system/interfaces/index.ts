interface Course {
  courseId: string;
  courseName: string;
}

interface Student {
  studentId: string;
  studentName: string;
  courses: string[];
  balance: number;
}

export { Course, Student };
