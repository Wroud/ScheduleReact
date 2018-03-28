import * as React from "react";
import { connect } from "react-redux";
import {
    List,
} from "rmwc/List";
import * as Actions from "../../actions";
import { LecturersReducer } from "../../configureReducer";
import { ILecturersState } from "../../Store";
import Lecturer from "./Lecturer";

type Props = ILecturersState & typeof Actions.lecturersActionCreators;

export class LecturersList extends React.Component<Props> {
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
    private renderList = (lecturers: string[]) => lecturers.map((element, id) => (<Lecturer id={element} key={id} />));
}

export default connect(
    LecturersReducer.stateSelector,
    Actions.lecturersActionsMap,
)(LecturersList);
