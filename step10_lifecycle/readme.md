Read chapter 2 of the following book:

https://library.oreilly.com/book/0636920042266/react-up-amp-running/toc

also read this from react.d.ts:
interface ComponentLifecycle<P, S> {
        componentWillMount?(): void;
        componentDidMount?(): void;
        componentWillReceiveProps?(nextProps: P, nextContext: any): void;
        shouldComponentUpdate?(nextProps: P, nextState: S, nextContext: any): boolean;
        componentWillUpdate?(nextProps: P, nextState: S, nextContext: any): void;
        componentDidUpdate?(prevProps: P, prevState: S, prevContext: any): void;
        componentWillUnmount?(): void;
    }
