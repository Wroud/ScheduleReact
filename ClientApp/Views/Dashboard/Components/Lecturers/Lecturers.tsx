import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Typography } from "rmwc/Typography";

import * as Actions from "../../actions";
import LecturersList from "./LecturersList";

type LecturersProps =
    & typeof Actions.lecturersActionCreators
    & RouteComponentProps<any>;

class Lecturers extends React.PureComponent<LecturersProps> {
    public render() {
        return (
            <div>
                <Typography use="display1" tag={"h1"}>Lecturers Test</Typography>
                <p>This is a simple example of a React component.</p>
                <button onClick={this.props.actions.load}>Reload</button>
                {/* <button onClick={this.props.decrement}>Decrement</button> */}
                <LecturersList />
            </div>
        );
    }
}

export default withRouter<RouteComponentProps<any> | undefined>(connect(
    null,
    Actions.lecturersActionsMap,
)(Lecturers as any) as any);
