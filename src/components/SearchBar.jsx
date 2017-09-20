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
    console.log(this.props.MapStore);
    this.props.MapStore.filter = e.target.value;
  }

  render() {
    console.log(this)
    const { filter, filteredMaps, maps} = this.props.MapStore;
    // test filtered maps from searchbar
    const mapList = filteredMaps.map(map => (
      <li>{ map } </li>
    ));

    return (
      <div className="searchbar">
        <form>
          { console.log(filter)}
          <FormGroup controlId="search">
            <FormControl
              type="text"
              value={filter}
              placeholder="Type keywords here..."
              onChange={this.filterChange.bind(this)}
            />
          </FormGroup>
          {/*test filered maps list */}
          <ul> { mapList } </ul>
        </form>
        
      </div>
    );
  }
}

export default SearchBar;