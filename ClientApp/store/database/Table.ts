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
    private tableSelector: (state: IApplicationState) => ITable<T>;

    constructor(name: keyof IDatabaseState) {
        this.name = name;
        this.tableSelector = tableReducers[name].stateSelector as any;
        this.schema = schemas[this.name];
    }

    get stateSelector() {
        return this.tableSelector;
    }

    get = (id: string): T | undefined => {
        return this.denormalizer(id);
    }

    getAllIds = (): string[] => {
        const result = this.withState(state => {
            const table = this.stateSelector(state);
            return Object.keys(table);
        });
        return result || [];
    }

    add = (data: T[]): string[] => {
        const normalizedData = this.normalizer(data);
        appStore.dispatch(actionsCreators.update(normalizedData.entities)); // <====
        return normalizedData.result;
    }

    remove = (id: string) => {
        const deleteId = { [id]: "__delete__" as any };
        appStore.dispatch(tableActionsCreators[this.name].update(deleteId)); // <====
    }

    update = (data: T[]) => {
        return this.add(data);
    }

    private normalizer = (data: T[]) => {
        return normalize(data, this.schema);
    }

    private denormalizer = (id: string) => {
        const data = this.withState(state => {
            const table = this.stateSelector(state);
            return denormalize(table[id], this.schema, state.database);
        });
        return data;
    }

    private withState = <TResult>(action: (state: IApplicationState) => TResult): TResult | undefined => {
        const state = appStore.getState(); // <====
        if (state && state.database) {
            return action(state);
        }
    }
}

export const openTable = <T extends Tables>(name: keyof IDatabaseState) => new Table<T>(name);

export function selectDatabase<T extends IDatabaseState[keyof IDatabaseState]>(db: (database: IDatabaseState) => T) {
    return (state: IApplicationState) => db(state.database);
}

export function selectFromTable<T extends Tables, P>(table: (database: IDatabaseState) => ITable<T>, entryId: (props: P) => string) {
    return (state: IApplicationState, props: P) => table(state.database)[entryId(props)];
}

export function selectEntries<T extends Tables>(table: (database: IDatabaseState) => ITable<T>, entries: (state: IApplicationState) => string[]) {
    return (state: IApplicationState) => entries(state).map(entry => table(state.database)[entry]);
}
