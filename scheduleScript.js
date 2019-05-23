/*****************************/
/******* SCHEDULE PAGE *******/
/*****************************/

// Get the current year for the copyright
$('#year').text(new Date().getFullYear());


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
                    cell.setAttribute('class', 'bg-light ' + daysOfWeek[counter]);
                } else {
                    cell.setAttribute('class', daysOfWeek[counter]);
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

var scheduleDay = document.getElementById('scheduleDay');
var scheduleInfo = document.getElementById('scheduleInfo');
var scheduleTime = document.getElementById('scheduleTime');
var scheduleClass = document.getElementById('scheduleClass');
var scheduleInstructor = document.getElementById('scheduleInstructor');

/*function getJSONData() {
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(xhttp.responseText);
            console.log(response);
            /*var wednesday = response.Wednesday;
            console.log(wednesday);
            var str = '';
            wednesday.forEach(cur => {
                str += '<p>' + cur.time + '</p>';
            });       

            scheduleTime.innerHTML = str;
            console.log(str);
        } else {
            console.log('readystate is ' + this.readyState);
            console.log('status is ' + this.status);
            console.log('nope');
        }
    };
    xhttp.open("GET", "schedule.json", true);
    xhttp.send();
    return response;
}*/

function loadText() {
    // Create XHE Object
    var xhr = new XMLHttpRequest();
    // Open - type, url/file, async
    xhr.open('GET', 'schedule.json', true);
    
    xhr.onload = function() {
        if(this.status == 200) {
            var response = JSON.parse(xhr.responseText);
            console.log(response);
            var scheduleText = '';
            for(var i in response) {
                console.log(response[i].time);
                
                    scheduleText += 
                        '<div class="card mb-3">' +
                            '<div class="card-header" id="scheduleDay">' + response[i].day + '</div>' +
                                '<div class="card-body" id="scheduleInfo">' +
                                    '<div class="float-left">' +
                                        '<p class="card-title" id="scheduleTime">' + response[i].time + '</p>' +
                                        '<p class="card-text" id="scheduleClass">' + response[i].classType + '</p>' +
                                        '<p class="card-text" id="scheduleInstructor">' + response[i].instructor + '</p>' +
                                    '</div>' +
                                    '<a href="#" class="btn btn-danger float-right">Sign Up</a>' +
                                '</div>' + 
                            '</div>' +
                        '</div>';
                    
                
            }
            scheduleInfo.innerHTML = scheduleText;
            }
            
    }
    
    xhr.onerror = function() {
        console.log('Request Error');
    }
    
    // Sends request
    xhr.send();
}

loadText();

function setSchedule() {
    let today = new Date().getDay();
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    scheduleDay.innerHTML = days[today];
}
setSchedule();


window.onclick = function(e) {
    console.log(e);
    scheduleDay.innerHTML = e.srcElement.className;
}







