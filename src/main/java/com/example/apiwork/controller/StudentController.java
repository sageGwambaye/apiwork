// src/main/java/com/example/apiwork/controller/StudentController.java

package com.example.apiwork.controller;

import com.example.apiwork.model.Student;
import com.example.apiwork.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @GetMapping
    public List<Student> getStudents() {
        return studentService.getAllStudents();
    }
}
