const initialVerstappenPoints = 313;
const initialNorrisPoints = 254;
const races = [
    "Singapur", "EEUU", "Mexico",
    "Brazil", "Las Vegas", "Qatar", "Abu Dhabi"
];
const sprints = ["EEUU", "Brazil", "Qatar"];

let racePositions = races.map(() => ({ verstappen: '', norris: '' }));
let sprintPositions = sprints.map(() => ({ verstappen: '', norris: '' }));

function calculatePoints(position, isSprint) {
    if (position === '' || isNaN(position)) return 0;
    const pos = parseInt(position);
    if (isSprint) {
        return pos <= 8 ? [8, 7, 6, 5, 4, 3, 2, 1][pos - 1] : 0;
    } else {
        return pos <= 10 ? [25, 18, 15, 12, 10, 8, 6, 4, 2, 1][pos - 1] : 0;
    }
}

function calculateTotalPoints() {
    const verstappenTotal = initialVerstappenPoints +
        racePositions.reduce((sum, race) => sum + calculatePoints(race.verstappen, false), 0) +
        sprintPositions.reduce((sum, sprint) => sum + calculatePoints(sprint.verstappen, true), 0);
    
    const norrisTotal = initialNorrisPoints +
        racePositions.reduce((sum, race) => sum + calculatePoints(race.norris, false), 0) +
        sprintPositions.reduce((sum, sprint) => sum + calculatePoints(sprint.norris, true), 0);

    return { verstappenTotal, norrisTotal };
}

function updateResults() {
    const { verstappenTotal, norrisTotal } = calculateTotalPoints();
    const pointDifference = verstappenTotal - norrisTotal;
    const remainingEvents = races.length + sprints.length;
    const averagePointsNeeded = pointDifference > 0 ? (pointDifference / remainingEvents).toFixed(2) : 0;

    document.getElementById('verstappen-points').textContent = `Puntos totales de Verstappen: ${verstappenTotal}`;
    document.getElementById('norris-points').textContent = `Puntos totales de Norris: