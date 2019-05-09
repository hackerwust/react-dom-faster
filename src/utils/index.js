import { isReactComponent } from './isReactComponent';
import { kebabToCamel, camelToKebab, toLowerCase, toUpperCase } from './transform';
import { toMap } from './toMap';
import { escape } from './escape';
import noop from './noop';
import { cloneElement } from './cloneElement';
import { isValidElement } from './isValidElement';
import { validateValueForDomAttr, validateValueForSelfDefineAttr } from './validate';

export {
    kebabToCamel,
    camelToKebab,
    toLowerCase,
    toUpperCase,

    isReactComponent,
    toMap,
    escape,

    validateValueForDomAttr,
    validateValueForSelfDefineAttr,

    // for react runtime
    noop,
    cloneElement,
    isValidElement
}