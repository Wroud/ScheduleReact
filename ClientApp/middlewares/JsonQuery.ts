import { addTask, fetch } from "domain-task";

interface IErrorMessage {
    id: string;
    name: string;
    message: string;
}
interface IJsonResult<T> {
    state: boolean;
    data: T;
    errors: IErrorMessage[];
}

type IHandlerFunc = (message?: string) => any;
type IStateCallbackFunc<T> = (data: T) => any;
type IDataCallbackFunc<T> = (state: boolean, data: T) => any;
interface IErrorHandlers {
    [key: string]: IHandlerFunc;
}

export interface IOptions<T> {
    type: string;
}

type RequestType = "post" | "get" | "delete";

export class ErrorHandler {
    public key: string;
    public handler: IHandlerFunc;
    constructor(key: string, handler: IHandlerFunc) {
        this.key = key;
        this.handler = handler;
    }
}

export class HandlersContainer {
    public Handlers: ErrorHandler[];
    constructor() {
        this.Handlers = [];
        this.addFor = this.addFor.bind(this);
        this.handle = this.handle.bind(this);
        this.reset = this.reset.bind(this);
    }
    public addFor(key: string, handler: IHandlerFunc | null) {
        if (handler) {
            this.Handlers.push(new ErrorHandler(key.toLowerCase(), handler));
        }
        return this;
    }
    public reset() {
        for (const key in this.Handlers) {
            if (this.Handlers.hasOwnProperty(key)) {
                this.Handlers[key].handler();
            }
        }
    }
    public handle(errors: IErrorMessage[]) {
        this.reset();
        errors.forEach((error) => {
            console.log(error.name);
            this.Handlers.filter((handler) => handler.key === error.name.toLowerCase()).forEach((handler) => {
                handler.handler(error.message);
            });
        });
    }
}

export class HandlersSubscriber {
    public Errors: IErrorMessage[];
    constructor(errors: IErrorMessage[]) {
        this.Errors = errors;
    }
    public for(key: string, handler: IHandlerFunc | null) {
        if (handler) {
            handler();
            this.Errors
                .filter((error) => key.toLowerCase() === error.name.toLowerCase())
                .forEach((error) => {
                    console.log(error.name);
                    handler(error.message);
                });
        }
        return this;
    }
}

export class JsonQueryResult<T> {
    private response: IJsonResult<T>;

    constructor(response: IJsonResult<T>) {
        this.response = response;
    }

    get state() { return this.response.state; }
    get data() { return this.response.data; }
    get errors() { return this.response.errors; }

    public handleErrors(handler: HandlersContainer) {
        handler.handle(this.errors);
    }
}

function failResult<T>(exception: any): IJsonResult<T> {
    return {
        state: false,
        errors: [
            // tslint:disable-next-line:no-object-literal-type-assertion
            {
                name: "_query_",
                message: exception,
            } as IErrorMessage],
        // tslint:disable-next-line:no-object-literal-type-assertion
        data: {} as T,
    };
}

export async function Get<T>(url: string, method: RequestType = "post", opt?: IOptions<T>, data?: any) {
    try {
        const fetchTask = fetch(url, { method }).then((response) => response.json() as Promise<IJsonResult<T>>);
        addTask(fetchTask);
        return new JsonQueryResult<T>(await fetchTask);
    } catch (e) {
        return new JsonQueryResult<T>(failResult<T>(e));
    }
}
export async function Send<T>(url: string, method: RequestType = "get", data: any, opt?: IOptions<T>) {
    let formData = new FormData();
    if (data instanceof FormData) {
        formData = data;
    } else {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                formData.append(key, data[key]);
            }
        }
    }
    try {
        const fetchTask = fetch(url, { method, body: formData }).then((response) => response.json() as Promise<IJsonResult<T>>);
        addTask(fetchTask);
        return new JsonQueryResult<T>(await fetchTask);
    } catch (e) {
        return new JsonQueryResult<T>(failResult<T>(e));
    }
}
