const initialVerstappenPoints = 393;
const initialNorrisPoints = 331;
const races = [
    "Las Vegas", "Qatar", "Abu Dhabi"
];
const sprints = ["Qatar"];

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
    document.getElementById('norris-points').textContent = `Puntos totales de Norris: ${norrisTotal}`;
    document.getElementById('point-difference').textContent = `Diferencia de puntos: ${Math.abs(pointDifference)}`;

    if (pointDifference > 0) {
        document.getElementById('average-points-needed').textContent = `Norris necesita sacar una media de ${averagePointsNeeded} puntos por evento a Verstappen para ganar el mundial.`;
    } else if (pointDifference < 0) {
        document.getElementById('average-points-needed').textContent = `Verstappen necesita sacar una media de ${(-averagePointsNeeded).toFixed(2)} puntos por evento a Norris para ganar el mundial.`;
    } else {
        document.getElementById('average-points-needed').textContent = 'Ambos pilotos están empatados en puntos.';
    }

    document.getElementById('verstappen-points').className = verstappenTotal >= norrisTotal ? 'green' : 'red';
    document.getElementById('norris-points').className = norrisTotal > verstappenTotal ? 'green' : 'red';
}

function createInputRow(container, events, isRace) {
    events.forEach((event, index) => {
        const row = document.createElement('div');
        row.className = isRace ? 'race-row' : 'sprint-row';

        const label = document.createElement('label');
        label.textContent = `${event}:`;

        const verstappenInput = document.createElement('input');
        verstappenInput.type = 'number';
        verstappenInput.min = '1';
        verstappenInput.max = '20';
        verstappenInput.addEventListener('input', (e) => {
            if (isRace) {
                racePositions[index].verstappen = e.target.value;
            } else {
                sprintPositions[index].verstappen = e.target.value;
            }
            updateResults();
        });

        const norrisInput = document.createElement('input');
        norrisInput.type = 'number';
        norrisInput.min = '1';
        norrisInput.max = '20';
        norrisInput.addEventListener('input', (e) => {
            if (isRace) {
                racePositions[index].norris = e.target.value;
            } else {
                sprintPositions[index].norris = e.target.value;
            }
            updateResults();
        });

        row.appendChild(label);
        row.appendChild(verstappenInput);
        row.appendChild(norrisInput);
        container.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const racesContainer = document.getElementById('races-container');
    const sprintsContainer = document.getElementById('sprints-container');

    createInputRow(racesContainer, races, true);
    createInputRow(sprintPositions, sprints, false);

    updateResults();
});