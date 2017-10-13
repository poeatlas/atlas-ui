import React, { Component } from 'react';
import { InputGroup, FormGroup, FormControl, Grid, Row, Col } from 'react-bootstrap';
import { observer } from "mobx-react";

import './SearchBar.css';
import InfoIcon from './InfoIcon';
import Seal from './Seal';
import ShaperOrb from './ShaperOrb';
import UnshapeDialogue from './UnshapeDialogue';
import Sextant from './Sextant';

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
    const { mapList } = this.props;

    this.setState({ 
      value: e.target.value
    });
    const filter = e.target.value.toLowerCase();

    var filterTier = null;
    const tierIndex = filter.indexOf("tier:");
    if(tierIndex !== -1) {
      filterTier = parseInt(filter.substring(tierIndex+5), 10);
    }

    for (var i=0; i<mapList.length; i++) {
      const currMap = mapList[i];
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
    return (
      <Grid className="searchbar-wrapper">
        <Col md={4}  mdOffset={4}>
          <form className="searchbar">
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
                <ShaperOrb />
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>
          </form>
        </Col>
      </Grid>
    );
  }
}

export default SearchBar;