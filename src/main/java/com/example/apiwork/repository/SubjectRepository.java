// src/main/java/com/example/apiwork/repository/SubjectRepository.java

package com.example.apiwork.repository;

import com.example.apiwork.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubjectRepository extends JpaRepository<Subject, Long> {
}