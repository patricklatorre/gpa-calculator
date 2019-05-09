$(document).ready(() => {
  // UI elements
  const nameField = document.getElementById('nameField');
  const unitsField = document.getElementById('unitsField');
  const gradeField = document.getElementById('gradeField');
  const addBtn = document.getElementById('addBtn');
  const gradeCard = document.getElementById('gradeCard');
  const controlsCard = document.getElementById('controlsCard');
  const gradeTable = document.getElementById('gradeTable');
  const gpaText = document.getElementById('gpaText');

  // Valid data
  const validFloats = ['0.0', '1.0', '1.5', '2.0', '2.5', '3.0', '3.5', '4.0'];
  const validInts = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  const UNITS_COL = 1;
  const GRADES_COL = 2;

  // show table upon first class entry
  let showTable = false;

  /**
   * Validates data in fields then adds a table entry upon success. Also handles
   * showing the table upon first class entry. Validation checks if fields are
   * empty and if the values are valid.
   * @param {string} name value of the nameField
   * @param {number} units value of the unitsField
   * @param {number} grade value of the gradeField
   */
  function addClassEntry(name, units, grade) {
    // check if a field is empty
    if (name == ''
      || (units + '') == ''
      || (grade + '') == '') {
      window.alert('Fill in the fields first!');
      return;
    }

    // validate name and format the value to uppercase
    const validName = validateClass(name);
    if (validName == null) {
      window.alert(`${validName} is not a valid class!`);
      return;
    }

    // validate and format units value
    const validUnits = validInts.includes(units) ? (units).charAt(0) : -1;
    if (validUnits == -1) {
      window.alert(`${units} is invalid!`);
      return;
    }

    // validate and format grade value
    let validGrade = validFloats.includes(grade) ? grade : -1;
    if (validGrade == -1) {
      validGrade = validInts.includes(grade) ? (grade + '.0') : -1;
      if (validGrade == -1) {
        window.alert(`${grade} is not a valid grade`);
        return;
      }
    }

    // create a table row and insert formatted values
    const row = gradeTable.insertRow(1);
    row.classList.add('bg-white', 'collapse');
    const nameCol = row.insertCell(0);
    nameCol.innerHTML = validName;
    const unitsCol = row.insertCell(1);
    unitsCol.innerHTML = validUnits;
    const gradeCol = row.insertCell(2);
    gradeCol.innerHTML = validGrade;

    // show table and change style on first table entry
    if (!showTable) {
      controlsCard.classList.replace('mt-5', 'mt-3');
      gradeCard.classList.add('show');
      gradeCard.classList.add('animated', 'fadeInDown');
      controlsCard.classList.add('animated', 'fadeInDown');
      showTable = true;
    }

    // animate the row
    row.classList.add('show', 'animated', 'fadeIn');

    // update GPA
    gpaText.innerHTML = calculateGPA().toFixed(2);

    // reset input
    clearFields();
    nameField.focus();
  }


  /**
   * Checks if a string is a valid class value.
   * @param {string} name the string to be validated
   * @return {string} uppercase form of string if valid; otherwise null
   */
  function validateClass(name) {
    if (name.length == 7) return name.toUpperCase();
    return null;
  }

  /**
   * Calculates the GPA by traversing the rows of the table.
   * @return {number} the unrounded GPA
   */
  function calculateGPA() {
    let rowUnits;
    let rowGrade;
    let tentativeGrade = 0;
    let sumOfUnits = 0;

    // iterate through rows
    for (let i = 1; i < gradeTable.rows.length; i++) {
      rowUnits = parseFloat(gradeTable.rows[i].cells[UNITS_COL].innerHTML);
      rowGrade = parseFloat(gradeTable.rows[i].cells[GRADES_COL].innerHTML);
      tentativeGrade += rowUnits * rowGrade;
      sumOfUnits += parseFloat(gradeTable.rows[i].cells[UNITS_COL].innerHTML);
    }

    // return average
    return tentativeGrade / sumOfUnits;
  }

  /**
   * Clears all fields
   */
  function clearFields() {
    nameField.value = '';
    unitsField.value = '';
    gradeField.value = '';
  }

  // Listeners
  addBtn.addEventListener('click', () => {
    addClassEntry(nameField.value, unitsField.value, gradeField.value);
  });

  // key listeners
  const ENTER_KEY = 13;

  // move to next field when ENTER pressed
  nameField.addEventListener('keyup', (keyEvent) => {
    if (ENTER_KEY == keyEvent.keyCode) {
      gradeField.focus();
    }
  });

  // move to next field when ENTER pressed
  gradeField.addEventListener('keyup', (keyEvent) => {
    if (ENTER_KEY == keyEvent.keyCode) {
      unitsField.focus();
    }
  });

  // submit data when ENTER pressed on last field
  unitsField.addEventListener('keyup', (keyEvent) => {
    if (ENTER_KEY == keyEvent.keyCode) {
      addClassEntry(nameField.value, unitsField.value, gradeField.value);
    }
  });
});
