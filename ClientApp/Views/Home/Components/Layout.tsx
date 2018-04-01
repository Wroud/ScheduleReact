import * as React from "react";
import {
    ToolbarFixedAdjust,
} from "rmwc/Toolbar";
import Drawer from "./Drawer";
import NavMenu from "./NavMenu";

export class Layout extends React.Component {
    Drawer?: Drawer | null;
    switchDrawer = () => {
        if (!!this.Drawer) {
            this.Drawer.switchDrawer();
        }
    }
    render() {
        return (
            <div>
                <NavMenu switchDrawer={this.switchDrawer} />
                <ToolbarFixedAdjust />
                <Drawer ref={ref => { this.Drawer = ref; }} />
                <main>{this.props.children}</main>
            </div>
        );
    }
}
