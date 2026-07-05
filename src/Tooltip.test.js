/**
 * @jest-environment jsdom
 */

import { Tooltip } from './Tooltip';

describe('`class Tooltip`', () => {
  test('`constructor()`', () => {
    var tooltip = new Tooltip('Text content.');

    // stores text content
    expect(tooltip.textContent).toBe('Text content.');

    var tooltip = new Tooltip('Multi-line\ntext\rcontent\r\n...');

    // converts all newline characters to "\r\n"
    expect(tooltip.textContent).toBe('Multi-line\r\ntext\r\ncontent\r\n...');
  });

  test('`set textContent()`', () => {
    var tooltip = new Tooltip();

    tooltip.textContent = 'asdf qwer';
    expect(tooltip.textContent).toBe('asdf qwer');

    tooltip.textContent = 'Line #1\nLine #2\rLine #3\r\nLine #4\n\r\r\nLine #7';

    // converts all newline characters to "\r\n"
    expect(tooltip.textContent).toBe('Line #1\r\nLine #2\r\nLine #3\r\nLine #4\r\n\r\n\r\nLine #7');
  });
});
