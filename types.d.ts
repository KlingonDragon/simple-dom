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
    _: (...children: (DOMNode | string | undefined | null | (DOMNode | string | undefined | null)[])[]) => this;
    __: (...children: (DOMNode | string | undefined | null | (DOMNode | string | undefined | null)[])[]) => this;
    $: QuerySelector;
    $$: QuerySelectorAll;
    on: (type: string, listener: EventListenerOrEventListenerObject) => this;
    do: (type: string) => this;
}
type CustomProps = Record<string, any>;
type ExtendProps<D extends DOMNode, C extends CustomProps = {}> = { dataset?: DOMStringMap; style?: Partial<CSSStyleDeclaration>; classList?: (string | undefined)[]; attributeList?: Record<string, string>; customProps?: C; } & Partial<Omit<D, 'dataset' | 'style' | 'classList'>>;
//#endregion

//#region Functions
type ExtendElement = <D extends DOMNode, C extends CustomProps = {}>(node: D, props?: ExtendProps<D, C>) => Extended<D, C>;
type CreateHTMLElement = <T extends keyof HTMLElementTagNameMap, C extends CustomProps = {}>(tagName: T, props?: ExtendProps<HTMLElementTagNameMap[T], C>) => Extended<HTMLElementTagNameMap[T], C>;
type CreateSVGElement = <T extends keyof SVGElementTagNameMap, C extends CustomProps = {}>(tagName: T, props?: ExtendProps<SVGElementTagNameMap[T], C>) => Extended<SVGElementTagNameMap[T], C>;
type CreateMathsElement = <T extends keyof MathMLElementTagNameMap, C extends CustomProps = {}>(tagName: T, props?: ExtendProps<MathMLElementTagNameMap[T], C>) => Extended<MathMLElementTagNameMap[T], C>;
type QuerySelector = <S extends SelectorTagName, C extends CustomProps = {}>(selectors: S, props?: ExtendProps<MathMLElementTagNameMap[T], C>) => Extended<SelectorTagNameMap[S], C> | null;
type QuerySelectorAll = <S extends SelectorTagName, C extends CustomProps = {}>(selectors: S, props?: ExtendProps<MathMLElementTagNameMap[T], C>) => Extended<SelectorTagNameMap[S], C>[];
type Delay = (seconds: number) => Promise<void>;
type WaitForIt = <S extends SelectorTagName>(selectors: S, timeOutSeconds?: number) => Promise<Extended<NonNullable<SelectorTagNameMap[S]>>>;
//#endregion
//#region Global
interface Window {
    __: ExtendElement;
    _: CreateHTMLElement;
    _svg: CreateSVGElement;
    _maths: CreateMathsElement;
    $: QuerySelector;
    $$: QuerySelectorAll;
    delay: Delay;
    waitForIt: WaitForIt;
}
declare const __: ExtendElement;
declare const _: CreateHTMLElement;
declare const _svg: CreateSVGElement;
declare const _maths: CreateMathsElement;
declare const $: QuerySelector;
declare const $$: QuerySelectorAll;
declare const delay: Delay;
declare const waitForIt: WaitForIt;
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