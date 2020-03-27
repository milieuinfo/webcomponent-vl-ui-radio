import { VlElement, define } from '/node_modules/vl-ui-core/dist/vl-core.js';

/**
 * VlRadioGroup
 * @class
 * @classdesc De radio group bundelt verschillende radio elementen die samenhoren.
 *
 * @extends VlElement
 * 
 * @property {boolean} data-vl-name - Attribuut wordt gebruikt om verschillende sibling radio's te groeperen zodat er maar één in die groep geselecteerd kan worden.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-radio/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-radio/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-radio-group.html|Demo}
 */
export class VlRadioGroup extends VlElement(HTMLElement) {
  static get _observedAttributes() {
    return ['name'];
  }

  get radios() {
    return this.querySelectorAll('vl-radio');
  }

  _nameChangedCallback(oldValue, newValue) {
    this.radios.forEach((radio) => {
      radio.setAttribute('data-vl-name', newValue);
    });
  }
}

define('vl-radio-group', VlRadioGroup);
