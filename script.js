let column1 = [];
let column2 = [];
let column3 = [];

// Fetch each JSON file for each column
fetch("column1.json")
    .then(response => response.json())
    .then(data => {
        column1 = data; 
        populateDropdown("column1", column1);
    })
    .catch(error => console.error("Error loading column1.json:", error));

fetch("column2.json")
    .then(response => response.json())
    .then(data => {
        column2 = data; 
        populateDropdown("column2", column2);
    })
    .catch(error => console.error("Error loading column2.json:", error));

fetch("column3.json")
    .then(response => response.json())
    .then(data => {
        column3 = data; 
        populateDropdown("column3", column3);
    })
    .catch(error => console.error("Error loading column3.json:", error));

// Dropdowns will be dynamically populated based on the data in the JSON files
function populateDropdown(columnId, columnData) {
    const selectElement = document.getElementById(columnId);
    selectElement.innerHTML = ''; // Clear the dropdown

    // Add "Random" option
    const randomOption = document.createElement('option');
    randomOption.value = 'random';
    randomOption.textContent = 'Random';
    selectElement.appendChild(randomOption);

    // Populate the dropdown with words from the JSON file
    columnData.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        selectElement.appendChild(option);
    });
}

// "You?" checkbox event listener
document.getElementById("you-checkbox").addEventListener("change", function () {
    const youColumns = document.getElementById("you-columns");
    if (this.checked) {
        youColumns.style.display = "flex"; // Show the You/Thou dropdown
    } else {
        youColumns.style.display = "none"; // Hide the You/Thou dropdown
    }
});

// Generate button event listener
document.getElementById("generate-btn").addEventListener("click", function () {
    const selectedColumn1 = document.getElementById("column1").value;
    const selectedColumn2 = document.getElementById("column2").value;
    const selectedColumn3 = document.getElementById("column3").value;
    const selectedYouOrThou = document.getElementById("you-select") ? document.getElementById("you-select").value : "random";

    // Get random words or selected words from each column
    const word1 = getWord(selectedColumn1, column1);
    const word2 = getWord(selectedColumn2, column2);
    const word3 = getWord(selectedColumn3, column3);

    let result = "";

    // If "You?" is checked, prepend "You" or "Thou"
    if (document.getElementById("you-checkbox").checked) {
        if (selectedYouOrThou === "you") {
            result = `You ${word1} ${word2} ${word3}`;
        } else if (selectedYouOrThou === "thou") {
            result = `Thou ${word1} ${word2} ${word3}`;
        }
    } else {
        result = `${word1} ${word2} ${word3}`;
    }

    document.getElementById("result").value = result;
});

// Function to get a word based on the selected option or random
function getWord(selection, column) {
    if (selection === "random") {
        return column[Math.floor(Math.random() * column.length)];
    }
    return selection; // If a specific word is selected, return that word
}

//End