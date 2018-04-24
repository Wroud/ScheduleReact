export interface IConsumerProps<T> {
    children?: (context: T) => React.ReactNode;
}

export type Consumer<T> = React.ComponentClass<IConsumerProps<T>>;
