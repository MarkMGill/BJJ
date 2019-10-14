/*****************************/
/******* SCHEDULE PAGE *******/
/*****************************/

// Get the current year for the copyright
$('#year').text(new Date().getFullYear());

/*********** DISPLAY CALENDAR ************/

// Calendar
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let monthAndYear = document.getElementById('monthAndYear');

showCalendar(currentMonth, currentYear);

function showCalendar(month, year) {
    let firstDay = new Date(year, month).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let tbl = document.getElementById('calendar-body');
    
    tbl.innerHTML = '';
    
    monthAndYear.innerHTML = months[month] + ' ' + year;
    
    let date = 1;
    let counter = 0;
    for(let i = 0; i < 6; i++) {
        let row = document.createElement('tr');

        for(let j = 0; j < 7; j++) {
            if(i === 0 && j < firstDay) {
                let cell = document.createElement('td');
                let cellText = document.createTextNode('');
                cell.appendChild(cellText);
                row.appendChild(cell);
                counter++;
            } else if(date > daysInMonth) {
                break;
            } else {
                let cell = document.createElement('td');
                let todayDate = today.getDate();
                let curMonth = today.getMonth();
                let curYear = today.getFullYear();
                if(todayDate === date && curMonth === currentMonth && curYear === currentYear) {
                    cell.setAttribute('class', 'bg-light day ' + daysOfWeek[counter]);
                    cell.setAttribute('style', 'cursor: pointer;');
                } else {
                    cell.setAttribute('class', 'day ' + daysOfWeek[counter]);
                    cell.setAttribute('style', 'cursor: pointer;');
                }
                let cellText = document.createTextNode(date);
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
                counter++;
                counter = (counter > 6) ? 0 : counter;
            }
        }
        tbl.appendChild(row);
    } 
    loadClassSchedule();
}

// show previous month on click
function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

// show next month on click
function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}


/*********** DISPLAY CLASS SCHEDULE ************/

var scheduleDay = document.getElementById('scheduleDay');
var scheduleInfo = document.getElementById('scheduleInfo');
var scheduleTime = document.getElementById('scheduleTime');
var scheduleClass = document.getElementById('scheduleClass');
var scheduleInstructor = document.getElementById('scheduleInstructor');
var todayDayNum = new Date().getDay();
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function loadClassSchedule() {
    // Create XHR Object
    var xhr = new XMLHttpRequest();
    // Open - type, url/file, async
    xhr.open('GET', 'schedule.json', true);
    
    xhr.onload = function() {
        if(this.status == 200) {
            var response = JSON.parse(xhr.responseText);
            
             // get index of today in schedule.json
            var todayIndex;
            response.forEach((cur, ind) => {
                if(cur.day === days[todayDayNum]){
                    todayIndex = ind;
                }
            });
            
            // add class schedule to DOM starting with today
            var scheduleTextInfo = addClassSchedule(response, todayIndex);
            scheduleInfo.innerHTML = scheduleTextInfo;
            
            // update class schedule starting from day of the week clicked in calendar
            var dayNumClicked;
            var day = document.querySelectorAll('.day');
            day.forEach(cur => {
                cur.addEventListener('click', function() {
                    var elClassName = this.className;
                    var dayClicked = elClassName.split(" ").pop();
                    var dayClickedIndex;
                    for(var i = 0; i < response.length; i++) {
                        if(response[i].day === dayClicked) {
                            dayClickedIndex = i;
                            break;
                        }
                    }
                
                    scheduleTextInfo = addClassSchedule(response, dayClickedIndex);
                    scheduleInfo.innerHTML = scheduleTextInfo;                    
                });
            });
        }
    }
    
    xhr.onerror = function() {
        console.log('Request Error');
    }
    
    // Sends request
    xhr.send();
    
}

function addClassSchedule(data, day) {

    var scheduleText = '';
    var j = day; 
    
    // loop through schedule.json and add class info to the DOM
    var checkDay = '';
    for(var i = 0; i < data.length; i++) {
        if(checkDay === data[j].day){
            checkDay = data[j].day;
            scheduleText += 
                '<div class="card">' +
                    '<div class="card-body" id="scheduleInfo">' +
                        '<div class="float-left">' +
                            '<p class="card-title" id="scheduleTime">' + data[j].time + '</p>' +
                            '<p class="card-text" id="scheduleClass">' + data[j].classType + '</p>' +
                            '<p class="card-text" id="scheduleInstructor">' + data[j].instructor + '</p>' +
                        '</div>' +
                        '<a href="#" class="btn btn-danger float-right">Sign Up</a>' +
                    '</div>' +
                '</div>';
        } else {
            checkDay = data[j].day;
            scheduleText += 
            '<div class="card mt-3">' +
                '<div class="card-header" id="scheduleDay">' + data[j].day + '</div>' +
                    '<div class="card-body" id="scheduleInfo">' +
                        '<div class="float-left">' +
                            '<p class="card-title" id="scheduleTime">' + data[j].time + '</p>' +
                            '<p class="card-text" id="scheduleClass">' + data[j].classType + '</p>' +
                            '<p class="card-text" id="scheduleInstructor">' + data[j].instructor + '</p>' +
                        '</div>' +
                        '<a href="#" class="btn btn-danger float-right">Sign Up</a>' +
                    '</div>' + 
                '</div>' +
            '</div>';
        }
        j++;
        j = (j === data.length) ? 0 : j;
    }
    return scheduleText;
}







