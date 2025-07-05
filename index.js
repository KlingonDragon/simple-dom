const // Ignore ts(6200) - .d.ts declaration vs .js implementation
    /** @type {ExtendElement} */
    __ = (node, { dataset, style, classList, attributeList, customProps, ...props } = {}) => {
        if (dataset) { Object.assign(node.dataset, dataset); }
        if (style) { Object.assign(node.style, style); }
        if (classList) { node.classList.add(...classList.filter(item => item !== undefined && item !== null)); }
        if (attributeList) { Object.entries(attributeList).forEach(([attribute, value]) => value ? node.setAttribute(attribute, value) : node.removeAttribute(attribute)); }
        const extendedNode = Object.assign(node, customProps, props, {
            /** @type {ExtendMethods["_"]} */
            _: (...children) => { node.append(...children.flat().filter(child => child !== undefined && child !== null)); return extendedNode; },
            /** @type {ExtendMethods["__"]} */
            __: (...children) => { node.replaceChildren(...children.flat().filter(child => child !== undefined && child !== null)); return extendedNode; },
            /** @type {ExtendMethods["$"]} */
            $: (selectors, props = {}) => { const x = extendedNode.querySelector(selectors); return x && __(x, props); }, // Ignore ts(2719) - TS C vs C mismatch
            /** @type {ExtendMethods["$$"]} */
            $$: (selectors, props = {}) => [...extendedNode.querySelectorAll(selectors)].map(x => __(x, props)), // Ignore ts(2719) - TS C vs C mismatch
            /** @type {ExtendMethods["on"]} */
            on: (type, listener) => { node.addEventListener(type, listener); return extendedNode; },
            /** @type {ExtendMethods["do"]} */
            do: (type) => { node.dispatchEvent(new Event(type)); return extendedNode; },
        });
        return extendedNode;
    },
    /** @type {CreateHTMLElement} */
    _ = (tagName, props = {}) => __(document.createElement(tagName), props),
    /** @type {CreateSVGElement} */
    _svg = (tagName, props = {}) => __(document.createElementNS('http://www.w3.org/2000/svg', tagName), props),
    /** @type {CreateMathsElement} */
    _maths = (tagName, props = {}) => __(document.createElementNS('http://www.w3.org/1998/Math/MathML', tagName), props),
    /** @type {QuerySelector} */
    $ = (selectors, props = {}) => { const x = document.querySelector(selectors); return x && __(x, props); },
    /** @type {QuerySelectorAll} */
    $$ = (selectors, props = {}) => [...document.querySelectorAll(selectors)].map(x => __(x, props)),
    /** @type {Delay} */
    delay = (seconds) => new Promise((resolve) => setTimeout(resolve, seconds * 1e3)),
    /** @type {WaitSelector} */
    wait$ = (selectors, props = {}, timeOutSeconds) => new Promise((resolve, reject) => {
        const testElement = $(selectors, props);
        if (testElement) { resolve(testElement); return; }
        const observer = new MutationObserver((_, observer) => {
            const testElement = $(selectors, props);
            if (testElement) { observer.disconnect(); resolve(testElement); }
        });
        observer.observe(document.documentElement, { characterData: false, attributes: false, childList: true, subtree: true });
        timeOutSeconds && delay(timeOutSeconds).then(() => { observer.disconnect(); reject(); });
    }),
    /** @type {DeprecatedWaitForIt} */
    waitForIt = (selectors, timeOutSeconds) => wait$(selectors, undefined, timeOutSeconds),
    /** @type {NewStyleSheet} */
    _css = (cssTextOrURL, { fromURL = false, addToPage = true } = {}) => (fromURL ? fetch(cssTextOrURL).then(r => r.text()) : Promise.resolve(cssTextOrURL)).then(cssText => {
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(cssText);
        addToPage && document.adoptedStyleSheets.push(sheet);
        return sheet;
    }),
    /** @type {ObjectUtilityFunction} */
    O = (obj) => {
        const entries = Object.entries(obj);
        return ({
            entries: entries,
            keys: Object.keys(obj),
            values: Object.values(obj),
            forEach: callbackfn => entries.forEach(callbackfn),
            map: callbackfn => entries.map(callbackfn),
            reduce: (callbackfn, initialValue) => entries.reduce(callbackfn, initialValue),
            filter: callbackfn => entries.filter(callbackfn),
        });
    };
Object.assign(window, { __, _, _svg, _maths, $, $$, delay, waitForIt, wait$, _css, O });
