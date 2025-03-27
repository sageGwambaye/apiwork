
package com.example.apiwork.model;

import jakarta.persistence.*;

@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String program;

    public Student() {}

    public Student(String name, String program) {
        this.name = name;
        this.program = program;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getProgram() { return program; }
}
