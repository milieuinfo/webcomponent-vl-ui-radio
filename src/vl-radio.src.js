import {VlElement, define} from '/node_modules/vl-ui-core/vl-core.js';

/**
 * VlRadio
 * @class
 * @classdesc De radio laat de gebruiker toe om een enkele optie te selecteren
 *            uit een lijst. Gebruik de radio in formulieren. Vermijd een
 *            voorgedefinieerde keuze vast te leggen om de gebruiker een bewuste
 *            keuze te laten maken.
 *
 * @extends VlElement
 *
 * @property {boolean} block - Attribuut wordt gebruikt om ervoor te zorgen dat de radio getoond wordt als een block element en bijgevolg de breedte van de parent zal aannemen.
 * @property {boolean} error - Attribuut wordt gebruikt om aan te duiden dat de radio verplicht is.
 * @property {boolean} disabled - Attribuut wordt gebruikt om te voorkomen dat de gebruiker de radio kan selecteren.
 * @property {boolean} single - Attribuut wordt gebruikt om alleen een radio te tonen zonder label.
 * @property {boolean} name - Attribuut wordt gebruikt om verschillende sibling radio's dezelfde name te geven, met als gevolg dat er maar 1 in die groep kan geselecteerd worden.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-radio/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-radio/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-radio.html|Demo}
 */
export class VlRadio extends VlElement(HTMLElement) {
  static get _observedAttributes() {
    return ['label', 'name', 'value', 'checked'];
  }

  static get _observedChildClassAttributes() {
    return ['block', 'single', 'disabled', 'error'];
  }

  constructor() {
    super(`
            <style>
                @import '../style.css';
            </style>
            
            <label class="vl-radio" for="radio">
              <input class="vl-radio__toggle" type="radio" id="radio" name="radio" value="1"/>
              <div class="vl-radio__label">
                <span id="label-text"></span>
              </div>
            </label>
        `);
  }

  connectedCallback() {
    this._inputElement.onchange = this._toggle;
  }

  get _classPrefix() {
    return 'vl-radio--';
  }

  get _inputElement() {
    return this._element.querySelector('input');
  }

  get _labelText() {
    return this._element.querySelector('#label-text');
  }

  toggle() {
    this._inputElement.click();
  }

  _toggle() {
    const parent = this.getRootNode().host;
    let radiosMetDezelfdeName = parent.parentElement.querySelectorAll(
        'vl-radio[name=' + this.name + ']');
    // @formatter:off
    Array.from(radiosMetDezelfdeName)
         .filter(f => f !== parent)
         .filter(radio => radio.checked)
         .forEach(radio => radio.checked = false);
    // @formatter:on
  }

  _labelChangedCallback(oldValue, newValue) {
    this._labelText.textContent = newValue;
  }

  _valueChangedCallback(oldValue, newValue) {
    this._inputElement.value = newValue;
  }

  _nameChangedCallback(oldValue, newValue) {
    this._inputElement.name = newValue;
  }

  get checked() {
    return this._inputElement.checked;
  }

  set checked(value) {
    return this._inputElement.checked = value;
  }

  _checkedChangedCallback(oldValue, newValue) {
    this._inputElement.checked = newValue != null;
  }

  _disabledChangedCallback(oldValue, newValue) {
    this._inputElement.disabled = newValue != null;
  }

  _singleChangedCallback(oldValue, newValue) {
    if (newValue != null) {
      this._labelText.classList.add('vl-u-visually-hidden');
    } else {
      this._labelText.classList.remove('vl-u-visually-hidden');
    }
  }
}

define('vl-radio', VlRadio);
