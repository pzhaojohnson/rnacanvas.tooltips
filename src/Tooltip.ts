import * as styles from './Tooltip.module.css';

import { Box } from '@rnacanvas/boxes';

export class Tooltip {
  readonly #domNode = document.createElement('div');

  readonly #text = document.createElement('p');

  readonly #triangle = document.createElement('div');

  #padding = 5;

  #owner: Element | undefined;

  #mouseOverListener = () => {};
  #mouseOutListener = () => {};

  constructor(textContent: string) {
    this.#domNode.classList.add(styles['tooltip']);

    this.#text.classList.add(styles['text']);
    this.#text.textContent = textContent;
    this.#domNode.append(this.#text);

    this.#triangle.classList.add(styles['triangle']);
    this.#domNode.append(this.#triangle);
  }

  get textContent() {
    return this.#text.textContent;
  }

  set textContent(textContent) {
    this.#text.textContent = textContent;
  }

  get owner() {
    return this.#owner;
  }

  set owner(owner) {
    if (this.#owner) {
      this.#owner.removeEventListener('mouseover', this.#mouseOverListener);
      this.#owner.removeEventListener('mouseout', this.#mouseOutListener);
    }

    this.#owner = owner;

    if (owner) {
      owner.addEventListener('mouseover', () => this.#show());
      owner.addEventListener('mouseout', () => this.#hide());
    }
  }

  #show() {
    this.#domNode.style.left = '0px';
    this.#domNode.style.top = '0px';

    document.body.append(this.#domNode);

    if (!this.#owner) {
      return; // nothing else to do
    }

    let width = this.#domNode.getBoundingClientRect().width;

    let textHeight = this.#text.getBoundingClientRect().height;

    // must divide by 2 due to the border "trick" used to render the triangle
    let triangleHeight = this.#triangle.getBoundingClientRect().height / 2;

    let height = textHeight + triangleHeight;

    let ownerBBox = Box.matching(this.#owner.getBoundingClientRect());

    let paddedBBox = ownerBBox.padded(this.#padding);

    this.#domNode.style.left = `${paddedBBox.peripheralPoint(3 * Math.PI / 2).x - (width / 2)}px`;
    this.#domNode.style.top = `${paddedBBox.peripheralPoint(3 * Math.PI / 2).y - height}px`;
  }

  #hide() {
    this.#domNode.remove();
  }
}
