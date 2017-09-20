import React, { Component } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { observer } from "mobx-react";

// @observer
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

  render() {
    // const {filter, filteredMaps, maps } = this.props.store;
    
    // test filtered maps from searchbar
    // const mapList = filteredMaps.map(map => (
    //   <li>{ map } </li>
    // ));

    return (
      <div className="searchbar">
        <form>
          <FormGroup controlId="search">
            {/*<FormControl
              type="text"
              value={filter}
              placeholder="Type keywords here..."
              onChange={this.filter.bind(this)}
            />*/}
          </FormGroup>
          {/*test filered maps list */}
          {/*<ul> { mapList } </ul>*/}
        </form>
      </div>
    );
  }
}

export default SearchBar;