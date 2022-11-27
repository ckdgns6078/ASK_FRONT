import React, { useState } from "react";
import "../calculator/Calculator.css";

let sign = "";
let calculate = "";
const Calculator = () => {
  const number_buttons = [
    "7",
    "8",
    "9",
    "%",
    "4",
    "5",
    "6",
    "x",
    "1",
    "2",
    "3",
    "-",
    "0",
    "+",
    ".",

  ];
  const [result, setResult] = useState("");

  const onClick = (e) => {
    calculate += number_buttons[e.target.value];
    if (isNaN(parseInt(number_buttons[e.target.value]))) {
      if (number_buttons[e.target.value] === "+") {
        sign = "+";
        setResult("");
      } else if (number_buttons[e.target.value] === "-") {
        sign = "-";
        setResult("");
      } else if (number_buttons[e.target.value] === "%") {
        sign = "/";
        setResult("");
      } else if (number_buttons[e.target.value] === "x") {
        sign = "*";
        setResult("");
      } else {
        let num = "";
        let num_array = [];
        let sign_array = [];
        for (let i = 0; i < calculate.length; i++) {
          if (!isNaN(calculate[i])) {
            num += calculate[i];
          } else {
            sign_array.push(calculate[i]);
            num_array.push(parseInt(num));
            num = "";
          }
        }
        num = num_array[0];
        for (let i = 0; i < sign_array.length - 1; i++) {
          if (sign_array[i] === "+") {
            num += num_array[i + 1];
          } else if (sign_array[i] === "-") {
            num -= num_array[i + 1];
          } else if (sign_array[i] === "%") {
            num /= num_array[i + 1];
          } else if (sign_array[i] === "x") {
            num *= num_array[i + 1];
          }
        }

        setResult(num);
      }
    } else {
      setResult(result + number_buttons[e.target.value]);
    }
    console.log(`sign: ${sign}`);
    console.log(calculate);
  };

  const buttons = number_buttons.map((btn, index) => (
    <li key={btn} value={index} onClick={onClick}>
      {btn}
    </li>
  ));

  return (
    <div className="container" style={{position:'relative'}}>
      <div className="calcu_container" style={{position:'absolute' ,left:'370px'}}>

          <div>
            <button className="addButton">
              시급
            </button>
            <button className="addButton">
              일급
            </button>
          </div>
        <div className="calcu_result" style={{position:'absolute' , right:'350px'}}>
          <p>{result}</p>
        </div>

        <div className="numbers_input">
          <ul>{buttons}</ul>
        </div>
      </div>
    </div>
  );
};

export default Calculator;