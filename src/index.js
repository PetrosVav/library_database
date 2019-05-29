import React from 'react';
import ReactDOM from 'react-dom';
import Dropdown from './Dropdown';
import * as serviceWorker from './serviceWorker';
import "./index.css"

var displayDropdown = (
      <div style={{display: 'flex', justifyContent: 'center'}} >
        <Dropdown />
      </div>
      );

ReactDOM.render(displayDropdown, document.getElementById('root'));

serviceWorker.unregister();
