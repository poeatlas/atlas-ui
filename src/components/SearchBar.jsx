import React, { Component } from 'react';
import { InputGroup, FormGroup, FormControl, Button, ButtonGroup } from 'react-bootstrap';
import InfoIcon from "./InfoIcon";
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
          <FormGroup>
            <InputGroup>
              <InfoIcon />
              <FormControl
                type="text"
                value={filter}
                placeholder="Type keywords here..."
                onChange={this.filterChange.bind(this)}
              />
            </InputGroup>
          </FormGroup>
        </form>
      </div>
    );
  }
}

export default SearchBar;