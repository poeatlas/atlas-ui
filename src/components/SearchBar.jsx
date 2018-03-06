import React, { Component } from 'react';
import { InputGroup, FormGroup, FormControl, Grid, Col, Row} from 'react-bootstrap';
import { observer } from "mobx-react";

import './SearchBar.css';
import InfoIcon from './InfoIcon';
import Seal from './Seal';
import ShaperOrb from './ShaperOrb';
import Sextant from './Sextant';
import Reset from './Reset';
import ElderOrb from './ElderOrb';
import {inject} from "mobx-react/index";

@inject("atlasStore") @observer
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { mapList, atlasStore } = this.props;

    atlasStore.searchString = e.target.value;

    const filter = e.target.value.toLowerCase();

    let filterTier = null;
    const tierIndex = filter.indexOf("tier:");
    if(tierIndex !== -1) {
      filterTier = parseInt(filter.substring(tierIndex+5), 10);
    }

    for (let i=0; i<mapList.length; i++) {
      const currMap = mapList[i];
      const areaName = currMap.name.toLowerCase();
      const tier = currMap.tier;

      currMap.highlighted = (filter && filter.length <= areaName.length && areaName.indexOf(filter) !== -1)
          || filterTier === tier;
    }
  }

  render() {
    const { atlasStore } = this.props;
    return (
      <div className="searchbar-wrapper">
        <Grid>
          <Row>
            <Col md={12}> 
              <div className="searchbar">
                <form>
                  <FormGroup>
                    <InputGroup>
                      <InputGroup.Button>
                        <Reset className="infoSize" />
                      </InputGroup.Button>
                      <InfoIcon />
                      <FormControl
                        className="searchSize"
                        type="text"
                        value={atlasStore.searchString}
                        placeholder="Type keywords here..."
                        onChange={this.handleChange}
                      />
                      <InputGroup.Button>
                        <Seal />
                        <Sextant />
                        <ShaperOrb />
                        <ElderOrb />
                      </InputGroup.Button>
                    </InputGroup>
                  </FormGroup>
                </form>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default SearchBar;