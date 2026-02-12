# Smart Clinic Schema Design

## MySQL Database Design
Structured data such as user accounts, scheduling, and core relationships are managed here to ensure data integrity and enforce relationships.

### Table: admin
* **admin_id**: INT, Primary Key, Auto Increment — Unique identifier for system administrators.
* **username**: VARCHAR(50), Unique, Not Null — Used for secure login.
* **password**: VARCHAR(255), Not Null — Stored as a secure hash.

### Table: patients
* **patient_id**: INT, Primary Key, Auto Increment.
* **first_name**: VARCHAR(50), Not Null.
* **last_name**: VARCHAR(50), Not Null.
* **email**: VARCHAR(100), Unique, Not Null — Primary contact and login identifier.

### Table: doctors
* **doctor_id**: INT, Primary Key, Auto Increment.
* **full_name**: VARCHAR(100), Not Null.
* **specialty**: VARCHAR(100), Not Null (e.g., Cardiology, General Practice).
* **contact_info**: VARCHAR(150).

### Table: appointments
* **app_id**: INT, Primary Key, Auto Increment.
* **doctor_id**: INT, Foreign Key → `doctors(doctor_id)`.
* **patient_id**: INT, Foreign Key → `patients(patient_id)`.
* **appointment_time**: DATETIME, Not Null.
* **status**: INT (0 = Scheduled, 1 = Completed, 2 = Cancelled).



---

## MongoDB Collection Design
Flexible data such as prescriptions are stored in MongoDB to accommodate varying medical requirements without rigid table structures.

### Collection: prescriptions
This collection stores detailed prescription data. Using a document store allows us to nest arrays of medications.

```json
{
  "_id": "ObjectId('64abc123456')",
  "appointmentId": 101,
  "patientId": 45,
  "issueDate": "2026-02-12T13:45:00Z",
  "medications": [
    {
      "name": "Amoxicillin",
      "dosage": "500mg",
      "frequency": "Three times daily",
      "duration": "7 days"
    },
    {
      "name": "Ibuprofen",
      "dosage": "200mg",
      "frequency": "As needed for pain",
      "duration": "N/A"
    }
  ],
  "doctorNotes": "Patient should finish the full course of antibiotics."
}

Design Justification
MySQL Choice: I used MySQL for core entities (Admin, Patients, Doctors, Appointments) because they require strict relational integrity and predefined schemas.

MongoDB Choice: I used MongoDB for prescriptions because medical orders vary in complexity, and a nested JSON structure is more efficient than creating multiple mapping tables in SQL.
