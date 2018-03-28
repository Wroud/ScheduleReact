import { IApplicationState } from "@app/store";
import { ILecturer } from "@app/store/database";
import * as React from "react";
import { connect } from "react-redux";
import {
    SimpleListItem,
} from "rmwc/List";
import * as Actions from "../../actions";
import { makeGetLecturer } from "../../selectors/lecturers";

interface IOwnProps {
    id: string;
}

type Props = ILecturer & typeof Actions.lecturersActionCreators;

export class Lecturer extends React.Component<Props> {
    public render() {
        const { fullName, firstName, lastName, secondName } = this.props;
        return (
            <SimpleListItem graphic="star_border" text={fullName} secondaryText={`${firstName} ${lastName}`} meta="info" />
        );
    }
}

const mapStateToProps = (state: IApplicationState, props?: IOwnProps): ILecturer => {
    const getLecturer = makeGetLecturer();
    const id = props ? props.id : "";
    return getLecturer(state, id);
};

export default connect(
    mapStateToProps,
    Actions.lecturersActionsMap,
)(Lecturer);
