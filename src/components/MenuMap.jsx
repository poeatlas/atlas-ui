import React, {Component} from 'react';
import { inject, observer } from 'mobx-react';
import { OverlayTrigger } from 'react-bootstrap';
import cx from 'classnames';

import { getPopover } from './MapPopover';

@inject("atlasStore") @observer
class MenuMap extends Component {
  constructor(props) {
    super(props);

    this.assignShaperOrb = this.assignShaperOrb.bind(this);
  }

  assignShaperOrb() {
    const {atlasStore} = this.props;
    const {map, orbMap} = this.props.mapProps;

    atlasStore.assign(map.id, orbMap.id);
  }
  render() {
    const {map, orbMap} = this.props.mapProps;
    const mapClass = {
      map: true,
      menu: true,
      shaped: true,
      opaque: !(map.shapedById === orbMap.id && orbMap.usedShaperOrb),
    }
    return (
      <OverlayTrigger trigger={['hover', 'focus']} placement="top" 
                            overlay={getPopover(orbMap.name, orbMap.tier, orbMap.mapLevel, orbMap.shaped)}>
        <div className={cx(mapClass)} 
                    onClick={this.assignShaperOrb}
                    style={{backgroundImage: `url(./${orbMap.iconPath})`}}></div>
      </OverlayTrigger>
    );
  }
}
export default MenuMap;