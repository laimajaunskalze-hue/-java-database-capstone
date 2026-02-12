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

---

## 4. Admin Authentication
**Title:** Secure Admin Login and Logout
_As an **Admin**, I want to **log in and out of the portal using my credentials**, so that **I can manage the platform securely and protect system access**._

**Acceptance Criteria:**
1. Admin must provide a valid username and password to enter the portal.
2. The session must be terminated immediately upon clicking "Log out".
3. Unauthorized users must be redirected away from administrative pages.

**Priority:** High
**Story Points:** 3
**Notes:** Authentication logic is handled by Spring Security.

---

## 5. Doctor Profile Management
**Title:** Add and Delete Doctor Profiles
_As an **Admin**, I want to **add and delete doctors from the portal**, so that **the medical staff directory remains accurate and up to date**._

**Acceptance Criteria:**
1. Admin can add a new doctor by providing name, specialty, and contact info.
2. Admin can remove a doctor profile which should cascade to their schedules.
3. Changes must reflect immediately in the MySQL `doctors` table.

**Priority:** High
**Story Points:** 5
**Notes:** Deletion requires a confirmation prompt to prevent accidental data loss.

---

## 6. Usage Statistics Reporting
**Title:** Track Monthly Appointment Statistics
_As an **Admin**, I want to **run a stored procedure to see the number of appointments per month**, so that **I can track clinic usage statistics**._

**Acceptance Criteria:**
1. The system must execute a stored procedure in the MySQL CLI.
2. The output must clearly show total appointments grouped by month.
3. Data must be retrieved from the relational MySQL database.

**Priority:** Medium
**Story Points:** 5
**Notes:** Requires `CALL get_monthly_appointments();` implementation in MySQL.
