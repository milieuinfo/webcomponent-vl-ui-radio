import {vlElement, define} from '/node_modules/vl-ui-core/dist/vl-core.js';

/**
 * Gebruik de radio group mixin om logica toe te voegen aan een group van radio elementen.
 * @mixin vlRadioGroup
 */
export const vlRadioGroup = {
  /**
   * Zet het key events registered attribuut.
   */
  setKeyEventsRegistered() {
    const parent = this._parentElement();
    parent.setAttribute('data-vl-key-events-registered', '');
  },

  /**
   * Geeft terug of de key events reeds geregistreerd zijn.
   * @return {boolean}
   */
  hasKeyEventsRegistered() {
    const parent = this._parentElement();
    return parent.hasAttribute('data-vl-key-events-registered');
  },

  /**
   * Zet het focus transmit attribuut.
   */
  setFocusTransmitted() {
    const parent = this._parentElement();
    parent.setAttribute('data-vl-focus-transmitted', '');
  },

  /**
   * Geeft terug of de focus transmit reeds gebeurd is.
   * @return {boolean}
   */
  hasFocusTransmitted() {
    const parent = this._parentElement();
    return parent.hasAttribute('data-vl-focus-transmitted');
  },

  /**
   * Activeer keydown event listener om het navigeren over radio group elementen toe te laten.
   *
   * @param {Object[]} radios - Een Array van radio HTMLElement
   */
  registerKeyEvents(radios) {
    if (!this.hasKeyEventsRegistered()) {
      const keys = {
        left: 37,
        up: 38,
        right: 39,
        down: 40,
      };
      const parent = this._parentElement();
      parent.addEventListener('keydown', (event) => {
        const includesArrowKey = Object.values(keys).includes(event.keyCode);
        if (includesArrowKey) {
          event.preventDefault();
          const focusedRadio = radios.find((radio) => radio.hasFocus);
          const firstRadio = radios[0];
          const lastRadio = radios[radios.length - 1];
          switch (event.keyCode) {
            case keys.up:
            case keys.left: {
              const previousRadio = radios[radios.indexOf(focusedRadio) - 1];
              (previousRadio || lastRadio).check();
              break;
            }
            case keys.down:
            case keys.right: {
              const nextRadio = radios[radios.indexOf(focusedRadio) + 1];
              (nextRadio || firstRadio).check();
              break;
            }
            default:
              break;
          }
        }
      });
    }
    this.setKeyEventsRegistered();
  },

  /**
   * Delegeert de focus correct door naar de radio child elementen.
   *
   * @param {Object[]} radios - Een Array van radio HTMLElement
   */
  transmitFocus(radios) {
    if (!this.hasFocusTransmitted()) {
      const parent = this._parentElement();
      parent.addEventListener('focus', () => {
        parent.addEventListener('keyup', (event) => {
          if (event.shiftKey) {
            const checkedRadio = enabledRadios.find((radio) => radio.checked);
            const latestRadio = enabledRadios[enabledRadios.length - 1];
            (checkedRadio || latestRadio).focus();
          }
        }, {once: true});
        const enabledRadios = radios.filter((radio) => !radio.disabled);
        const checkedRadio = enabledRadios.find((radio) => radio.checked);
        const firstRadio = enabledRadios[0];
        if (checkedRadio || firstRadio) {
          (checkedRadio || firstRadio).focus();
        }
      });
    }
    this.setFocusTransmitted();
  },

  _parentElement() {
    return this.parentElement || this.getRootNode().host;
  },
};

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
    super(`<slot></slot>`);
    Object.assign(this, vlRadioGroup);
  }

  connectedCallback() {
    this._groupRadios();
    this._processTabIndex();
  }

  get radios() {
    return [...this.querySelectorAll('vl-radio')];
  }

  _groupRadios() {
    this.radios.forEach((radio) => radio.setAttribute('data-vl-name', 'radio'));
  }

  _processTabIndex() {
    this.tabIndex = 0;
    this.radios.forEach((radio) => radio.addEventListener('focus', () => this.tabIndex = -1));
    this.radios.forEach((radio) => radio.addEventListener('blur', () => this.tabIndex = 0));
  }
}

define('vl-radio-group', VlRadioGroup);
