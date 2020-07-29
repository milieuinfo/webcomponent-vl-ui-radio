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
  static get KEY() {
    return {
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40,
    };
  }

  constructor() {
    super(`<slot></slot>`);
  }

  connectedCallback() {
    this._groupRadios();
    this._transmitFocus();
    this._processKeyEvents();
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

  _processKeyEvents() {
    this.addEventListener('keydown', (event) => {
      const includesArrowKey = Object.values(VlRadioGroup.KEY).includes(event.keyCode);
      if (includesArrowKey) {
        event.preventDefault();
        const radios = [...this.radios];
        const radioWithFocus = radios.find((radio) => radio == document.activeElement);
        const firstRadio = radios[0];
        const lastRadio = radios[radios.length - 1];
        switch (event.keyCode) {
          case VlRadioGroup.KEY.UP:
          case VlRadioGroup.KEY.LEFT: {
            const previousRadio = this.radios[radios.indexOf(radioWithFocus) - 1];
            (previousRadio || lastRadio).check();
            break;
          }
          case VlRadioGroup.KEY.DOWN:
          case VlRadioGroup.KEY.RIGHT: {
            const nextRadio = this.radios[radios.indexOf(radioWithFocus) + 1];
            (nextRadio || firstRadio).check();
            break;
          }
          default:
            break;
        }
      }
    });
  }
}

define('vl-radio-group', VlRadioGroup);

