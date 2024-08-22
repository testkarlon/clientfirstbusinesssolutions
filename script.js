
document.addEventListener('DOMContentLoaded', () => {
    const calendar = document.getElementById('calendar');
    const currentMonthElement = document.getElementById('currentMonth');
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');
    const form = document.getElementById('bookingForm');
    const dataTableBody = document.querySelector('#dataTable tbody');

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();
    let selectedDate = null;

    const holidays = [
        '2023-01-01', // New Year's Day
        '2023-03-29', // Spiritual Baptist Liberation Day
        '2023-04-14', // Good Friday
        '2023-04-17', // Easter Monday
        '2023-05-30', // Indian Arrival Day
        '2023-06-19', // Labour Day
        '2023-08-01', // Emancipation Day
        '2023-08-31', // Independence Day
        '2023-09-24', // Republic Day
        '2023-10-27', // Divali
        '2023-12-25', // Christmas Day
        '2023-12-26'  // Boxing Day
    ];

    function generateCalendar(year, month) {
        calendar.innerHTML = '';
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Create day headers
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        daysOfWeek.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.classList.add('day', 'header');
            dayHeader.textContent = day;
            calendar.appendChild(dayHeader);
        });

        // Create days
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('day', 'empty');
            calendar.appendChild(emptyDay);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day');
            dayElement.textContent = i;

            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            const dayOfWeek = new Date(year, month, i).getDay();

            if (holidays.includes(dateString) || dayOfWeek === 0 || dayOfWeek === 6) {
                dayElement.classList.add('unavailable');
            } else {
                dayElement.addEventListener('click', () => {
                    if (selectedDate) {
                        selectedDate.classList.remove('selected');
                    }
                    selectedDate = dayElement;
                    dayElement.classList.add('selected');
                });
            }

            if (dayOfWeek === 0 || dayOfWeek === 6) {
                dayElement.classList.add('weekend');
            }

            calendar.appendChild(dayElement);
        }
    }

    function updateMonthDisplay() {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        currentMonthElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    }

    function switchMonth(direction) {
        if (direction === 'prev') {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
        } else if (direction === 'next') {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
        }
        generateCalendar(currentYear, currentMonth);
        updateMonthDisplay();
    }

    prevMonthButton.addEventListener('click', () => switchMonth('prev'));
    nextMonthButton.addEventListener('click', () => switchMonth('next'));

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const contact = document.getElementById('contact').value;
        const service = document.getElementById('service').value;
        const number = document.getElementById('number').value;
        const company = document.getElementById('company').value;

        if (!name || !contact || !service) {
            document.querySelectorAll('.error-message').forEach(msg => msg.style.display = 'block');
            return;
        }

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${name}</td>
            <td>${contact}</td>
            <td>${service}</td>
            <td>${number}</td>
            <td>${company}</td>
        `;
        dataTableBody.appendChild(newRow);

        form.reset();
        document.querySelectorAll('.error-message').forEach(msg => msg.style.display = 'none');
    });

    generateCalendar(currentYear, currentMonth);
    updateMonthDisplay();
});