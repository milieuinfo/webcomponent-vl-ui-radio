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
 * @property {boolean} name - Attribuut wordt gebruikt om te koppelen met andere radio's door dezelfde name te kiezen met de VlRadio als siblings, zodat maar 1 kan geselecteerd worden.
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
              <div class="vl-radio__label"></div>
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

  get _radioLabelElement() {
    return this._element.querySelector('.vl-radio__label');
  }

  toggle() {
    this._inputElement.click();
  }

  _toggle() {
    const parent = this.getRootNode().host;
    Array.from(parent.parentElement.querySelectorAll(
        'vl-radio[name=' + this.name + ']')).filter(f => f !== parent).filter(
        radio => radio.checked).forEach(
        radio => radio.checked = false);
  }

  _labelChangedCallback(oldValue, newValue) {
    this._label = newValue;
    this._radioLabelElement.append(this._label);
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
    this._inputElement.checked = newValue !== 'false';
  }

  _disabledChangedCallback(oldValue, newValue) {
    this._inputElement.disabled = newValue != null;
  }

  _singleChangedCallback() {
    [...this._radioLabelElement.childNodes].filter(this._isTextNode).forEach(
        this._removeNode);
    const span = document.createElement('span');
    span.classList.add('vl-u-visually-hidden');
    span.textContent = this._label;
    this._radioLabelElement.appendChild(span);
  }

  _isTextNode(node) {
    return node.nodeType === 3;
  }

  _removeNode(node) {
    node.remove();
  }
}

define('vl-radio', VlRadio);
