package com.project.back_end.mvc;

import com.project.back_end.model.Prescription;
import com.project.back_end.services.PrescriptionService;
import com.project.back_end.services.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("${api.path}" + "prescription")
public class PrescriptionController {
    @Autowired private PrescriptionService prescriptionService;
    @Autowired private Service service;

    @PostMapping("/{token}")
    public ResponseEntity<Map<String, String>> savePrescription(@PathVariable String token, @RequestBody Prescription prescription) {
        ResponseEntity<Map<String, String>> auth = service.validateToken(token, "doctor");
        if (auth != null) return auth;
        return prescriptionService.savePrescription(prescription);
    }
}