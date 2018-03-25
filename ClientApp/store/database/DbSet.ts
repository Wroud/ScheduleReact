import { denormalize, normalize, schema } from "normalizr";
import { IApplicationState } from "../ApplicationState";
import { AppStore } from "../reducer";
import { ActionsCreators } from "./actions";
import { IDatabaseState, ITable, Tables } from "./DatabaseState";
import { TableReducers } from "./reducer";
import { Schemas } from "./schema";

export class DbSet<T extends Tables> {
    private name: string;
    private table: ITable<T>;
    private database: IDatabaseState;
    private schema: schema.Entity;
    private selector: (state: IApplicationState) => ITable<T>;

    constructor(name: keyof IDatabaseState) {
        this.database = {} as any;
        this.table = {};
        this.name = name;
        this.selector = TableReducers[name].stateSelector as any;
        this.schema = Schemas[this.name];

        const state = AppStore.getState();

        if (!state) {
            return;
        }

        if (state.database) {
            this.table = TableReducers[name].stateSelector(state) as ITable<T>;
        }

        this.database = state.database;

    }

    get stateSelector() {
        return this.selector;
    }

    public get = (id: string): T => this.denormalizer(id, this.database);

    public add = (data: T[]): string[] => {
        const normalizer = this.normalizer(data);
        AppStore.dispatch(ActionsCreators.update(normalizer.entities));
        return normalizer.result;
    }

    public remove = (id: string) => {
        AppStore.dispatch(ActionsCreators.update({ [this.name]: { [id]: "__delete__" } } as any));
    }

    public update = (data: T[]) => {
        return this.add(data);
    }

    private normalizer = (data: T[]) => {
        return normalize(data, this.schema);
    }

    private denormalizer = (id: string, database: IDatabaseState) => {
        return denormalize(this.table[id], this.schema, database);
    }
}

export function SelectDatabase<T extends IDatabaseState[keyof IDatabaseState]>(db: (database: IDatabaseState) => T) {
    return (state: IApplicationState) => db(state.database);
}

export function SelectFromTable<T extends Tables, P>(table: (database: IDatabaseState) => ITable<T>, entryId: (props: P) => string) {
    return (state: IApplicationState, props: P) => table(state.database)[entryId(props)];
}

export function SelectEntries<T extends Tables>(table: (database: IDatabaseState) => ITable<T>, entries: (state: IApplicationState) => string[]) {
    return (state: IApplicationState) => entries(state).map((entry) => table(state.database)[entry]);
}
