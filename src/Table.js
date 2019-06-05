import React, { Component } from 'react';
import axios from 'axios';
import Popup from "./Popup.js";
import { TiDelete } from "react-icons/ti";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { IoIosAddCircleOutline, IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";

class Table extends Component {
  constructor() {
    super();

    this.state = {
      isLoading:false,
      editable: null,
      attributes: null,
      row:null,
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

  //Sort table
  sort = (sortBy) => {
    let ascending = this.state.ascending;
    if (sortBy === this.state.sortBy)
    {
      ascending = !ascending;
    }
    let atrRows = this.state.atrRows.sort( (a,b) => {
      let res = a[sortBy].localeCompare(b[sortBy]);
      return ascending ? res : -res;
    });
    this.setState({atrRows: atrRows, sortBy: sortBy, ascending: ascending});
  }

  fillTable = () => {
    let uponResponse = (response)=> {

      console.log("Got result: " + this.props.name);

      //rows holds an array of values without the keys
      var rows = response.data.map( (x) => { return Object.keys(x).map( (y,z) => {return x[y]} )} );

      this.setState({
        isLoading: false,
        editable: this.props.editable,
        attributes: this.props.atr,
        name: this.props.name,
        sortBy: null,
        ascending: true
      });

      this.setState({atrRows:response.data});
      this.setState({rows:rows});
      console.log(rows);
    }

    console.log("Filling Table");
    this.setState({isLoading:true});
    console.log("Sending get request for: " + this.props.name);
    switch (this.props.type) {
      case 'table':
        axios.get(`http://localhost:5000/table`,{ params: {
          table: this.props.name
        }}
        )
        .then( uponResponse );
        break;
      case 'query':
        axios.get(`http://localhost:5000/query`,{ params: {
          query: this.props.name
        }}
        )
        .then( uponResponse )
        .catch(error => {
          console.log("error: ",error);
          this.setState({
            isLoading:false
          });
        });
        break;
      default:
        break;
    }
  };

  deleteRow(row){

    this.setState({isLoading:true});
    axios.delete('http://localhost:5000/table',{
      params:{
        table:this.props.name,
        value:row
      }}
    )
    .then( (response)=>{
      var rows = response.data.map( (x) => { return Object.keys(x).map( (y,z) =>{return x[y]} );} );
      this.setState({
        isLoading: false,
        rows:rows,
        atrRows: response.data
      });
    });
  }

  openEditPopup(row) {
    this.setState({
      row:row,
      showPopup: true
    });
  }

  openPopup() {
    this.setState({
      row: null,
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
    const { attributes, atrRows } = this.state;
    if(atrRows != null){
      // console.log(attributes);
      // var columns= Object.entries(attributes).map((a)=> {return {Header:a[1],accessor:a[0]} });
      // columns = columns.concat([{Header:<MdDeleteForever size={25}/>,accessor:"hey" ,id:1}]);
      // console.log("col: ");
      // console.log(columns);
      // console.log(atrRows);
      // var re='{\"' + "rows"+'\":\"' + "bla" +'\"}';
      // console.log(re);
      // console.log(JSON.parse('{ "name":"John", "age":30, "city":"New York", '+'\"hey\":\"<MdDeleteForever size={25}/>\"' +'}'));
      // console.log(JSON.parse(re));
      // var data = atrRows.map((a)=> {return JSON.parse('{'+Object.keys(attributes).map((x)=>{ return ('\"'+x+'\":\"'+a[x]+'\"')  })+ ', \"hey\":"<MdDeleteForever size={25}/>"}')});
      // //data = data.map(x=>{return x.concat([{}])})
      // console.log("data: ");
      // console.log(data);
      return (
        <>
        <table>
        <thead>
        <tr>
          {Object.entries(attributes).map((x,i) => {
            return <th className="orderable" key={i} onClick={this.sort.bind(this, x[0])}> {x[1]}
            {x[0] === this.state.sortBy ? (this.state.ascending ? (<IoIosArrowDropdown size={20} className="arrow"/>) : (<IoIosArrowDropup size={20} className="arrow"/>)) : (null)}
            </th>
          })}
          { this.state.editable ?
            ( <>
              <th>
                <MdEdit size={25}/>
              </th>
              <th>
                <MdDeleteForever size={25}/>
              </th>
              </>
            ) :
            (
              null
            )
          }
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
                  { this.state.editable ?
                    ( <>
                      <td id="delete-col">
                        <MdEdit size={30} className="delete-button" onClick={this.openEditPopup.bind(this,x)}/>
                      </td>
                      <td id="delete-col">
                        <TiDelete size={30} className="delete-button" onClick={ this.deleteRow.bind(this,x)}/>
                      </td>
                      </>
                    ) :
                    (
                      null
                    )
                  }
                </tr>
              );
            } )
          }
        </tbody>
        </table>
        { this.state.editable ?
          (
            <IoIosAddCircleOutline className="add-button" size={30} onClick={this.openPopup.bind(this)}/>
          ) :
          (
            null
          )
        }
        {this.state.showPopup ?
          <Popup
            table={this.state.name}
            row={this.state.row}
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
