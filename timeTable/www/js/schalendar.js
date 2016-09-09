var calendarStartDate = getStartDate();
var calendarEndDate = new Date(calendarStartDate.getFullYear()+1,calendarStartDate.getMonth(),calendarStartDate.getDate());
var millisecondsInDay = (24 * 60 * 60 * 1000);
var schalendar = [];

init(calendarStartDate, calendarEndDate);
getSaturdays(calendarStartDate, calendarEndDate);
getSundays(calendarStartDate, calendarEndDate);
getHolidays(calendarStartDate, calendarEndDate);
markDayNames();

console.log(schalendar);
//function to get academic start dateStart
function getStartDate(){
  var today = new Date();
  var startMonth = 4;
  var startDate = 1;

  if(today < new Date(today.getFullYear(), startMonth, startDate)){
    return new Date(today.getFullYear()-1, startMonth, startDate);
  }
  else{
    return new Date(today.getFullYear(), startMonth, startDate);
  }
}

//fucntion to print all sundays
function init(calendarStartDate, calendarEndDate){
  var totdays = (Number(calendarEndDate) - Number(calendarStartDate))/millisecondsInDay;
  for(var i=0; i<totdays; i++){
    schalendar[i] = {
      daynum: i,
      skip: false,
      date: new Date(Number(calendarStartDate)+i*millisecondsInDay),
      remark: 'init'
    };
  }
}

//fucntion to print all sundays
function getSundays(calendarStartDate, calendarEndDate){
  var weekdayStart = calendarStartDate.getDay();

  //if the first day itself is Sunday, manage to get sunday offset as zero
  if(weekdayStart == 0){
    weekdayStart = 7;
  }

  var sundayOffset = 7 - weekdayStart;
  var sunday = Number(calendarStartDate) + millisecondsInDay *sundayOffset;

  while(true){
    schalendar[sundayOffset].skip = true;
    schalendar[sundayOffset].remark = 'Sunday Holiday';

    sunday = sunday + millisecondsInDay * 7;
    sundayOffset += 7;
    if(sunday > calendarEndDate){
      break;
    }
  }
}

//function to get 2nd and 4th Saturdays of each month
function getSaturdays(calendarStartDate, calendarEndDate){
  //for each month
  for(i=0; i<12; i++){
    var monthStartDate = (new Date(calendarStartDate.getFullYear(), calendarStartDate.getMonth()+i, 1));
    var weekdayStart = monthStartDate.getDay();
    var offsetForFirstSat = 6 - weekdayStart;
    var satFirst = Number(monthStartDate) + millisecondsInDay *offsetForFirstSat;
    var saturdayOffset = ((satFirst-Number(calendarStartDate))/millisecondsInDay)+7; //this is second saturday of the month

    schalendar[saturdayOffset].skip = true;
    schalendar[saturdayOffset].remark = '2nd Saturday';

    saturdayOffset += 14; //this is fourth saturday of the month
    schalendar[saturdayOffset].skip = true;
    schalendar[saturdayOffset].remark = '4th Saturday';
  }
}

function getHolidays(calendarStartDate, calendarEndDate){
  //form array of holidays
  var holidays = ['2016-09-05','2016-09-14','2016-09-28'];
  for(var i=0; i<holidays.length; i++){
    var holDate = new Date(holidays[i].substring(0,4),holidays[i].substring(5,7)-1,holidays[i].substring(8,10));
    var holOffset = (Number(holDate)-Number(calendarStartDate))/millisecondsInDay;
    schalendar[holOffset].skip = true;
    schalendar[holOffset].remark = 'holiday';
  }
}

function markDayNames(){
  var totdays = (Number(calendarEndDate) - Number(calendarStartDate))/millisecondsInDay;
  var dayNum = -1;
  for(var i=0; i<totdays; i++){
    schalendar[i].skip ? (dayNum += 0) : (dayNum += 1);
    schalendar[i].day = dayNum%6+1;
  }
}
