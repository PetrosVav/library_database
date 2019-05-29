import React, { Component } from 'react';

class Table extends Component {
  constructor(list) {
    super();

    this.state = {
         attributes: list
    };
  };


  render() {
    return (
      <div>
        <p>I am a Table</p>
      </div>
    );
    //console.log(this.attributes);
  }
}

export default Table;
