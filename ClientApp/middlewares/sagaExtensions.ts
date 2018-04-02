import { IExtendAction } from "@app/middlewares/redux-subreducer";
import { ForkEffect, HelperFunc0, takeEvery } from "redux-saga/effects";

export function takeEveryAction(actions: IExtendAction<any> | Array<IExtendAction<any>>, worker: HelperFunc0<any>): ForkEffect {
    if (!(actions as IExtendAction<any>).type) {
        return takeEvery((actions as Array<IExtendAction<any>>).map(action => action.type), worker);
    }
    return takeEvery((actions as IExtendAction<any>).type, worker);
}
