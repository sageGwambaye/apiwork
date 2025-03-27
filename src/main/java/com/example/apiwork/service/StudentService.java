// src/main/java/com/example/apiwork/service/StudentService.java

package com.example.apiwork.service;

import com.example.apiwork.model.Student;
import com.example.apiwork.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
}