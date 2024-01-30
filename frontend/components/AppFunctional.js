import React, {useState} from 'react'
import axios from 'axios'


const URL = 'http://localhost:9000/api/result';

// Suggested initial states
const initialMessage = ""
const initialEmail = ""
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
    return `Coordinates (${x}, ${y})`;
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

    // calculating the next index once the B has moved
    switch (direction) {
      case 'up':
        if (index < 3) {
          setMessage("You can't go up");
          return index;
        } else {
          setMessage('');
          return index - 3;
        }
      case 'down':
        if (index > 5) {
          setMessage("You can't go down");
          return index;
        } else {
          setMessage('');
          return index + 3;
        }
      case 'left':
        if (index % 3 === 0) {
          setMessage("You can't go left");
          return index;
        } else {
          setMessage('');
          return index - 1;
        }
      case 'right':
        if (index % 3 === 2) {
          setMessage("You can't go right");
          return index;
        } else {
          setMessage('');
          return index + 1;
        }
      default:
        setMessage('');
        return index; // If invalid direction, return current index
    }

  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B", and change any states accordingly.

    // Get the direction from the id of the clicked button (JSX)
    const direction = evt.target.id;

    // calculate the next index
    const newIndex = getNextIndex(direction);

    // Check if the newIndex is different from the current index. 
    // If newIndex is not equal to index, it means a valid move was made (i.e., "B" didn't try to move off the grid).
    if (newIndex !== index) {
      setIndex(newIndex);
      setSteps(prevSteps => prevSteps + 1);
    }

    // updates the coordinates message
    getXYMessage();
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    const {value} = evt.target
    setEmail(value);
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();

    const { x, y } = getXY();
    const payload = {x, y, steps, email}
    axios.post(URL, payload)
    .then(res => {
      console.log(res.data.message)
      setMessage(res.data.message);
      setEmail("")
    })
    .catch(err => {
      setMessage(err.response.data.message);
    })

  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">You moved {steps} {steps === 1 ? 'time' : 'times'}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>LEFT</button>
        <button id="up" onClick={move}>UP</button>
        <button id="right" onClick={move}>RIGHT</button>
        <button id="down" onClick={move}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} id="email" type="email" placeholder="type email" value={email}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
