import React, { Component } from 'react';
import Table from "./Table.js";
import './style.css';

class Dropdown extends Component {
  constructor() {
    super();

    //Initially there is no table
    this.state = {
         displayMenu: false,
         choice: "Select",
         table: null,
         tableName: null,
         tabletype: null,
         editableTable: false
    };

    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
    //Tables
    this.changeToBooks = this.changeTable.bind(this,"Books");
    this.changeToAuthors = this.changeTable.bind(this,"Authors");
    this.changeToCategories = this.changeTable.bind(this,"Categories");
    //Views
    this.changeToCategoryNames = this.changeTable.bind(this,"Category_Names");
    this.changeToCopyNr = this.changeTable.bind(this, "CopyNr");
    //Queries
    this.changeToPublishings = this.changeTable.bind(this, "Publishings");
    this.changeToBorrowings = this.changeTable.bind(this, "Borrowings");
    this.changeToMoreThanThreeReminders = this.changeTable.bind(this, "MoreThanThreeReminders");
    this.changeToWellPaidEmployees = this.changeTable.bind(this, "WellPaidEmployees");
    this.changeToStephenKingBooks = this.changeTable.bind(this, "StephenKingBooks");
    this.changeToMostPopularCategories = this.changeTable.bind(this, "MostPopularCategories");
    this.changeToCategoryCounts = this.changeTable.bind(this, "CategoryCounts");

    this.resetTable = this.resetTable.bind(this);
  };

  //Change displayed table
  //cat is the name of the table
  changeTable(cat) {
	  //Depending on the table set the create a dictionary
	  //with the names of the columns on the daatabase as the keys
	  //and the names to be diasplayed as the values
	  var attributeNames;
    var type = "";
    var editable = false;
    var choice = "";
	  switch (cat) {
		case("Books"):
      choice = "Books";
      type = "table";
      editable = true;
		  attributeNames = {
  			ISBN:"ISBN",
  			title:"Title",
  			pubYear:"Publication Year",
  			numpages:"Number of Pages",
  			pubName:"Publisher"
		  };
		  break;
		case("Authors"):
      choice = "Authors";
      type = "table";
      editable = true;
		  attributeNames = {
  			AFirst:"First Name",
  			ALast:"Last Name",
  			ABirthdate:"Birthdate"
		  };
		  break;
		case("Categories"):
      choice = "Category Hierarchy";
      type = "table";
      editable = true;
		  attributeNames = {
        categoryName: "Category",
        supercategoryName: "Supercategory"
      };
      break;
    case("Category_Names"):
      choice = "Categorie Names";
      type = "table";
      editable = true;
      attributeNames = {
        categoryName: "Category"
      };
      break;
    case("CopyNr"):
      choice = "Number of Copies";
      type = "table";
      editable = false;
      attributeNames = {
        ISBN: "ISBN",
        num: "Number of Copies"
      };
    break;
    case("Publishings"):
      choice = "Nr of Titles per Publisher";
      type = "query";
      editable = false;
      attributeNames = {
        pubName: "Publisher",
        num: "Number of Titles"
      };
      break;
    case("Borrowings"):
      choice = "Active Borrowing Records";
      type = "query";
      editable = false;
      attributeNames = {
        title: "Title",
        copyNr: "Copy Number",
        MFirst: "First Name",
        MLast: "Last Name"
      };
      break;
    case("MoreThanThreeReminders"):
      choice = "Remindful Employees";
      type = "query";
      editable = false;
      attributeNames = {
        EFirst: "First Name",
        ELast: "Last Name",
        remindNum: "Number of Reminders"
      };
      break;
    case("WellPaidEmployees"):
      choice = "Well Paid Employees";
      type = "query";
      editable = false;
      attributeNames = {
        EFirst: "First Name",
        ELast: "Last Name"
      };
      break;
    case("StephenKingBooks"):
      choice = "Stephen King Books";
      type = "query";
      editable = false;
      attributeNames = {
        title: "Title"
      };
      break;
    case("MostPopularCategories"):
      choice = "Most Popular Categories";
      type = "query";
      editable = false;
      attributeNames = {
        cat: "Category"
      };
      break;
    case("CategoryCounts"):
      choice = "Nr of Titles per Category";
      type = "query";
      editable = false;
      attributeNames = {
        categoryName: "Category",
        num: "Number of Books"
      };
      break;
    default:
      attributeNames = {};
      break;
	  }

	  this.setState({choice: choice, table: attributeNames, tableName: cat, tabletype: type, editableTable: editable});
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
            {this.state.displayMenu ? "Select" : this.state.choice}
          </div>
          { this.state.displayMenu ? (
            <ul>
              <li onClick={(e) => {e.preventDefault(); this.changeToBooks()}}>Books</li>
              <li onClick={(e) => {e.preventDefault(); this.changeToAuthors()}}>Authors</li>
              <li onClick={(e) => {e.preventDefault(); this.changeToCategories()}}>Category Hierarchy</li>
              <li onClick={(e) => {e.preventDefault(); this.changeToCategoryNames()}}>Categorie Names</li>
              <li onClick={(e) => {e.preventDefault(); this.changeToCopyNr()}}>Number of Copies</li>
              <li onClick={(e) => {e.preventDefault(); this.changeToPublishings()}}>Nr of Titles per Publisher</li>
              <li onClick={(e) => {e.preventDefault(); this.changeToCategoryCounts()}}>Nr of Titles per Category</li>
              <li onClick={(e) => {e.preventDefault(); this.changeToBorrowings()}}>Active Borrowing Records</li>
              <li onClick={(e) => {e.preventDefault(); this.changeToMoreThanThreeReminders()}}>Remindful Employees</li>
              <li onClick={(e) => {e.preventDefault(); this.changeToWellPaidEmployees()}}>Well Paid Employees</li>
              <li onClick={(e) => {e.preventDefault(); this.changeToStephenKingBooks()}}>Stephen King Books</li>
              <li onClick={(e) => {e.preventDefault(); this.changeToMostPopularCategories()}}>Most Popular Categories</li>
            </ul>
          ):
          (
          null
          )
          }
        </div>
        { this.state.table ?
        (
          <Table atr={this.state.table} editable={this.state.editableTable} type={this.state.tabletype} name={this.state.tableName}/>
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
