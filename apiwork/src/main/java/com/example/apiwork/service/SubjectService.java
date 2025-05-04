// src/main/java/com/example/apiwork/service/SubjectService.java

package com.example.apiwork.service;

import com.example.apiwork.model.Subject;
import com.example.apiwork.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubjectService {
    @Autowired
    private SubjectRepository subjectRepository;

    public List<Subject> getSubjectsByYear(int year) {
        return subjectRepository.findAll().stream()
                .filter(subject -> subject.getYear() == year)
                .collect(Collectors.toList());
    }
}
