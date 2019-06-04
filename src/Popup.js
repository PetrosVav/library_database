import React, { Component } from 'react';
import axios from 'axios';
import { TiDelete } from "react-icons/ti";
import './Popup.css';

class Popup extends React.Component {
  constructor() {
    super();

    this.state = {
      error: false,
      errorMessage: ""
    }

    this.insert = this.insert.bind(this);
  };

  insert(event) {
    event.preventDefault();


    var insertTuple = {};
    Object.entries(this.props.atr).forEach( entry =>
      {
        let key = entry[0];
        let value = entry[1];
        let input = document.querySelector('#'+key).value;
        insertTuple[key] = input;
      }
    );

    //let callback = this.props.closePopup;
    console.log("bla");
    axios.post('http://localhost:5000/table', {table: this.props.table, insertTuple: insertTuple})
    .then((response) => {
      //console.log("Response:")
      //console.log(response);
      if (response.data.err)
      {
        this.setState({error: true, errorMessage: response.data.err.sqlMessage});
      }
      else this.props.closePopup();
    })
    .catch( (error)=>{
      console.error(error);
    });
  }

  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <TiDelete size={30} className="close-button" onClick={this.props.closePopup}/>
          <form>
            { Object.entries(this.props.atr).map((entry,i) =>
              {
                let key = entry[0];
                let value = entry[1];
                console.log("Entries: "+entry[0]+" "+entry[1]);
                return <><label key={i}> {value}: <input type="text" id={key} /> </label><br/></>;
              })
            }
            <input type="submit" value="Submit" onClick={this.insert} />
          </form>
          { this.state.error ?
            (<p className="Error"> {this.state.errorMessage} </p>)
            :
            (null)
          }
        </div>
      </div>
    );
  }
}

export default Popup;
