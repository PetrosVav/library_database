import React, { Component } from 'react';
import axios from 'axios';
import { TiDelete } from "react-icons/ti";
import './Popup.css';

class Popup extends Component {
  constructor(props) {
    super(props);
    let val;
    val = Object.keys(this.props.atr).map((i) =>{
            if(this.props.row != null) return this.props.row[i]
            else return ""
          });
    let update;
    let pk=""; //primary key
    let pkValue="";
    if(this.props.row != null){
      update=true;
      pk=Object.keys(this.props.row)[0];
      pkValue=Object.values(this.props.row)[0];
    }
    else update = false;
    this.state = {
      pk:pk,
      pkValue:pkValue,
      update:update,
      error: false,
      errorMessage: "",
      val: val
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.insert = this.insert.bind(this);
  };

  insert(event) {
    event.preventDefault();


    var insertTuple = {};
    Object.keys(this.props.atr).forEach( key =>
      {
        let input = document.querySelector('#'+key).value;
        insertTuple[key] = input;
      }
    );
    axios.post('http://localhost:5000/table', {
      update: this.state.update,
      table: this.props.table,
      insertTuple: insertTuple,
      pk:this.state.pk,
      pkValue:this.state.pkValue
    })
    .then((response) => {
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

  handleInputChange(event) {
   const target = event.target;
   const value = target.value;
   const index = target.name;
   console.log("index: ");
   console.log(index);
   console.log(value);
   let val = this.state.val
   val[index]=value;
   this.setState({
     val: val
   });
 }

  render() {
    return (
      <div className='popup'>
        <div className='popup_inner' key="h">
          <TiDelete key="hey" size={30} className="close-button" onClick={this.props.closePopup}/>
          <form key="a">
            { Object.entries(this.props.atr).map((entry,i) =>
              {
                let key = entry[0];
                let value = entry[1];
                return <><label key={i}> {value}: <input name={i} type="text" value={this.state.val[i] ? this.state.val[i] : ""} onChange={this.handleInputChange} id={key}/></label><br/></>;
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
