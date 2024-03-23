const ageCalculate = () => {   //calculate age

  const today = new Date(); //get current date
  const inputDate = new Date(document.getElementById("date-input").value); //input the date

  const birthDetails = {
    date: inputDate.getDate(), //get date
    month: inputDate.getMonth() + 1,   //get month
    year: inputDate.getFullYear(),  //get year
  };

  const currentYear = today.getFullYear();   //get current year
  const currentMonth = today.getMonth() + 1;  //get current month
  const currentDate = today.getDate();   //get current date

//check input date is future date
  if (isFutureDate(birthDetails, currentYear, currentMonth, currentDate)) {
    alert("Not Born.");
    displayResult("-", "-", "-");
    return;
  }

//calculation part
  const { years, months, days } = calculateAge(
    birthDetails,
    currentYear,
    currentMonth,
    currentDate
  );

  displayResult(days, months, years);
};


const isFutureDate = (birthDetails, currentYear, currentMonth, currentDate) => {
  return (
    birthDetails.year > currentYear ||
    (birthDetails.year === currentYear &&
      (birthDetails.month > currentMonth ||
        (birthDetails.month === currentMonth &&
          birthDetails.date > currentDate)))
  );
};

const calculateAge = (birthDetails, currentYear, currentMonth, currentDate) => {
  let years = currentYear - birthDetails.year;
  let months, days;

  if (currentMonth < birthDetails.month) {
    years--;
    months = 12 - (birthDetails.month - currentMonth);
  } else {
    months = currentMonth - birthDetails.month;
  }

  if (currentDate < birthDetails.date) {
    months--;
    const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const daysInLastMonth = getDaysInMonth(lastMonth, currentYear);
    days = daysInLastMonth - (birthDetails.date - currentDate);
  } else {
    days = currentDate - birthDetails.date;
  }
  return { years, months, days };
};

const getDaysInMonth = (month, year) => {
  const isLeapYear = year % 4 === 0 && (year % 100 != 0 || year % 400 === 0);
  const getDaysInMonth = [
    31,
    isLeapYear ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  return getDaysInMonth[month - 1];
};

const displayResult = (bdate, bMonth, bYear) => {
  document.getElementById("years").textContent = bYear;
  document.getElementById("months").textContent = bMonth;
  document.getElementById("days").textContent = bdate;
};

document.getElementById("calc-age-btn").addEventListener("click", ageCalculate); //add event listener