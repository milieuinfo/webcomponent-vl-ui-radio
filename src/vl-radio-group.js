import {vlElement, define} from '/node_modules/vl-ui-core/dist/vl-core.js';

/**
 * VlRadioGroup
 * @class
 * @classdesc De radio group bundelt verschillende radio elementen die samenhoren.
 *
 * @extends HTMLElement
 * @mixes vlElement
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
    this._groupRadios();
    this._transmitFocus();
  }

  get radios() {
    return this.querySelectorAll('vl-radio');
  }

  _groupRadios() {
    this.radios.forEach((radio) => radio.setAttribute('data-vl-name', 'radio'));
  }

  _transmitFocus() {
    this.tabIndex = 0;
    this.addEventListener('focus', () => {
      this.addEventListener('keyup', (event) => {
        if (event.shiftKey) {
          this.radios[this.radios.length - 1].focus();
        }
      }, {once: true});
      this.radios[0].focus();
    });
    this.radios.forEach((radio) => radio.addEventListener('focus', () => this.tabIndex = -1));
    this.radios.forEach((radio) => radio.addEventListener('blur', () => this.tabIndex = 0));
  }
}

define('vl-radio-group', VlRadioGroup);
