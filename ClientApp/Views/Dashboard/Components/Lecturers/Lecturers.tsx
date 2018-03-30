import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Button, ButtonIcon } from "rmwc/Button";
import { Elevation } from "rmwc/Elevation";
import { Grid, GridCell, GridInner } from "rmwc/Grid";
import { LinearProgress } from "rmwc/LinearProgress";
import { Typography } from "rmwc/Typography";

import * as Actions from "../../actions";
import { lecturersReducer } from "../../reducers";
import { ILecturersState } from "../../Store";
import LecturerForm from "./LecturerForm";
import LecturersList from "./LecturersList";

type LecturersProps =
    & typeof Actions.lecturersActionCreators.lecturers
    & RouteComponentProps<any>;

class Lecturers extends React.PureComponent<LecturersProps> {
    public render() {
        return (
            <Grid>
                <GridCell span={12}>
                    <Typography use="title" tag={"div"}>
                        <Typography use="headline" tag={"div"}>Lecturers</Typography>
                        <Typography use="subheading1" tag={"div"}>Lecturers list, and adding form.</Typography>
                    </Typography>
                </GridCell>
                <GridCell span={12}>
                    <GridInner>
                        <GridCell span={3} className={"progress--box mdc-layout-grid__cell--align-top"}>
                            <FormProgress />
                            <LecturerForm />
                        </GridCell>
                        <Elevation z={4} wrap={true} className={"progress--box mdc-layout-grid__cell--align-top"}>
                            <GridCell span={9}>
                                <Button raised={true} onClick={this.props.actions.load}>Reload</Button>
                                <ListProgress />
                                <LecturersList />
                            </GridCell>
                        </Elevation>
                    </GridInner>
                </GridCell>
            </Grid>
        );
    }
}

export const ListProgress = connect(
    (state) => ({ determinate: !lecturersReducer.stateSelector(state).loading }),
    () => ({}),
)(LinearProgress);

export const FormProgress = connect(
    (state) => ({ determinate: !lecturersReducer.stateSelector(state).form.loading }),
    () => ({}),
)(LinearProgress);

export default withRouter<RouteComponentProps<any> | undefined>(connect(
    null,
    Actions.lecturersActionsMap.lecturers,
)(Lecturers as any) as any);
