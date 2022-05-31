// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// I was getting an Error: Not implemented: window.scrollTo when I ran my tests.
// I figured it was because the window actually exist when the tests are run.
// Did some googling and this came up as the only solution that worked: https://qiita.com/akameco/items/0edfdae02507204b24c8
const noop = () => {};
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });