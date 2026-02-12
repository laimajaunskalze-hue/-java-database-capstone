package com.project.back_end.mvc;

import com.project.back_end.model.Doctor;
import com.project.back_end.model.Login;
import com.project.back_end.services.DoctorService;
import com.project.back_end.services.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("${api.path}" + "doctor")
public class DoctorController {
    @Autowired private DoctorService doctorService;
    @Autowired private Service service;

    @GetMapping
    public List<Doctor> getDoctors() {
        return doctorService.getDoctors();
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Login login) {
        return doctorService.validateDoctor(login);
    }

    @PostMapping("/{token}")
    public ResponseEntity<Map<String, String>> addDoctor(@RequestBody Doctor doctor, @PathVariable String token) {
        ResponseEntity<Map<String, String>> authResponse = service.validateToken(token, "admin");
        if (authResponse != null) return authResponse;
        
        int result = doctorService.saveDoctor(doctor);
        if (result == 1) return ResponseEntity.ok(Map.of("message", "Doctor added to db"));
        if (result == -1) return ResponseEntity.status(409).body(Map.of("message", "Doctor already exists"));
        return ResponseEntity.status(500).body(Map.of("message", "Some internal error occurred"));
    }
}