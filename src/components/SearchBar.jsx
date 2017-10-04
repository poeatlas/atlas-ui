import React, { Component } from 'react';
import { InputGroup, FormGroup, FormControl, Button, ButtonGroup } from 'react-bootstrap';
import InfoIcon from "./InfoIcon";
import Seal from "./Seal";
import ShaperOrb from "./ShaperOrb";
import Sextant from "./Sextant";
import { observer } from "mobx-react";

@observer
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { mapStore } = this.props;

    this.setState({ 
      value: e.target.value
    });
    const filter = e.target.value.toLowerCase();

    var filterTier = null;
    const tierIndex = filter.indexOf("tier:");
    if(tierIndex !== -1) {
      filterTier = parseInt(filter.substring(tierIndex+5), 10);
    }

    for (var i=0; i<mapStore.length; i++) {
      const currMap = mapStore[i];
      const areaName = currMap.name.toLowerCase();
      const tier = currMap.tier;

      if (((filter && filter.length <= areaName.length && areaName.indexOf(filter) !== -1 ) 
          || filterTier === tier )) {
        currMap.highlighted = true;
      } else {
        currMap.highlighted = false;
      }
    }
  }

  render() {
    const { mapStore } = this.props;

    return (
      <div className="searchbar">
        <form>
          <FormGroup>
            <InputGroup>
              <InfoIcon />
              <FormControl
                type="text"
                value={this.state.value}
                placeholder="Type keywords here..."
                onChange={this.handleChange}
              />
              <InputGroup.Button>
              <Seal />
              <Sextant />
              <ShaperOrb mapStore={mapStore} />
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </form>
      </div>
    );
  }
}

export default SearchBar;