package com.project.back_end.mvc;

import com.project.back_end.model.Patient;
import com.project.back_end.model.Login;
import com.project.back_end.services.PatientService;
import com.project.back_end.services.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/patient")
public class PatientController {
    @Autowired private PatientService patientService;
    @Autowired private Service service;

    @PostMapping
    public ResponseEntity<Map<String, String>> createPatient(@RequestBody Patient patient) {
        if (!service.validatePatient(patient)) {
            return ResponseEntity.status(409).body(Map.of("message", "Patient with email id or phone no already exist"));
        }
        int result = patientService.createPatient(patient);
        if (result == 1) return ResponseEntity.ok(Map.of("message", "Signup successful"));
        return ResponseEntity.status(500).body(Map.of("message", "Internal server error"));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Login login) {
        return service.validatePatientLogin(login);
    }
}