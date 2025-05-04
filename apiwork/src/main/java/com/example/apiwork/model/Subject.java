package com.example.apiwork.model;

import jakarta.persistence.*;

@Entity
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private int year;

    public Subject() {}

    public Subject(String name, int year) {
        this.name = name;
        this.year = year;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public int getYear() { return year; }
}