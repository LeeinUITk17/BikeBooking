let calendar = document.querySelector('.calendar')

const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

let currDate = new Date()

let curr_month = { value: currDate.getMonth() }
let curr_year = { value: currDate.getFullYear() }

let startDate = null;
let endDate = null;

isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
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
let selectionStart = null;
let selectionEnd = null;
let clickCount = 0;

document.querySelector('.calendar-days').addEventListener('click', function (event) {
    let clickedDate = new Date(curr_year.value, curr_month.value, event.target.textContent);
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Chỉ thêm chấm đỏ nếu ngày được click không phải là ngày trong quá khứ
    if (clickedDate >= currentDate) {
        clickCount++;
        // Tạo chấm đỏ cho ngày được click
        let dot = document.createElement('span');
        dot.className = 'dot';
        event.target.appendChild(dot);
    }

    if (clickCount === 3) {
        // Xóa tất cả các chấm đỏ
        document.querySelectorAll('.dot').forEach(function (dot) {
            dot.remove();
        });

        // Reset ngày bắt đầu, ngày kết thúc và số lần click
        selectionStart = null;
        selectionEnd = null;
        clickCount = 0;
    } else {
        // Kiểm tra xem ngày bắt đầu đã được đặt chưa
        if (selectionStart === null) {
            selectionStart = event.target;
        } else {
            selectionEnd = event.target;

            // Tạo chấm đỏ cho tất cả các ngày trong vùng chọn
            let start = Array.from(document.querySelectorAll('.calendar-days div')).indexOf(selectionStart);
            let end = Array.from(document.querySelectorAll('.calendar-days div')).indexOf(selectionEnd);
            if (start > end) {
                [start, end] = [end, start];
            } 
            for (let i = start; i <= end; i++) {
                let dot = document.createElement('span');
                dot.className = 'dot';
                document.querySelectorAll('.calendar-days div')[i].appendChild(dot);
            }
        }
    }
});


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
    let startDate = selectionStart ? selectionStart.textContent : '';
    let endDate = selectionEnd ? selectionEnd.textContent : '';

    // Điền ngày bắt đầu và ngày kết thúc vào form
    document.querySelector('#start-date-input').value = startDate;
    document.querySelector('#end-date-input').value = endDate;
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
    let startDate = selectionStart ? selectionStart.textContent : '';
    let endDate = selectionEnd ? selectionEnd.textContent : '';

    // Điền ngày bắt đầu và ngày kết thúc vào form
    document.querySelector('#start-date-input p').textContent = startDate + " " + month_names[curr_month.value] + " " + curr_year.value;
    document.querySelector('#end-date-input p').textContent = endDate + " " + month_names[curr_month.value] + " " + curr_year.value;
}

span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
const gdate = new Date().toISOString().split('T')[0];
document.getElementById("gdate").innerHTML = gdate;
