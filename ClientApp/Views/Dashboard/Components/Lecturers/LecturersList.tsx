import * as React from "react";
import { connect } from "react-redux";
import {
    List,
} from "rmwc/List";
import * as Actions from "../../actions";
import { lecturersReducer } from "../../reducers";
import { ILecturersState } from "../../Store";
import Lecturer from "./Lecturer";

type Props = { lecturers: string[] } & typeof Actions.lecturersActionCreators.lecturers;

export class LecturersList extends React.PureComponent<Props> {
    public componentWillMount() {
        if (!this.props.lecturers || this.props.lecturers.length === 0) {
            this.props.actions.load();
        }
    }
    public render() {
        const { lecturers } = this.props;
        return (
            <List twoLine={true}>
                {this.renderList(lecturers)}
            </List>
        );
    }
    private renderList = (lecturers: string[]) => lecturers.map((element) => (<Lecturer id={element} key={element} />));
}

export default connect(
    (state) => ({ lecturers: lecturersReducer.stateSelector(state).lecturers }),
    Actions.lecturersActionsMap.lecturers,
)(LecturersList);
