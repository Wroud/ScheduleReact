import { createSubReducer } from "@app/middlewares/redux-subreducer";
import { IViewState } from "@app/View";
import { actions, lecturersActions } from "./actions";
import * as Store from "./Store";

export const LecturersReducer = createSubReducer<Store.IState, Store.ILecturersState>("lecturers", Store.InitLecturersState)
        .on(lecturersActions.load, (state) => ({ loading: true }))
        .on(lecturersActions.update, (state, payload) => ({ lecturers: payload }))
        .on(lecturersActions.loadFinish, (state) => ({ loading: false }));

export const configureReducer = (name: string) =>
        createSubReducer<IViewState, Store.IState>(name, Store.InitState)
                .join(LecturersReducer)
                .on(actions.increment, (state) => ({ count: state.count + 1 }))
                .on(actions.decrement, (state) => ({ count: state.count - 1 }));
