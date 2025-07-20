//#region Utility Types
type Nested<T> = (T | Nested<T>)[];
//#endregion

//#region Tag Mapping
type FullElementTagNameMap = HTMLElementTagNameMap & SVGElementTagNameMap & MathMLElementTagNameMap;
type DOMNode = FullElementTagNameMap[keyof FullElementTagNameMap];
//#endregion

//#region Selector Tag Mapping
/** Users can extend this interface to get better static type checking in their IDE for more complex selectors */
interface CustomElementTagNameMap {
    [key: `${string}`]: HTMLElement;
}
type SelectorTagNameMap = { [K in keyof CustomElementTagNameMap as CustomElementTagNameMap[K] extends DOMNode ? K : never]: CustomElementTagNameMap[K] } & FullElementTagNameMap;
type SelectorTagName = keyof SelectorTagNameMap;
//#endregion

//#region Extension Types
type Extended<D extends DOMNode, C extends CustomProps = {}> = D & C & ExtendMethods;
interface ExtendMethods {
    _: (...children: Nested<DOMNode | string | false | undefined | null>) => this;
    __: (...children: Nested<DOMNode | string | false | undefined | null>) => this;
    $: QuerySelector;
    $$: QuerySelectorAll;
    on: (type: string, listener: EventListenerOrEventListenerObject) => this;
    do: (type: string, eventInitDict?: EventInit) => this;
}
type CustomProps = Record<string, unknown>;
type ExtendProps<D extends DOMNode, C extends CustomProps = {}> = { dataset?: DOMStringMap; style?: Partial<CSSStyleDeclaration>; classList?: (string | undefined | null)[]; attributeList?: Record<string, string>; customProps?: C; } & Partial<Omit<D, 'dataset' | 'style' | 'classList'>>;
interface ObjectUtilities<Values> {
    entries: [string, Values][];
    keys: string[];
    values: Values[];
    forEach: (callbackfn: (value: [string, Values], index: number, array: [string, Values][]) => void) => void;
    map: <ReturnValue>(callbackfn: (value: [string, Values], index: number, array: [string, Values][]) => ReturnValue) => ReturnValue[];
    reduce: <InitialValue>(callbackfn: (previousValue: InitialValue, currentValue: [string, Values], currentIndex: number, array: [string, Values][]) => InitialValue, initialValue: InitialValue) => InitialValue;
    filter: (predicate: (value: [string, Values], index: number, array: [string, Values][]) => unknown) => [string, Values][];
}
//#endregion

//#region Functions
type Flat = <T>(array: Nested<T>) => T[];
type ExtendElement = <D extends DOMNode, C extends CustomProps = {}>(node: D, props?: ExtendProps<D, C>) => Extended<D, C>;
type CreateHTMLElement = <T extends keyof HTMLElementTagNameMap, C extends CustomProps = {}>(tagName: T, props?: ExtendProps<HTMLElementTagNameMap[T], C>) => Extended<HTMLElementTagNameMap[T], C>;
type CreateSVGElement = <T extends keyof SVGElementTagNameMap, C extends CustomProps = {}>(tagName: T, props?: ExtendProps<SVGElementTagNameMap[T], C>) => Extended<SVGElementTagNameMap[T], C>;
type CreateMathsElement = <T extends keyof MathMLElementTagNameMap, C extends CustomProps = {}>(tagName: T, props?: ExtendProps<MathMLElementTagNameMap[T], C>) => Extended<MathMLElementTagNameMap[T], C>;
type QuerySelector = <S extends SelectorTagName, C extends CustomProps = {}>(selectors: S, props?: ExtendProps<SelectorTagNameMap[S], C>) => Extended<SelectorTagNameMap[S], C> | null;
type QuerySelectorAll = <S extends SelectorTagName, C extends CustomProps = {}>(selectors: S, props?: ExtendProps<SelectorTagNameMap[S], C>) => Extended<SelectorTagNameMap[S], C>[];
type Delay = (seconds: number) => Promise<void>;
/** @deprecated Use `wait$` instead. `waitForIt` will be removed in a future version.*/
type DeprecatedWaitForIt = <S extends SelectorTagName>(selectors: S, timeOutSeconds?: number) => Promise<Extended<SelectorTagNameMap[S]>>;
type WaitSelector = <S extends SelectorTagName, C extends CustomProps = {}>(selectors: S, props?: ExtendProps<SelectorTagNameMap[S], C>, timeOutSeconds?: number) => Promise<Extended<SelectorTagNameMap[S], C>>;
type NewStyleSheet = (cssText: string, options?: { fromURL?: boolean = false; addToPage?: boolean = true; }) => Promise<CSSStyleSheet>;
type ObjectUtilityFunction = <Values>(object: Record<string, Values>) => ObjectUtilities<Values>;
//#endregion
//#region Global
interface Window {
    flat: Flat;
    __: ExtendElement;
    _: CreateHTMLElement;
    _svg: CreateSVGElement;
    _maths: CreateMathsElement;
    $: QuerySelector;
    $$: QuerySelectorAll;
    delay: Delay;
    /** @deprecated Use `wait$` instead. `waitForIt` will be removed in a future version.*/
    waitForIt: DeprecatedWaitForIt;
    wait$: WaitSelector;
    _css: NewStyleSheet;
    O: ObjectUtilityFunction;
    simpleDOM?: {
        flat: Flat;
        __: ExtendElement;
        _: CreateHTMLElement;
        _svg: CreateSVGElement;
        _maths: CreateMathsElement;
        $: QuerySelector;
        $$: QuerySelectorAll;
        delay: Delay;
        /** @deprecated Use `wait$` instead. `waitForIt` will be removed in a future version.*/
        waitForIt: DeprecatedWaitForIt;
        wait$: WaitSelector;
        _css: NewStyleSheet;
        O: ObjectUtilityFunction;
    };
}
declare const flat: Flat;
declare const __: ExtendElement;
declare const _: CreateHTMLElement;
declare const _svg: CreateSVGElement;
declare const _maths: CreateMathsElement;
declare const $: QuerySelector;
declare const $$: QuerySelectorAll;
declare const delay: Delay;
/** @deprecated Use `wait$` instead. `waitForIt` will be removed in a future version.*/
declare const waitForIt: DeprecatedWaitForIt;
declare const wait$: WaitSelector;
declare const _css: NewStyleSheet;
declare const O: ObjectUtilityFunction;
//#endregion

//#region Overrides
type BaseQuerySelector = <S extends SelectorTagName>(selectors: S) => SelectorTagNameMap[S] | null;
type BaseQuerySelectorAll = <S extends SelectorTagName>(selectors: S) => NodeListOf<SelectorTagNameMap[S]>;
interface Document {
    querySelector: BaseQuerySelector;
    querySelectorAll: BaseQuerySelectorAll;
}
interface ParentNode {
    querySelector: BaseQuerySelector;
    querySelectorAll: BaseQuerySelectorAll;
}

interface HTMLElement {
    querySelector: BaseQuerySelector;
    querySelectorAll: BaseQuerySelectorAll;
}

interface SVGElement {
    querySelector: BaseQuerySelector;
    querySelectorAll: BaseQuerySelectorAll;
}

interface MathMLElement {
    querySelector: BaseQuerySelector;
    querySelectorAll: BaseQuerySelectorAll;
}
//#endregion