import React, { Component } from 'react';
import axios from 'axios';
import Table from "./Table.js";
import './style.css';

class Dropdown extends Component {
  constructor() {
    super();

    //Initially there is no table
    this.state = {
         displayMenu: false,
         choice: "Select",
         table: null
    };

    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
    this.changeToBooks = this.changeTable.bind(this,"Books");
    this.changeToAuthors = this.changeTable.bind(this,"Authors");
    this.changeToCategories = this.changeTable.bind(this,"Categories");
    this.resetTable = this.resetTable.bind(this);
  };

  //Change displayed table
  //cat is the name of the table
  changeTable(cat) {
	  //Depending on the table set the create a dictionary
	  //with the names of the columns on the daatabase as the keys
	  //and the names to be diasplayed as the values
	  var attributeNames;
	  switch (cat) {
		case("Books"):
		  attributeNames = {
			ISBN:"ISBN",
			title:"Title",
			pubYear:"Publication Year",
			numpages:"Number of Pages",
			pubName:"Publisher"
		  };
		  break;
		case("Authors"):
		  attributeNames = {
			AFirst:"First Name",
			ALast:"Last Name",
			ABirthdate:"Birthdate"
		  };
		  break;
		case("Categories"):
		  attributeNames = {
			 categoryName: "Category",
			 supercategory: "SupercategoryName"
		  }
	  }

	  this.setState({choice: cat, table: attributeNames});
  }

  showDropdownMenu(event) {
    event.preventDefault();
    this.setState({choice: "Select", table: null, displayMenu: true }, () => {
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
        <div className="dropdown">
          <div className="button" onClick={this.showDropdownMenu}>
            {this.state.displayMenu ? "Select Table" : this.state.choice}
          </div>
          { this.state.displayMenu ? (
            <ul>
              <li onClick={(e) => {e.preventDefault(); this.changeToBooks()}}>Books</li>
              <li onClick={(e) => {e.preventDefault(); this.changeToAuthors()}}>Authors</li>
              <li onClick={(e) => {e.preventDefault(); this.changeToCategories()}}>Categories</li>
            </ul>
          ):
          (
          null
          )
          }
        </div>
        { this.state.table ?
        (
          <Table atr={this.state.table} name={this.state.choice}/>
        ):
        (
          null
        )
        }
      </div>
    );
  }
}

export default Dropdown;
