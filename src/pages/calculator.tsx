import React, { ChangeEvent, useState } from "react";
import Input from "../components/ui/input";
import { BsArrowDown } from "react-icons/bs";
import Error from "../components/ui/error";

function Calculator() {
  const [inputDay, setInputDay] = useState("");
  const [inputMonth, setInputMonth] = useState("");
  const [inputYear, setInputYear] = useState("");
  const [dayError, setDayError] = useState("");
  const [monthError, setMonthError] = useState("");
  const [yearError, setYearError] = useState("");
  const [dayResult, setDayResult] = useState("");
  const [monthResult, setMonthResult] = useState("");
  const [yearResult, setYearResult] = useState("");
  const [inputDayError, setInputDayError] = useState<boolean>(false);
  const [inputMonthError, setInputMonthError] = useState<boolean>(false);
  const [inputYearError, setInputYearError] = useState<boolean>(false);

  function isValidDate(day: number, month: number, year: number) {
    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() === year &&
      date.getMonth() + 1 === month &&
      date.getDate() === day
    );
  }

  function handleInputDay(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    const wordRegex = /^[a-zA-Z]+$/;
    const inputAsNumber = Number(input);
    const monthAsNumber = Number(inputMonth);
    const yearAsNumber = Number(inputYear);

    if (wordRegex.test(input)) {
      setDayError("Day must be a number");
      setInputDay("");
      setInputDayError(true);
      return false;
    } else if (input === "") {
      setInputDay("");
      setDayError("Day cannot be empty");
      setInputDayError(true);
      return false;
    } else if (inputAsNumber < 1 || inputAsNumber > 31) {
      setDayError("Day must be between 1 and 31");
      setInputDayError(true);
      return false;
    } else if (
      inputAsNumber &&
      monthAsNumber &&
      yearAsNumber &&
      !isValidDate(inputAsNumber, monthAsNumber, yearAsNumber)
    ) {
      setDayError(`Invalid date for month ${inputMonth}`);
      setInputDayError(true);
      return false;
    } else {
      setDayError("");
      setInputDay(e.target.value);
      setInputDayError(false);
      return true;
    }
  }

  function handleInputMonth(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    const wordRegex = /^[a-zA-Z]+$/;
    const inputAsNumber = Number(input);
    const dayAsNumber = Number(inputDay);
    const yearAsNumber = Number(inputYear);

    if (wordRegex.test(input)) {
      setMonthError("Month must be a number");
      setInputMonth("");
      setInputMonthError(true);
      return false;
    } else if (input === "") {
      setInputMonth("");
      setMonthError("Month cannot be empty");
      setInputMonthError(true);
      return false;
    } else if (inputAsNumber < 1 || inputAsNumber > 12) {
      setMonthError("Month must be between 1 and 12");
      setInputMonthError(true);
      return false;
    } else if (
      dayAsNumber &&
      inputAsNumber &&
      yearAsNumber &&
      !isValidDate(dayAsNumber, inputAsNumber, yearAsNumber)
    ) {
      setMonthError(`Invalid date for day ${inputDay}`);
      setInputMonthError(true);
      return false;
    } else {
      setMonthError("");
      setInputMonth(e.target.value);
      setInputMonthError(false);
      return true;
    }
  }

  function handleInputYear(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    const wordRegex = /^[a-zA-Z]+$/;
    const inputAsNumber = Number(e.target.value);
    const currentYear = new Date().getFullYear();
    const dayAsNumber = Number(inputDay);
    const monthAsNumber = Number(inputMonth);

    if (wordRegex.test(input)) {
      setYearError("Year must be a number");
      setInputYear("");
      setInputYearError(true);
      return false;
    } else if (input === "") {
      setInputYear("");
      setYearError("Year cannot be empty");
      setInputYearError(true);
      return false;
    } else if (inputAsNumber > currentYear) {
      setYearError(`Year must be under ${currentYear}`);
      setInputMonthError(true);
      return false;
    } else if (input.length < 4) {
      setInputYear(input);
      setYearError("Year must have 4 numbers");
      setInputYearError(true);
      return false;
    } else if (
      dayAsNumber &&
      monthAsNumber &&
      inputAsNumber &&
      !isValidDate(dayAsNumber, monthAsNumber, inputAsNumber)
    ) {
      setYearError(`Invalid date for day ${inputDay} and month ${inputMonth}`);
      setInputYearError(true);
      return false;
    } else {
      setYearError("");
      setInputYear(e.target.value);
      setInputYearError(false);
      return true;
    }
  }

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    const dayAsNumber = Number(inputDay);
    const monthAsNumber = Number(inputMonth);
    const yearAsNumber = Number(inputYear);

    const isDayValid = handleInputDay({
      target: { value: inputDay },
    } as ChangeEvent<HTMLInputElement>);
    const isMonthValid = handleInputMonth({
      target: { value: inputMonth },
    } as ChangeEvent<HTMLInputElement>);
    const isYearValid = handleInputYear({
      target: { value: inputYear },
    } as ChangeEvent<HTMLInputElement>);

    if (isDayValid && isMonthValid && isYearValid) {
      let yearDiff = currentYear - yearAsNumber;
      let monthDiff = currentMonth - monthAsNumber;
      let dayDiff = currentDay - dayAsNumber;

      if (dayDiff < 0) {
        monthDiff -= 1;
        dayDiff += new Date(currentYear, currentMonth - 1, 0).getDate();
      }
      if (monthDiff < 0) {
        yearDiff -= 1;
        monthDiff += 12;
      }

      setDayResult(dayDiff.toString());
      setMonthResult(monthDiff.toString());
      setYearResult(yearDiff.toString());
    }
  }

  return (
    <section className="flex min-h-[100dvh] flex-col items-center justify-center bg-neutral-off-white">
      <div className="flex w-full max-w-sm flex-col space-y-10 rounded-3xl rounded-br-[200px] bg-neutral-white px-6 py-10 shadow-lg md:max-w-xl md:p-12">
        <span className="flex flex-row space-x-4">
          <label>
            <h3 className="font-bold text-neutral-smokey-grey">DAY</h3>
            <Input
              maxLength={2}
              className={inputDayError ? "ring-red-600 focus:ring-red-600" : ""}
              placeholder="DD"
              value={inputDay}
              onChange={handleInputDay}
            />
          </label>
          <label>
            <h3 className="font-bold text-neutral-smokey-grey">MONTH</h3>
            <Input
              maxLength={2}
              value={inputMonth}
              className={
                inputMonthError ? "ring-red-600 focus:ring-red-600" : ""
              }
              placeholder="MM"
              onChange={handleInputMonth}
            />
          </label>
          <label>
            <h3 className="font-bold text-neutral-smokey-grey">YEAR</h3>
            <Input
              maxLength={4}
              value={inputYear}
              className={
                inputYearError ? "ring-red-600 focus:ring-red-600" : ""
              }
              placeholder="YYYY"
              onChange={handleInputYear}
            />
          </label>
        </span>

        <section>
          {dayError && (
            <span>
              <Error>{dayError}</Error>
            </span>
          )}
          {monthError && (
            <span>
              <Error>{monthError}</Error>
            </span>
          )}
          {yearError && (
            <span>
              <Error>{yearError}</Error>
            </span>
          )}
        </section>

        <span className="flex items-end justify-center md:justify-end">
          <button
            className="absolute flex translate-y-8 rounded-full bg-primary-purple p-4 text-neutral-white shadow-xl transition-all hover:bg-slate-950 md:justify-end"
            onClick={handleSubmit}
          >
            <BsArrowDown className="size-10" />
          </button>
          <hr className="hidden h-px w-full bg-neutral-smokey-grey md:block" />
        </span>
        <span className="flex flex-col space-y-4 text-left text-6xl font-bold italic md:text-7xl">
          <div className="flex flex-row gap-2">
            <h2 className="text-primary-purple">
              {yearResult ? `${yearResult}` : "--"}
            </h2>
            <h2>years</h2>
          </div>
          <div className="flex flex-row gap-2">
            <h2 className="text-primary-purple">
              {monthResult ? `${monthResult}` : "--"}
            </h2>
            <h2>months</h2>
          </div>
          <div className="flex flex-row gap-2">
            <h2 className="text-primary-purple">
              {dayResult ? `${dayResult}` : "--"}
            </h2>
            <h2>days</h2>
          </div>
        </span>
      </div>
    </section>
  );
}

export default Calculator;
