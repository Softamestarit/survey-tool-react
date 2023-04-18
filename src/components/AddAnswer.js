import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";



export default function AddAnswer(props){

    const [answer, setAnswer] = useState({
        text:"",
    });

    const handleInputChange = (e) => {
        setAnswer({...answer, [e.target.name]: e.target.value})
      };
    
      const addAnswer = () => {
        props.saveAnswer(answer);
      }

      return(
        <div>
            <TextField
            autoFocus
            margin="dense"
            name="text"
            value={answer.text}
            onChange={(e) => handleInputChange(e)}
            label="Answer"
            fullWidth
            variant="standard"
          />
          <Button onClick={addAnswer}>Save</Button>
        </div>
      )
}