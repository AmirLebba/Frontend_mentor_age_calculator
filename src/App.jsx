import { useState } from "react";
import './index.css'

const App = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [age, setAge] = useState({ years: "--", months: "--", days: "--" });
  const [errorMessages, setErrorMessages] = useState({
    day: "",
    month: "",
    year: "",
    validDate: "",
  });
  function clearInputValue(e) {
    const { name } = e.target;
    switch (name) {
      case "day":
        setDay("");
        break;
      case "month":
        setMonth("");
        break;
      case "year":
        setYear("");
        break;
      default:
        break;
    }
  }

  function inputChange(e) {
    const { name, value } = e.target;
    switch (name) {
      case "day":
        setDay(value);
        break;
      case "month":
        setMonth(value);
        break;
      case "year":
        setYear(value);
        break;
      default:
        break;
    }

    // Clear error messages when the user starts typing
    setErrorMessages((prevErrors) => ({ ...prevErrors, [name]: "" }));
  }

  function validateInputs() {
    let isValid = true;
    const errors = { day: "", month: "", year: "", validDate: "" };

    // Check if inputs are empty
    if (!day) {
      errors.day = "This field is required";
      isValid = false;
    } else if (isNaN(day) || day < 1 || day > 31) {
      errors.day = "Invalid day";
      isValid = false;
    }

    if (!month) {
      errors.month = "This field is required";
      isValid = false;
    } else if (isNaN(month) || month < 1 || month > 12) {
      errors.month = "Invalid month";
      isValid = false;
    }

    if (!year) {
      errors.year = "This field is required";
      isValid = false;
    } else if (isNaN(year) || year.length !== 4) {
      errors.year = "Invalid year";
      isValid = false;
    }

    // Check if the date is in the past
    const currentDate = new Date();
    const selectedDate = new Date(`${year}-${month}-${day}`);

    if (selectedDate > currentDate) {
      errors.validDate = "Must be a date in the past";
      isValid = false;
    }

    setErrorMessages(errors);
    return isValid;
  }

  function calcAge() {
    if (!validateInputs()) {
      // Inputs are not valid, do not proceed with calculations
      return;
    }

    const today = new Date();
    const birthDate = new Date(`${year}-${month}-${day}`);

    const ageInMilliseconds = today - birthDate;
    const ageDate = new Date(ageInMilliseconds);

    setAge({
      years: ageDate.getUTCFullYear() - 1970,
      months: ageDate.getUTCMonth(),
      days: ageDate.getUTCDate() - 1,
    });
  }

  return (
    <div className="container">
      <div className="header">
        <div className="input">
          <p>DAY</p>
          <input
            maxLength={2}
            name="day"
            value={day}
            onChange={(e) => inputChange(e)}
            placeholder="DD"
            required
            onFocus={(e) => clearInputValue(e)}
          />
          <p className="error-message">
            {errorMessages.day && !errorMessages.validDate && errorMessages.day}
            {errorMessages.validDate &&
              !errorMessages.day &&
              errorMessages.validDate}
          </p>
        </div>
        <div className="input">
          <p>MONTH</p>
          <input
            maxLength={2}
            name="month"
            value={month}
            onChange={(e) => inputChange(e)}
            placeholder="MM"
            required
            onFocus={(e) => clearInputValue(e)}
          />
          <p className="error-message">{errorMessages.month}</p>
        </div>
        <div className="input">
          <p>YEAR</p>
          <input
            maxLength={4}
            name="year"
            value={year}
            onChange={(e) => inputChange(e)}
            placeholder="YYYY"
            required
            onFocus={(e) => clearInputValue(e)}
          />
          <p className="error-message">{errorMessages.year}</p>
        </div>
      </div>
      <div className="line">
        <div id="line"></div>
        <button onClick={calcAge}>
          <svg
            className="icon"
            xmlns="http://www.w3.org/2000/svg"
            width="46"
            height="44"
            viewBox="0 0 46 44"
          >
            <g fill="none" stroke="#FFF" strokeWidth="2">
              <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" />
            </g>
          </svg>
        </button>
      </div>
      <div className="result">
        <h1>
          <span>{age.years}</span> years
        </h1>
        <h1>
          <span>{age.months}</span> months
        </h1>
        <h1>
          <span>{age.days}</span> days
        </h1>
      </div>
    </div>
  );
};

export default App;
