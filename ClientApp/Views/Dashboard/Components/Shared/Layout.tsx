import * as React from "react";
import {
    ToolbarFixedAdjust,
} from "rmwc/Toolbar";
import Drawer from "./Drawer";
import NavMenu from "./NavMenu";

export class Layout extends React.Component {
    public Drawer?: Drawer | null;
    public switchDrawer = () => {
        if (!!this.Drawer) {
            this.Drawer.switchDrawer();
        }
    }
    public render() {
        return [
            <NavMenu switchDrawer={this.switchDrawer} key={"drawer"} />,
            (
                <ToolbarFixedAdjust key={"toolbar"} className={"dashboard"}>
                    <Drawer ref={(ref) => { this.Drawer = ref; }} />
                    <main>{this.props.children}</main>
                </ToolbarFixedAdjust>
            ),
        ];
    }
}
