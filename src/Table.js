import React, { Component } from 'react';
import axios from 'axios';
import Popup from "./Popup.js";
import { TiDelete } from "react-icons/ti";
import { MdDeleteForever } from "react-icons/md";
import { IoIosAddCircleOutline, IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";

class Table extends Component {
  constructor() {
    super();

    this.state = {
      isLoading:false,
      attributes: null,
      name: "",
      rows:null,
      atrRows:null,
      showPopup: false,
      sortBy: null,
      ascending: true
    };
    this.fillTable = this.fillTable.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.sort = this.sort.bind(this);
  };

  sort = (sortBy) => {
    let ascending = this.state.ascending;
    if (sortBy == this.state.sortBy)
    {
      console.log("Reversing order");
      console.log(ascending);
      ascending = !ascending;
      console.log(ascending);
    }
    let atrRows = this.state.atrRows.sort( (a,b) => {
      //console.log("a: "+a[sortBy]+" b: "+b[sortBy]);
      let res = a[sortBy].localeCompare(b[sortBy]);
      return ascending ? res : -res;
    });
    this.setState({atrRows: atrRows, sortBy: sortBy, ascending: ascending});
  }

  fillTable = () => {
    console.log("Filling Table");
    this.setState({isLoading:true});
    console.log("Sending get request for table: " + this.props.name);
    axios.get(`http://localhost:5000/table`,{ params: {
      table: this.props.name
    }}
    )
    .then( (response)=> {

      console.log("Got table: " + this.props.name);

      //rows holds an array of values without the keys
      var rows = response.data.map( (x) => { return Object.keys(x).map( (y,z) => {return x[y]} )} );

      this.setState({
        isLoading: false,
        attributes: this.props.atr,
        name: this.props.name,
        sortBy: null,
        ascending: true
      });

      this.setState({atrRows:response.data});
      this.setState({rows:rows});
      console.log(rows);
    })
    .catch(error => {
      console.log("error: ",error);
      this.setState({
        isLoading:false
      });
    });
  };

  deleteRow(row){

    this.setState({isLoading:true});
    console.log("Jim");
    console.log(row);
    console.log("Jim");
    axios.delete('http://localhost:5000/table',{
      params:{
        table:this.props.name,
        value:row
      }}
    )
    .then( (response)=>{
      console.log("heyheyheyhey");
      //console.log(response);
      var rows = response.data.map( (x)=>{ return Object.keys(x).map( (y,z) =>{return x[y]} );} );
      this.setState({
        isLoading: false,
        rows:rows,
        atrRows: response.data
      });
    });
  }

  openPopup() {
    this.setState({
      showPopup: true
    });
  }

  closePopup() {
    this.setState({
      showPopup: false
    });
    this.fillTable();
  }

  componentDidMount() {
    this.fillTable();
  }

  render() {
    if(this.state.isLoading) return (
      <p>Loading...</p>
    );
    const { loading, attributes, name, rows, atrRows } = this.state;
    if(atrRows != null){
      return (
        <>
        <table>
        <thead>
        <tr>
          {Object.entries(attributes).map((x,i) => {
            return <th key={i} onClick={this.sort.bind(this, x[0])}> {x[1]}
            {x[0] == this.state.sortBy ? (this.state.ascending ? (<IoIosArrowDropdown size={20} className="arrow"/>) : (<IoIosArrowDropup size={20} className="arrow"/>)) : (null)}
            </th>
          })}
          <th>
            <MdDeleteForever size={25}/>
          </th>
        </tr>
        </thead>
        <tbody>
          {
            atrRows.map( (x,i) => {
              return (
                <tr key={i}>
                  {
                    Object.keys(attributes).map( (y,j) => {return <td key={j}> {x[y]} </td>;})
                  }
                  <td id="delete-col">
                    <TiDelete size={30} className="delete-button" onClick={ this.deleteRow.bind(this,x)}/>
                  </td>
                </tr>
              );
            } )
          }
        </tbody>
        </table>
        <IoIosAddCircleOutline className="add-button" size={30} onClick={this.openPopup.bind(this)}/>
        {this.state.showPopup ?
          <Popup
            table={this.state.name}
            atr={this.state.attributes}
            text='Add Entry'
            closePopup={this.closePopup.bind(this)}
          />
          : null
        }
        </>
      );
    }
    return null;
  }
}

export default Table;
