import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { compose } from "redux";
import {
    ToolbarFixedAdjust,
} from "rmwc/Toolbar";
import { DrawerWrapper } from "./Drawer";
import NavMenu from "./NavMenu";

import { moduleActions } from "../../actions";

export class LayoutClass extends React.Component<typeof moduleActions.mapCreators.drawer & RouteComponentProps<{}>> {
    render() {
        return [
            <NavMenu switchDrawer={this.switchDrawer} key={"drawer"} />,
            (
                <ToolbarFixedAdjust key={"toolbar"} className={"dashboard"}>
                    <DrawerWrapper />
                    <main>{this.props.children}</main>
                </ToolbarFixedAdjust>
            ),
        ];
    }
    private switchDrawer = () => {
        this.props.actions.switchDrawer(undefined, "drawer");
    }
}

const enhance = compose<React.ComponentClass<{}>>(
    withRouter,
    connect(
        null,
        moduleActions.mapDispatch.drawer,
    ),
);

export const Layout = enhance(LayoutClass);
