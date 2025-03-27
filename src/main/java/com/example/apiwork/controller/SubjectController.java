// src/main/java/com/example/apiwork/controller/SubjectController.java

package com.example.apiwork.controller;

import com.example.apiwork.model.Subject;
import com.example.apiwork.service.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@RestController
@RequestMapping("/subjects")
public class SubjectController {
    @Autowired
    private SubjectService subjectService;

    @GetMapping
    public Map<Integer, List<Subject>> getSubjects() {
        return IntStream.rangeClosed(1, 4)
                .boxed()
                .collect(Collectors.toMap(year -> year, subjectService::getSubjectsByYear));
    }
}
