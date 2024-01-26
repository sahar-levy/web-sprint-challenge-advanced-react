import React, {useState} from 'react'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [steps, setSteps] = useState(initialSteps);
  const [index, setIndex] = useState(initialIndex);


  function getXY(index) {
    // The getXY helper function is suggested but not necessary. It's designed to calculate the coordinates based on the current index.
    // The idea is to derive the X and Y coordinates from the index where "B" is located.

    // The calculation uses modulo (%) to wrap around the X coordinate when it reaches the grid width (creating 3x3), and division by the grid width (3) to get the Y coordinate.
    // Note: The +1 is added to both x and y to convert the 0-based index to a 1-based coordinate system.
    let x = index % 3 + 1;
    let y = Math.floor(index / 3) + 1;

    return { x, y };


    // Instead of explicitly writing return { x: x, y: y };, you can use the shorthand syntax { x, y }.

    //  x  y
    // (1, 1) (2, 1) (3, 1)     0, 1, 2,
    // (1, 2) (2, 2) (3, 2)     3, 4, 5,
    // (1, 3) (2, 3) (3, 3)     6, 7, 8
    
    // idx --> coordinate 

    // % operand --> odd numbers have a remainder of 1

    /*
      [0] --> (1,1) --> x % 3 + 1 = 1   y / 3 + 1 = 1
      [1] --> (2,1) --> x % 3 + 1 = 2   y / 3 = 2 
      [2] --> (3,1) --> x % 3 + 1 = 3   y % 3 = 
      [3] --> (1,2) --> x % 3 + 1 = 4   y % 3 = 
      [4] --> (2,2) --> x % 3 + 1 = 5   y % 3 = 
      [5] --> (3,2) --> x % 3 + 1 = 6   y % 3 = 
      [6] --> (1,3) --> x % 3 + 1 = 7   y % 3 = 
      [7] --> (2,3) --> x % 3 + 1 = 8   y % 3 = 
      [8] --> (3,3) --> x % 3 + 1 = 9   y % 3 = 
    */

    // PATTERN --> index coordinates to x which needs to be increased by 1 starting from first idx [0] + 1 = 1 

  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    useState(initialMessage);
    useState(initialEmail);
    useState(initialSteps);
    useState(initialIndex);
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates (2, 2)</h3>
        <h3 id="steps">You moved 0 times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === 4 ? ' active' : ''}`}>
              {idx === 4 ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message"></h3>
      </div>
      <div id="keypad">
        <button id="left">LEFT</button>
        <button id="up">UP</button>
        <button id="right">RIGHT</button>
        <button id="down">DOWN</button>
        <button id="reset">reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
