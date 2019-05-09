import { isValidElement } from './isValidElement';

export const cloneElement = function (element) {
    if (isValidElement(element)) {
        return element.html;
    } else {
        return '';
    }
};