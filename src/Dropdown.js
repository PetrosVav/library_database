import React, { Component } from 'react';
import axios from 'axios';
import Table from "./Table.js";
import './style.css';


class Dropdown extends Component {
  constructor() {
    super();

    this.state = {
         displayMenu: false,
         choice: "Select Table",
         table: null
    };

    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
    this.changeToBooks = this.changeTable.bind(this,"Books");
    this.changeToAuthors = this.changeTable.bind(this,"Authors");
    this.resetTable = this.resetTable.bind(this);
  };

  changeTable(table) {

    axios.get('http://localhost:5000/', { params: {
      table: table
    }})
    .then( (response) => {
      //console.log(response);
      var attributeNames = response.data.map( (x) => {return x.COLUMN_NAME;} );
      //console.log(this.state.table);
      //console.log(attributeNames);
      this.setState({choice: table, table: new Table(attributeNames,table)});
      console.log(this.state.table.state.attributes);
    });
  }

  showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
    document.addEventListener('click', this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });

  }
  resetTable(){
    this.setState({table : null});
  }

  render() {
    return (
      <div>
        <div  className="dropdown" style = {{background:"red",width:"200px"}} >
         <div className="button" onClick={this.showDropdownMenu}>
          {this.state.displayMenu ? "" : this.state.choice}
      </div>

          { this.state.displayMenu ? (
          <ul>
         <li onClick={(e) => {e.preventDefault(); this.changeToBooks()}}>Books</li>
         <li onClick={(e) => {e.preventDefault(); this.changeToAuthors()}}>Authors</li>
         </ul>
        ):
        (
          null
        )
        }
       </div>

          {this.state.displayMenu ? (
            console.log("Half_End"),
            (this.state.table!=null) ? (this.resetTable()):(null) ,
            null
          ):
          (
            console.log("End"),
            this.state.table!=null && <Table atr={this.state.table.state.attributes} name={this.state.choice}/>
          )
          }

      </div>
    );
  }
}

export default Dropdown;
//this.state.table!=null && this.setState({table: null}),
