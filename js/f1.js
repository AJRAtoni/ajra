const initialVerstappenPoints = 367; 
const initialNorrisPoints = 323;
const races = [
    "Brazil", "Las Vegas", "Qatar", "Abu Dhabi"
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
    const averagePointsNeeded = remainingEvents > 0 ? (Math.abs(pointDifference) / remainingEvents).toFixed(2) : 0;

    const verstappenPointsElem = document.getElementById('verstappen-points');
    const norrisPointsElem = document.getElementById('norris-points');
    const pointDifferenceElem = document.getElementById('point-difference');
    const averagePointsNeededElem = document.getElementById('average-points-needed');

    if (verstappenPointsElem && norrisPointsElem && pointDifferenceElem && averagePointsNeededElem) {
        verstappenPointsElem.textContent = `Puntos totales de Verstappen: ${verstappenTotal}`;
        norrisPointsElem.textContent = `Puntos totales de Norris: ${norrisTotal}`;
        pointDifferenceElem.textContent = `Diferencia de puntos: ${Math.abs(pointDifference)}`;

        if (pointDifference > 0) {
            averagePointsNeededElem.textContent = `Norris necesita sacar una media de ${averagePointsNeeded} puntos por evento a Verstappen para ganar el mundial.`;
        } else if (pointDifference < 0) {
            averagePointsNeededElem.textContent = `Verstappen necesita sacar una media de ${averagePointsNeeded} puntos por evento a Norris para ganar el mundial.`;
        } else {
            averagePointsNeededElem.textContent = 'Ambos pilotos están empatados en puntos.';
        }

        verstappenPointsElem.className = verstappenTotal >= norrisTotal ? 'green' : 'red';
        norrisPointsElem.className = norrisTotal > verstappenTotal ? 'green' : 'red';
    } else {
        console.error("Algunos elementos no se encuentran en el DOM. Verifica que todos los elementos con IDs específicos existan.");
    }
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

    if (racesContainer && sprintsContainer) {
        createInputRow(racesContainer, races, true);
        createInputRow(sprintsContainer, sprints, false);
        updateResults();
    } else {
        console.error("Contenedores 'races-container' o 'sprints-container' no encontrados en el DOM.");
    }
});
