const SPREADSHEET_ID = '1bjuRsUCQLT_MwgKQ9GR7gPHJyYq339v-JHM_ErPbGjI';
const API_KEY = 'AIzaSyBVknxjJb5j7AFLBrltXfOptE1xWweeGJ0';
const eventsContainer = document.getElementById('events');
const placeholderimagen = 'img/eventos.png';

let allEvents = [];

const formatDate = date => moment(date).format('DD/MM/YYYY');

const createEventCard = ({ titulo, eventDate, descripcion, imagen, url }) => {
    const today = moment.tz(moment.tz.guess()).startOf('day');
    const eventMoment = moment.tz(eventDate, moment.tz.guess());
    const daysRemaining = eventMoment.diff(today, 'days');
    const diasfaltan = `FALTAN ${daysRemaining} DÍAS`;

    const card = document.createElement('div');
    card.className = 'card';

    const linkElement = document.createElement('a');
    linkElement.href = url;
    linkElement.target = '_blank';

    const imageElement = document.createElement('img');
    imageElement.className = 'event-image';
    imageElement.src = imagen || placeholderimagen;
    imageElement.alt = titulo;

    if (url) {
        const linkElement = document.createElement('a');
        linkElement.href = url;
        linkElement.target = '_blank';
        linkElement.appendChild(imageElement);
        card.appendChild(linkElement);
    } else {
        card.appendChild(imageElement);
    }

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const eventTitle = document.createElement('h2');
    eventTitle.className = 'titulo';
    eventTitle.textContent = titulo;

    const eventDateElement = document.createElement('p');
    eventDateElement.className = 'fecha';
    eventDateElement.textContent = formatDate(eventDate);

    const eventDescription = document.createElement('p');
    eventDescription.className = 'descripcion';
    eventDescription.textContent = descripcion;

    const daysRemainingContainer = document.createElement('div');
    daysRemainingContainer.className = 'faltan-container';

    const daysRemainingElement = document.createElement('p');
    daysRemainingElement.className = 'faltan';
    daysRemainingElement.textContent = diasfaltan;
    daysRemainingContainer.appendChild(daysRemainingElement);

    [eventTitle, eventDateElement, eventDescription, daysRemainingContainer].forEach(element => cardBody.appendChild(element));

    card.appendChild(cardBody);

    return card;
};

const fetchGoogleSheetEvents = () => {
    const now = moment.tz(moment.tz.guess()).startOf('day').toDate();
    const sheetRange = 'Eventos!A2:F';
    const sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${sheetRange}?key=${API_KEY}`;

    fetch(sheetUrl)
        .then(response => response.json())
        .then(data => {
            const rows = data.values || [];
            allEvents = rows
                .map(row => {
                    const [titulo, dateString, descripcion, imageUrl, categoriaRow, url] = row;
                    const eventDate = moment(dateString, 'DD/MM/YYYY').toDate();
                    return !isNaN(eventDate.getTime()) && eventDate >= now
                        ? { titulo, eventDate, descripcion, imagen: imageUrl || placeholderimagen, categoria: categoriaRow, url }
                        : null;
                })


                .filter(Boolean)
                .sort((a, b) => a.eventDate - b.eventDate);

            displayEvents(allEvents);
        })
        .catch(error => console.error('Error:', error));
}

const displayEvents = (events) => {
    eventsContainer.innerHTML = '';
    events.forEach(event => {
        eventsContainer.appendChild(createEventCard(event));
    });
}

function filterEvents(categoria) {
    document.querySelectorAll('.botonesfiltro').forEach(button => {
        button.classList.add('inactive');
    });

    if (categoria === 'todos') {
        document.querySelectorAll('.botonesfiltro').forEach(button => {
            button.classList.remove('inactive');
        });
    } else {
        document.querySelector(`.botonesfiltro[onclick="filterEvents('${categoria}')"]`).classList.remove('inactive');
    }

    if (categoria === 'todos') {
        displayEvents(allEvents);
    } else {
        const filteredEvents = allEvents.filter(event => event.categoria === categoria);
        displayEvents(filteredEvents);
    }
}

function searchEvents() {
    const searchString = document.getElementById('searchInput').value.toLowerCase();

    const filteredEvents = allEvents.filter(event =>
        (event.titulo ? event.titulo.toLowerCase().includes(searchString) : false) ||
        (event.descripcion ? event.descripcion.toLowerCase().includes(searchString) : false)
    );

    displayEvents(filteredEvents);
}

fetchGoogleSheetEvents();