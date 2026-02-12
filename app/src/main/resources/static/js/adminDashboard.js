/*
  This script handles the admin dashboard functionality for managing doctors:
  - Loads all doctor cards
  - Filters doctors by name, time, or specialty
  - Adds a new doctor via modal form


  Attach a click listener to the "Add Doctor" button
  When clicked, it opens a modal form using openModal('addDoctor')


  When the DOM is fully loaded:
    - Call loadDoctorCards() to fetch and display all doctors


  Function: loadDoctorCards
  Purpose: Fetch all doctors and display them as cards

    Call getDoctors() from the service layer
    Clear the current content area
    For each doctor returned:
    - Create a doctor card using createDoctorCard()
    - Append it to the content div

    Handle any fetch errors by logging them


  Attach 'input' and 'change' event listeners to the search bar and filter dropdowns
  On any input change, call filterDoctorsOnChange()


  Function: filterDoctorsOnChange
  Purpose: Filter doctors based on name, available time, and specialty

    Read values from the search bar and filters
    Normalize empty values to null
    Call filterDoctors(name, time, specialty) from the service

    If doctors are found:
    - Render them using createDoctorCard()
    If no doctors match the filter:
    - Show a message: "No doctors found with the given filters."

    Catch and display any errors with an alert


  Function: renderDoctorCards
  Purpose: A helper function to render a list of doctors passed to it

    Clear the content area
    Loop through the doctors and append each card to the content area


  Function: adminAddDoctor
  Purpose: Collect form data and add a new doctor to the system

    Collect input values from the modal form
    - Includes name, email, phone, password, specialty, and available times

    Retrieve the authentication token from localStorage
    - If no token is found, show an alert and stop execution

    Build a doctor object with the form values

    Call saveDoctor(doctor, token) from the service

    If save is successful:
    - Show a success message
    - Close the modal and reload the page

    If saving fails, show an error message
*/

// 1. Importējam moduļus
import { openModal } from "./components/modals.js";
import { getDoctors, filterDoctors, saveDoctor } from "./services/doctorServices.js";
import { createDoctorCard } from "./components/doctorCard.js";

const contentDiv = document.getElementById("content");

// 2. Ielādējam ārstus, kad lapa ir gatava
document.addEventListener("DOMContentLoaded", () => {
    loadDoctorCards();
    
    // Piesaistām "Add Doctor" pogu
    const addDocBtn = document.getElementById('addDocBtn');
    if (addDocBtn) {
        addDocBtn.addEventListener('click', () => openModal('addDoctor'));
    }

    // Meklēšanas un filtru klausītāji
    document.getElementById("searchBar").addEventListener("input", filterDoctorsOnChange);
    document.getElementById("filterTime").addEventListener("change", filterDoctorsOnChange);
    document.getElementById("filterSpecialty").addEventListener("change", filterDoctorsOnChange);
});

// Funkcija visu ārstu ielādei
async function loadDoctorCards() {
    contentDiv.innerHTML = ""; 
    const doctors = await getDoctors();
    renderDoctorCards(doctors);
}

// Filtru apstrāde
async function filterDoctorsOnChange() {
    const name = document.getElementById("searchBar").value;
    const time = document.getElementById("filterTime").value;
    const specialty = document.getElementById("filterSpecialty").value;

    const doctors = await filterDoctors(name, time, specialty);
    contentDiv.innerHTML = "";
    if (doctors.length > 0) {
        renderDoctorCards(doctors);
    } else {
        contentDiv.innerHTML = "<p>No doctors found</p>";
    }
}

function renderDoctorCards(doctors) {
    doctors.forEach(doctor => {
        const card = createDoctorCard(doctor);
        contentDiv.appendChild(card);
    });
}

// 3. Jauna ārsta pievienošana
window.adminAddDoctor = async function () {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first");

    const doctorData = {
        name: document.getElementById("docName").value,
        specialty: document.getElementById("docSpecialty").value,
        email: document.getElementById("docEmail").value,
        mobile: document.getElementById("docMobile").value,
        availability: Array.from(document.querySelectorAll('input[name="availability"]:checked')).map(cb => cb.value)
    };

    const result = await saveDoctor(doctorData, token);
    if (result.success) {
        alert("Doctor added successfully!");
        location.reload(); // Atsvaidzinām sarakstu
    } else {
        alert("Error: " + result.message);
    }
};

//update