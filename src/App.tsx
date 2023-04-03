import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {
    /*  const topCars = [
          {manufacturer:'BMW', model:'m5cs'},
          {manufacturer:'Mercedes', model:'e63s'},
          {manufacturer:'Audi', model:'rs6'}
      ];*/
    const track1 ="fgjgsvsdh jnhjn,mnc";
    const track2 ="fgjgsvsvvvb   g ggg jnhjn,mnc";

    const tasks1 = [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ]
    const tasks2 = [
        { id: 1, title: "Hello world", isDone: true },
        { id: 2, title: "I am Happy", isDone: false },
        { id: 3, title: "Yo", isDone: false }
    ]
    return (<div>
            <Todolist track1={track1} track2={"ddddd"} tasks={tasks1} />
            {/*  <Todolist track1={track2} tasks={tasks2} />*/}
        </div>
    );
}

export default App;
