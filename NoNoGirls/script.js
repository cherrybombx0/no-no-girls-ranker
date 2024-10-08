// Empty array for contestant details (you will add contestants later)
const contestants = [];  // Add contestant objects here

// Securely select elements
const contestantList = document.getElementById('contestant-list');
const ranks = document.querySelectorAll('.rank');

// Function to create contestant list items securely
function createContestantListItem(contestant) {
    const listItem = document.createElement('li');
    
    // Encode URI and component to prevent XSS and security risks
    listItem.innerHTML = `
        <img src="${encodeURI(contestant.image)}" alt="${encodeURIComponent(contestant.name)}">
        <span>${encodeURIComponent(contestant.name)}</span>
    `;

    listItem.addEventListener('click', () => assignContestant(contestant));
    contestantList.appendChild(listItem);
}

// Function to load contestants into the list (currently empty, to be added later)
function loadContestants() {
    contestants.forEach(contestant => createContestantListItem(contestant));
}

// Function to assign a contestant to an empty rank
function assignContestant(contestant) {
    const emptyRank = Array.from(ranks).find(rank => !rank.innerHTML);
    
    // If an empty rank is available, assign the contestant's image to it
    if (emptyRank) {
        emptyRank.innerHTML = `<img src="${encodeURI(contestant.image)}" alt="${encodeURIComponent(contestant.name)}">`;
    } else {
        alert('All ranks are filled!');
    }
}

// Search functionality to filter contestants by name
document.getElementById('search').addEventListener('input', function() {
    const searchValue = this.value.toLowerCase();
    contestantList.innerHTML = '';  // Clear current list

    // Filter and repopulate the list based on search input
    contestants
        .filter(contestant => contestant.name.toLowerCase().includes(searchValue))
        .forEach(contestant => createContestantListItem(contestant));
});

// Initial load of contestants (none yet, but you can add later)
loadContestants();
