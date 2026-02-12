package com.project.back_end.services;

import com.project.back_end.model.Admin;
import com.project.back_end.repositories.AdminRepository;
import com.project.back_end.repositories.DoctorRepository;
import com.project.back_end.repositories.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.HashMap;

@Service
public class Service {
    @Autowired private TokenService tokenService;
    @Autowired private AdminRepository adminRepository;
    @Autowired private DoctorRepository doctorRepository;
    @Autowired private PatientRepository patientRepository;

    public ResponseEntity<Map<String, String>> validateAdmin(Admin receivedAdmin) {
        Admin admin = adminRepository.findByUsername(receivedAdmin.getUsername());
        Map<String, String> response = new HashMap<>();
        if (admin != null && admin.getPassword().equals(receivedAdmin.getPassword())) {
            response.put("token", tokenService.generateToken(admin.getUsername()));
            return ResponseEntity.ok(response);
        }
        response.put("message", "Invalid admin credentials");
        return ResponseEntity.status(401).body(response);
    }

    public ResponseEntity<Map<String, String>> validateToken(String token, String user) {
        // Vienkāršota validācija: ja var izvilkt identifikatoru, tokens ir derīgs
        try {
            tokenService.extractIdentifier(token);
            return null; // Null nozīmē, ka kļūdu nav
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid token"));
        }
    }
}