import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { compose } from "redux";
import {
    ToolbarFixedAdjust,
} from "rmwc/Toolbar";
import { DrawerWrapper } from "./Drawer";
import NavMenu from "./NavMenu";

import { lecturersActions } from "../../actions";

export class LayoutClass extends React.Component<typeof lecturersActions.mapCreators.ui & RouteComponentProps<{}>> {
    render() {
        return [
            <NavMenu switchDrawer={this.props.actions.switchDrawer} key={"drawer"} />,
            (
                <ToolbarFixedAdjust key={"toolbar"} className={"dashboard"}>
                    <DrawerWrapper />
                    <main>{this.props.children}</main>
                </ToolbarFixedAdjust>
            ),
        ];
    }
}

const enhance = compose<React.ComponentClass>(
    withRouter,
    connect(
        null,
        lecturersActions.mapDispatch.ui,
    ),
);

export const Layout = enhance(LayoutClass);
