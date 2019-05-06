$(document).ready(() => {
    // UI elements
    var nameField = document.getElementById('nameField');
    var unitsField = document.getElementById('unitsField');
    var gradeField = document.getElementById('gradeField');
    var addBtn = document.getElementById('addBtn');
    var gradeCard = document.getElementById('gradeCard');
    var controlsCard = document.getElementById('controlsCard');
    var gradeTable = document.getElementById('gradeTable');
    var gpaText = document.getElementById('gpaText');

    // Valid data
    var validFloats = ["0.0", "1.0", "1.5", "2.0", "2.5", "3.0", "3.5", "4.0"];
    var validInts = ["0", "1", "2", "3", "4"];

    // Lock view of table
    var showTable = false;

    // functions
    function addClassEntry(name, units, grade) {
        // check if a field is empty
        if (name == "" || (unitsField + "") == "" || (gradeField + "") == "") {
            console.log('Failed to add class: Fields are empty');
            return;
        }

        // validate name and format the value (uppercase)
        var validName = validateClass(name);
        if (validName == null) {
            console.log('Failed to add class: Invalid class name');
            return;
        }

        // validate and format units value
        var validUnits = validFloats.includes(units + "") ? units + "" : -1;
        if (validUnits == -1) {
            validUnits = validInts.includes(units + "") ? units + ".0" : -1;
            if (validUnits == -1) {
                console.log('Failed to add class: Invalid units value');
                return;
            }
        }

        // validate and format grade value
        var validGrade = validFloats.includes(grade + "") ? grade + "" : -1;
        if (validGrade == -1) {
            validGrade = validInts.includes(grade + "") ? grade + ".0" : -1;
            if (validGrade == -1) {
                console.log('Failed to add class: Invalid units value');
                return;
            }
        }

        // create a table row and insert formatted values
        let row = gradeTable.insertRow(1);
        row.classList.add("bg-white", "collapse");
        let nameCol = row.insertCell(0);
        nameCol.innerHTML = validName;
        let unitsCol = row.insertCell(1);
        unitsCol.innerHTML = validUnits;
        let gradeCol = row.insertCell(2);
        gradeCol.innerHTML = validGrade;
        if (!showTable) {
            controlsCard.classList.replace("mt-5", "mt-3");
            gradeCard.classList.add("show");
            gradeCard.classList.add("animated", "fadeInDown");
            controlsCard.classList.add("animated", "fadeInDown");
            showTable = true;
        }

        row.classList.add("show", "animated", "fadeIn");

        // update GPA
        gpaText.innerHTML = calculateGPA().toFixed(2);

        // reset fields
        clearFields();
        focusOnClassField();
    }

    // return uppercase string if valid, otherwise null
    function validateClass(name) {
        if (name.length == 7) return name.toUpperCase();
        return null;
    }

    // iterate through table and return the final gpa
    function calculateGPA() {
        var tentativeGrade = 0;
        var sumOfUnits = 0;

        // iterate through rows
        for (var i = 1; i < gradeTable.rows.length; i++) {
            tentativeGrade += (parseFloat(gradeTable.rows[i].cells[1].innerHTML) * parseFloat(gradeTable.rows[i].cells[2].innerHTML));
            sumOfUnits += parseFloat(gradeTable.rows[i].cells[1].innerHTML);
        }

        // return average
        return tentativeGrade / sumOfUnits;
    }

    // clear fields
    function clearFields() {
        nameField.value = "";
        unitsField.value = "";
        gradeField.value = "";
    }

    // request focus to class name field
    function focusOnClassField() {
        nameField.focus();
    }

    // Listeners
    addBtn.addEventListener("click", () => {
        addClassEntry(nameField.value, unitsField.value, gradeField.value);
    });



    // key listeners
    const ENTER_KEY = 13;

    nameField.addEventListener("keyup", keyEvent => {
        if (ENTER_KEY == keyEvent.keyCode) {
            gradeField.focus();
        }
    });
    gradeField.addEventListener("keyup", keyEvent => {
        if (ENTER_KEY == keyEvent.keyCode) {
            unitsField.focus();
        }
    });
    unitsField.addEventListener("keyup", keyEvent => {
        if (ENTER_KEY == keyEvent.keyCode) {
            addClassEntry(nameField.value, unitsField.value, gradeField.value);
        }
    });
});