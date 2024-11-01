document.getElementById('fillForm').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: fillAbsenceForm
  });
});

function fillAbsenceForm() {
  // Mock data - replace with actual API call in production TODO
  const mockAbsences = [
    {
      country: "United States of America",
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
      multipleCountries: false,
      reason: 'Business trip',
    },
    {
      country: "United States of America",
      departureDate: {
        year: "2023",
        month: "8",
        day: "15"
      },
      returnDate: {
        year: "2023",
        month: "8",
        day: "30"
      },
      multipleCountries: false,
      reason: 'Tourism (such as a vacation)',
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
      countryInput.dispatchEvent(new Event('input', { bubbles: true }));


      const departureYear = document.querySelector('input[id="date-exitYear-date-left-canada-default"]');

      const departureMonth = document.querySelector('select[id="date-exitMonth-date-left-canada-default"]');
      const departureDay = document.querySelector('input[id="date-exitDay-date-left-canada-default"]');

      departureYear.value = absenceData.departureDate.year;
      departureMonth.value = `${absenceData.departureDate.month}: ${absenceData.departureDate.month}`;
      departureDay.value = absenceData.departureDate.day;

      departureYear.dispatchEvent(new Event('input', { bubbles: true }));
      departureYear.dispatchEvent(new Event('change', { bubbles: true }));
      departureYear.dispatchEvent(new Event('blur', { bubbles: true }));
      departureMonth.dispatchEvent(new Event('change', { bubbles: true }));
      departureMonth.dispatchEvent(new Event('blur', { bubbles: true }));
      departureDay.dispatchEvent(new Event('input', { bubbles: true }));
      departureDay.dispatchEvent(new Event('change', { bubbles: true }));
      departureDay.dispatchEvent(new Event('blur', { bubbles: true }));

      const returnYear = document.querySelector('input[id="date-returnYear-date-return-to-canada-default"]');
      const returnMonth = document.querySelector('select[id="date-returnMonth-date-return-to-canada-default"]');
      const returnDay = document.querySelector('input[id="date-returnDay-date-return-to-canada-default"]');

      returnYear.value = absenceData.returnDate.year;
      returnMonth.value = `${absenceData.departureDate.month}: ${absenceData.departureDate.month}`;
      returnDay.value = absenceData.returnDate.day;

      returnYear.dispatchEvent(new Event('input', { bubbles: true }));
      returnYear.dispatchEvent(new Event('change', { bubbles: true }));
      returnYear.dispatchEvent(new Event('blur', { bubbles: true }));
      returnMonth.dispatchEvent(new Event('change', { bubbles: true }));
      returnMonth.dispatchEvent(new Event('blur', { bubbles: true }));
      returnDay.dispatchEvent(new Event('input', { bubbles: true }));
      returnDay.dispatchEvent(new Event('change', { bubbles: true }));
      returnDay.dispatchEvent(new Event('blur', { bubbles: true }));

      const multipleCountries = document.querySelector('input[id="visitMoreThanOneCountryNodefault"')
      multipleCountries.checked = absenceData.multipleCountries;

      multipleCountries.dispatchEvent(new Event('input', { bubbles: true }));
      multipleCountries.dispatchEvent(new Event('change', { bubbles: true }));
      multipleCountries.dispatchEvent(new Event('blur', { bubbles: true }));

      setTimeout(() => {

        const absenceReason = document.querySelector('select[id="absenceReasonSelectordefault"]')
        const reasonMap = {
          'Business trip': '1: 01',
          'Business trip (self-employed)': '2: 02',
          'My job in the transportation industry': '3: 04',
          'Work and travel (working holiday)': '4: 05',
          'Studied abroad': '5: 06',
          'Tourism (such as a vacation)': '6: 07',
          'Visited a family member': '7: 09',
          // 'Other': '8: 08' // TODO
        };
        absenceReason.value = reasonMap[absenceData.reason]
        absenceReason.dispatchEvent(new Event('input', { bubbles: true }));
        absenceReason.dispatchEvent(new Event('change', { bubbles: true }));
        absenceReason.dispatchEvent(new Event('blur', { bubbles: true }));

        const saveButton = document.querySelector('button[data-cy="data-cy-AbsenceFromCanada-addButton"]');
        saveButton.click();
      }, 300)



    }, 300);
  }

  // Process each absence entry
  mockAbsences.forEach((absence, index) => {
    setTimeout(() => {
      fillSingleAbsence(absence);
    }, index * 2000); // Stagger the filling of multiple absences
  });
}
