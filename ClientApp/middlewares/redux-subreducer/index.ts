export {
    IExtendAction,
    IPayloadAction,
    createAction,
    createPayloadAction,
    getActionMeta,
    getActionCreator,
    getPayloadCreator,
} from "./action";
export {
    INamedReducer,
    ISubReducer,
    SubReducer,
    MainReducer,
    createMainReducer,
    createSubReducer,
} from "./reducer";

// declare class OpaqueTag<S extends string> {
//     private tag: S;
// }

// type Opaque<T, S extends string> = T & OpaqueTag<S>;
// type Named<T, S extends string> = T & {__tsTag?: S};

// interface IA {
//     prop: string;
// }

// interface IB {
//     prop: string;
// }

// interface IC {
//     prop: string;
// }

// type IAQ = Named<IA, "IA">;
// type IBQ = Named<IB, "IB">;
// type ICQ = Named<IC, "IC">;

// interface IState {
//     a: IAQ;
//     b: IBQ;
// }

// type Keys = IState[keyof IState];

// // tslint:disable-next-line:no-object-literal-type-assertion
// const a: IAQ = { prop: "" } as IAQ;
// // tslint:disable-next-line:no-object-literal-type-assertion
// const b: IBQ = { prop: "" } as IBQ;
// // tslint:disable-next-line:no-object-literal-type-assertion
// const c: ICQ = { prop: "" } as ICQ;

// const join2 = (reducer: Keys) => {
//     return 0;
// };

// join2(c);
