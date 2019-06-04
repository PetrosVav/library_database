import React from 'react';
import ReactDOM from 'react-dom';
import Dropdown from './Dropdown';
//import {Root} from "./Root"
//import { BrowserRouter as Router, Route, Link, IndexRoute } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import "./index.css"

var displayDropdown = (
  <div className="container" style={{display: 'flex', justifyContent: 'center'}} >
    <Dropdown />
  </div>
      );

ReactDOM.render(displayDropdown, document.getElementById('root'));

serviceWorker.unregister();
