import { denormalize, normalize, schema } from "normalizr";
import { IApplicationState } from "../ApplicationState";
import { appStore } from "../reducer";
import { actionsCreators, tableActionsCreators } from "./actions";
import { IDatabaseState, ITable, Tables } from "./DatabaseState";
import { tableReducers } from "./reducer";
import { schemas } from "./schema";

export class Table<T extends Tables> {
    private name: string;
    private schema: schema.Entity;
    private selector: (state: IApplicationState) => ITable<T>;

    constructor(name: keyof IDatabaseState) {
        this.name = name;
        this.selector = tableReducers[name].stateSelector as any;
        this.schema = schemas[this.name];
    }

    get stateSelector() {
        return this.selector;
    }

    public get = (id: string): T | undefined => {
        return this.denormalizer(id);
    }

    public getAllIds = (): string[] => {
        const state = appStore.getState(); // <====
        if (state && state.database) {
            const table = this.stateSelector(state);
            return Object.keys(table);
        }
        return [];
    }

    public add = (data: T[]): string[] => {
        const normalizedData = this.normalizer(data);
        appStore.dispatch(actionsCreators.update(normalizedData.entities)); // <====
        return normalizedData.result;
    }

    public remove = (id: string) => {
        appStore.dispatch(tableActionsCreators[this.name].update({ [id]: "__delete__" as any })); // <====
    }

    public update = (data: T[]) => {
        return this.add(data);
    }

    private normalizer = (data: T[]) => {
        return normalize(data, this.schema);
    }

    private denormalizer = (id: string) => {
        const state = appStore.getState(); // <====
        if (state && state.database) {
            const table = this.stateSelector(state);
            return denormalize(table[id], this.schema, state.database);
        }
    }
}

export const openTable = <T extends Tables>(name: keyof IDatabaseState) => new Table<T>(name);

export function SelectDatabase<T extends IDatabaseState[keyof IDatabaseState]>(db: (database: IDatabaseState) => T) {
    return (state: IApplicationState) => db(state.database);
}

export function SelectFromTable<T extends Tables, P>(table: (database: IDatabaseState) => ITable<T>, entryId: (props: P) => string) {
    return (state: IApplicationState, props: P) => table(state.database)[entryId(props)];
}

export function SelectEntries<T extends Tables>(table: (database: IDatabaseState) => ITable<T>, entries: (state: IApplicationState) => string[]) {
    return (state: IApplicationState) => entries(state).map((entry) => table(state.database)[entry]);
}
