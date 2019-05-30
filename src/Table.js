import React, { Component } from 'react';
import axios from 'axios';

class Table extends Component {
  constructor(list,name) {
    super();

    console.log("bla");
    console.log(list.name);
    this.state = {
         attributes: list,
         category: list.name,
         rows:null
    };
    console.log("Hello");

    //console.log(this.state.attributes);
    //this.render();
  };
  fillTable(){
    console.log(this.state.category);
    axios.get(`http://localhost:5000/Books`,{ params: {
      table: this.state.category
    }} )
    .then( (response)=> {
      console.log("aaaaaaaaaaa");
      var rows = response.data.map( (x)=>{ return Object.keys(x).map( (y,z) =>{return x[y]} )} );

      if(this.state.rows==null) this.setState({rows:rows});
      console.log(rows);
      console.log("aaaaaaaaaaa");
    } );
  }

  render() {
  //  console.log(this.attributes);
    console.log("Hello World");
    console.log(this.state.attributes.name);
    console.log("Hello World");
    //this.setState({category: this.state.attributes.name});
    console.log(this.state.attributes);
    this.fillTable();
    console.log("bbbbbbbbbbb");
    console.log(this.state.rows);
    console.log("bbbbbbbbbbb");
    if(this.state.rows!=null){
      return (
        <table align="center" border="2">
        <thead>
        <tr>
          {this.state.attributes.atr.map( (atr,i)=>{
                                                  //console.log(atr);
                                                  return(<th key={i}>{atr}</th>);
                                                }
                                    )
          }
        </tr>
        </thead>
        <tbody>
          {
            this.state.rows.map( (x) => {
              return (
                <tr> {x.map( (y) => { return(<td> {y} </td>); } )} </tr>
              );
            } )
          }
        </tbody>
        </table>
      );
    }
    return null;
  }
}

export default Table;
