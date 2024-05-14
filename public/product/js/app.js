let calendar = document.querySelector('.calendar')

const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

let currDate = new Date()

let curr_month = {value: currDate.getMonth()}
let curr_year = {value: currDate.getFullYear()}

let startDate = null;
let endDate = null;

isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0)
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

generateCalendar = (month, year) => {
    let calendar_days = calendar.querySelector('.calendar-days')
    let calendar_header_year = calendar.querySelector('#year')

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    calendar_days.innerHTML = ''

    let curr_month_name = `${month_names[month]}`
    month_picker.innerHTML = curr_month_name
    calendar_header_year.innerHTML = year

    // get first day of month
    let first_day = new Date(year, month, 1)
    let last_day = new Date(year, month + 1, 0)

    // generate days for the previous month
    for (let i = 0; i < first_day.getDay(); i++) {
        let day = document.createElement('div')
        day.classList.add('calendar-day-hover', 'prev-month')
        day.innerHTML = new Date(year, month, i - first_day.getDay() + 1).getDate()
        calendar_days.appendChild(day)
    }

    // generate days for the current month
    for (let i = 1; i <= days_of_month[month]; i++) {
        let day = document.createElement('div');
        day.classList.add('calendar-day-hover');
        day.innerHTML = i;
        day.dataset.date = new Date(year, month, i).getTime();
        if (new Date(year, month, i) < new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate())) {
            day.classList.add('past-date');
        }
        if (i === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
            day.classList.add('curr-date');
        }
        calendar_days.appendChild(day);
    }

    // generate days for the next month
    for (let i = 1; i < 7 - last_day.getDay(); i++) {
        let day = document.createElement('div')
        day.classList.add('calendar-day-hover', 'next-month')
        day.innerHTML = i
        day.dataset.date = new Date(year, month + 1, i).getTime(); 
         // Check if the next month's day is in the past
        if (new Date(year, month + 1, i) < new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate())) {
            day.classList.add('past-date');
        }
        calendar_days.appendChild(day)
    }
}

let month_list = calendar.querySelector('.month-list')

month_names.forEach((e, index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div data-month="${index}">${e}</div>`
    month.querySelector('div').onclick = () => {
        month_list.classList.remove('show')
        curr_month.value = index
        generateCalendar(curr_month.value, curr_year.value)
    }
    month_list.appendChild(month)
})

let month_picker = calendar.querySelector('#month-picker')

month_picker.onclick = () => {
    month_list.classList.add('show')
}

generateCalendar(curr_month.value, curr_year.value)

document.querySelector('#prev-year').onclick = () => {
    --curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

document.querySelector('#next-year').onclick = () => {
    ++curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}
