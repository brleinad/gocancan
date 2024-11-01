document.getElementById('fillForm').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: fillAbsenceForm
  });
});

function fillAbsenceForm() {
  // Mock data - replace with actual API call in production
  const mockAbsences = [
    {
      country: "United States",
      departureDate: {
        year: "2023",
        month: "6",
        day: "15"
      },
      returnDate: {
        year: "2023",
        month: "6",
        day: "30"
      },
      multipleCountries: false
    }
  ];

  function fillSingleAbsence(absenceData) {
    // Click "Add an absence" button
    let addButton = Array.from(document.querySelectorAll('button'))
      .find(el => el.innerText === 'Add an absence');
    if (addButton) {
      addButton.click();
    }

    setTimeout(() => {
      const countryInput = document.querySelector('input[placeholder="Search for a country or territory"]');
      countryInput.value = absenceData.country;

      const departureYear = document.querySelector('input[id="date-exitYear-date-left-canada-default"]');
      const departureMonth = document.querySelector('select[id="date-exitMonth-date-left-canada-default"]');
      const departureDay = document.querySelector('input[id="date-exitDay-date-left-canada-default"]');

      departureYear.value = absenceData.departureDate.year;
      departureMonth.value = `${absenceData.departureDate.month}: ${absenceData.departureDate.month}`;
      departureDay.value = absenceData.departureDate.day;

      const returnYear = document.querySelector('input[name*="Year"][aria-label*="returned"]');
      const returnMonth = document.querySelector('select[aria-label*="Month"][aria-label*="returned"]');
      const returnDay = document.querySelector('input[name*="Day"][aria-label*="returned"]');

      returnYear.value = absenceData.returnDate.year;
      returnMonth.value = absenceData.returnDate.month;
      returnDay.value = absenceData.returnDate.day;


    }, 1000);
  }

  // Process each absence entry
  mockAbsences.forEach((absence, index) => {
    setTimeout(() => {
      fillSingleAbsence(absence);
    }, index * 2000); // Stagger the filling of multiple absences
  });
}
