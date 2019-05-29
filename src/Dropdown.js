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

  };

  changeTable(table) {
    axios.get('http://localhost:5000/', { params: {
      table: table
    }})
    .then( (response) => {
      var attributeNames = response.data.map( (x) => {return x.COLUMN_NAME;} );
      //console.log(attributeNames);
      this.setState({choice: table, table: new Table(attributeNames)});
      console.log(this.table);
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

  render() {
    return (
      <div>
        <div  className="dropdown" style = {{background:"red",width:"200px"}} >
         <div className="button" onClick={this.showDropdownMenu}> {this.state.displayMenu ? "" : this.state.choice} </div>

          { this.state.displayMenu ? (
          <ul>
         <li onClick={(e) => {e.preventDefault(); this.changeTable("Books")}}>Books</li>
         <li onClick={(e) => {e.preventDefault(); this.changeTable("Authors")}}>Authors</li>
         </ul>
        ):
        (
          null
        )
        }
       </div>

       <Table> {this.state.table} </Table>
      </div>
    );
  }
}

export default Dropdown;
