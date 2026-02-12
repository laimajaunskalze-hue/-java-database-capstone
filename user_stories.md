# User Stories - Smart Clinic Project

## 1. Patient Registration
**Title:** Register a New Patient
_As a **Administrator**, I want to **register a new patient**, so that **their medical records can be managed and tracked in the clinic system**._

**Acceptance Criteria:**
1. The system must save the patient's name, surname, and contact info in the MySQL database.
2. Each patient must be assigned a unique ID automatically.
3. A success message should be displayed to the admin after the record is saved.

**Priority:** High
**Story Points:** 5
**Notes:** Data is stored in the structured MySQL relational table.

---

## 2. Digital Prescriptions
**Title:** Create a Digital Prescription
_As a **Doctor**, I want to **create a digital prescription for a patient**, so that **it can be stored as a persistent document for future reference**._

**Acceptance Criteria:**
1. The doctor can select a patient from the existing records.
2. Prescription details (medication, dosage, duration) must be saved in MongoDB.
3. The doctor should be able to retrieve and view past prescriptions for that patient.

**Priority:** High
**Story Points:** 8
**Notes:** Uses MongoDB Document model to allow for flexible prescription data.

---

## 3. Appointment Booking
**Title:** Schedule a Patient Appointment
_As a **Patient**, I want to **book an appointment with a specific doctor**, so that **I can receive a medical consultation at a set time**._

**Acceptance Criteria:**
1. The user can view available time slots from the MySQL database.
2. Once a slot is booked, it must be marked as unavailable for others.
3. The appointment must appear on the Doctor's dashboard immediately.

**Priority:** Medium
**Story Points:** 5
**Notes:** Managed through the MVC/Thymeleaf interface for the dashboard.
