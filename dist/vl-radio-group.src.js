import {vlElement, define} from 'vl-ui-core';

/**
 * VlRadioGroup
 * @class
 * @classdesc De radio group bundelt verschillende radio elementen die samenhoren.
 *
 * @extends HTMLElement
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-radio/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-radio/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-radio-group.html|Demo}
 */
export class VlRadioGroup extends vlElement(HTMLElement) {
  constructor() {
    super(`
      <slot></slot>
    `);
  }

  connectedCallback() {
    this.radios.forEach((radio) => {
      radio.setAttribute('data-vl-name', 'radio');
    });
  }

  get radios() {
    return this.querySelectorAll('vl-radio');
  }
}

define('vl-radio-group', VlRadioGroup);

