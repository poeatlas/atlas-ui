import React, { Component } from 'react';
import { Grid, Row, ButtonGroup, Button } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
import ShaperOrbMenuMap from './ShaperOrbMenuMap';

class ShaperOrbMapMenu extends Component {
  render() {
    const { mapList } = this.props;
    const currIndex = 0;
    return(
      <div className="mapMenu">
        <ButtonGroup justified >
          <ButtonGroup justfied>
            <Button>Tier 1</Button>
          </ButtonGroup>
          <ButtonGroup justfied>
            <Button>Tier 2</Button>
          </ButtonGroup>
                    <ButtonGroup justfied>
          <Button>Tier 3</Button>
          </ButtonGroup>
                    <ButtonGroup justfied>
          <Button>Tier 4</Button>
          </ButtonGroup>
                    <ButtonGroup justfied>
          <Button>Tier 5</Button>
          </ButtonGroup>
                    <ButtonGroup justfied>
          <Button>Tier 6</Button>
          </ButtonGroup>
          <ButtonGroup justfied>
            <Button>Tier 7</Button>
          </ButtonGroup>
          <ButtonGroup justfied>
            <Button>Tier 8</Button>
          </ButtonGroup>
          <ButtonGroup justfied>
            <Button>Tier 9</Button>
          </ButtonGroup>
          <ButtonGroup justfied>
            <Button>Tier 10</Button>
          </ButtonGroup>
        </ButtonGroup>
      </div>
      /*<div>
        <Grid>
          <Row className="show-grid">
            {mapList.map((shapeMap) => {
                if (shapeMap.shaperOrb) {
                  return <li><ShaperOrbMenuMap mapStore={shapeMap}/> </li>
                }
                return null;
              }
            )}
          </Row>
        </Grid>
      </div>*/
    );
  }
}

export default ShaperOrbMapMenu;