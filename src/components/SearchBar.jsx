import React, { Component } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { inject, observer } from "mobx-react";

@inject('MapStore') @observer
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ 
      value: e.target.value
    });
  }

  filterChange(e) {
    this.props.MapStore.filter = e.target.value;
  }

  render() {
    const { filter } = this.props.MapStore;

    return (
      <div className="searchbar">
        <form>
          <FormGroup controlId="search">
            <FormControl
              type="text"
              value={filter}
              placeholder="Type keywords here..."
              onChange={this.filterChange.bind(this)}
            />
          </FormGroup>
        </form>
        
      </div>
    );
  }
}

export default SearchBar;