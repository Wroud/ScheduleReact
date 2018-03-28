import { addTask, fetch } from "domain-task";
import * as React from "react";
import { connect, ReactNode } from "react-redux";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { Typography } from "rmwc/Typography";

import LecturersList from "@app/Views/Dashboard/Components/Lecturers/LecturersList";
import * as Actions from "../../actions";
import { LecturersReducer } from "../../configureReducer";
import Module from "../../module";
import * as Store from "../../Store";

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
