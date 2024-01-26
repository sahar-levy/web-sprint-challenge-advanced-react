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


  function getXY() {
    // The getXY helper function is suggested but not necessary. It's designed to calculate the coordinates based on the current index.
    // The idea is to derive the X and Y coordinates from the index where "B" is located.

    // The calculation uses modulo (%) to wrap around the X coordinate when it reaches the grid width (creating 3x3), and division by the grid width (3) to get the Y coordinate.
    // Note: The +1 is added to both x and y to convert the 0-based index to a 1-based coordinate system.
    
    const x = index % 3 + 1;
    const y = Math.floor(index / 3) + 1;

    return { x, y };
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const { x, y } = getXY();
    setMessage(`Coordinates (${x}, ${y})`);
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setMessage(initialMessage);
    setEmail(initialEmail);
    setSteps(initialSteps);
    setIndex(initialIndex);
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.

    // moving 'up' ot 'down' changes the row, so add or subtract 3 bc it is a 3x3 grid
    // moving L or R changes the column, so add or subtract 1
    // check if index is valid: must be within 0-8 range inclusive (note: moving 'right' from the rightmost column should not place the 'B' in the leftmost column of the next row)

    // declare a new index variable to store the potential next position of the 'B' character on the grid, based on the direction given.
    let newIndex;

    // calculating the next index once the B has moved
    switch (direction) {
      case 'up':
        newIndex = index + 3;
        break;
      case 'down':
        newIndex = index + 3;
        break;
      case 'left':
        newIndex = index - 1;
        break;
      case 'right':
        newIndex = index + 1;
        break;
      default:
        return index; // If invalid direction, return current index
    }

    // check that the new index is valid (range 0-8 inclusive)
    // performed after the switch statment bc it relies on the value of newIndex
    if (newIndex > 0 || newIndex < 8){
      return index;
    }

    // Check for edge cases (moving from one edge to another)
    if ((index === 2 && direction === 'right') || (index === 3 && direction === 'left') || (index === 5 && direction === 'right') || (index === 6 && direction === 'left')) {
      return index; // If moving from one edge to another, return current index
    }

    return newIndex; // Otherwise, return new index

  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.

    // Get the direction from the id of the clicked button (JSX)
    const direction = evt.target.id;

    // calculate the next index
    const newIndex = getNextindex(direction);
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
        <h3 id="coordinates">Coordinate (2,2)</h3>
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
