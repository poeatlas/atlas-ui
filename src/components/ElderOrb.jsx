import React, {Component} from 'react';
import {OverlayTrigger, Button} from 'react-bootstrap';
import {inject, observer} from 'mobx-react';
import cx from 'classnames';

@inject("atlasStore") @observer
class ElderOrb extends Component {
    constructor(props) {
        super(props);
        this.activateShaperOrb = this.activateShaperOrb.bind(this);
    }

    activateShaperOrb() {
        const atlasStore = this.props.atlasStore;

        atlasStore.setElderOrb(!atlasStore.elderOrbState);
    }

    render() {
        const elderOrbState = this.props.atlasStore.elderOrbState;
        const INFO_TITLE = "Activate Map Elder Orb Shaping";
        const popoverHoverFocus = (
            <div className="customPopover info">
                <div className="customPopoverTitle infoTitle">{INFO_TITLE}</div>
                <div className="customPopover infoContent">
                    <strong>Tips:</strong> <br/>
                    <ul>
                        <li>Left click a map to shape into Tier 16.</li>
                    </ul>
                </div>
            </div>
        );
        // determine if orb is active
        const mapClass = {
            buttonImageSize: true,
            elderOrb: true,
            toggle: elderOrbState,
        };

        return (
            <OverlayTrigger trigger={['hover', 'focus']}
                            placement="bottom"
                            container={this}
                            overlay={popoverHoverFocus}
                            rootClose={true}>
                <Button onClick={this.activateShaperOrb} active={!!elderOrbState}>
                    <div className={cx(mapClass)} />
                </Button>
            </OverlayTrigger>
        );
    }
}

export default ElderOrb;