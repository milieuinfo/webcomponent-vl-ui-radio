import { VlElement } from '/node_modules/vl-ui-core/vl-core.src.js';

/**
 * `vl-radio``
 * TODO
 *
 * @demo demo/vl-radio.html
 */
export class VlRadio extends VlElement(HTMLElement) {
  static get _observedAttributes() {
    return ['label', 'name','value', 'checked'];
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
    let checked;
    const parent = this.getRootNode().host;
    if (parent._checked && Array.isArray(parent._checked)) {
      const value = JSON.parse(this.value);
      if (parent._checked.indexOf(value) > -1) {
        parent._checked.splice(parent._checked.indexOf(value), 1);
      } else {
        parent._checked.push(value);
      }
      checked = parent._checked;
      parent.setAttribute('checked', JSON.stringify(checked));
    } else {
      checked = this.checked;
    }
    this.dispatchEvent(new CustomEvent('input', { detail: checked, bubbles: true, composed: true }));
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

  _checkedChangedCallback(oldValue, newValue) {
    try {
      this._checked = JSON.parse(newValue);
    } catch (error) {
      this._checked = newValue != undefined;
    }

    if (!Array.isArray(this._checked)) {
      this._inputElement.checked = this._checked;
    } else if (this._checked.indexOf(JSON.parse(this._inputElement.value)) > -1) {
      this._inputElement.checked = true;
    }
  }

  _disabledChangedCallback(oldValue, newValue) {
    this._inputElement.disabled = newValue != undefined;
  }

  _singleChangedCallback() {
    [... this._radioLabelElement.childNodes].filter(this._isTextNode).forEach(this._removeNode);
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

customElements.define('vl-radio', VlRadio);
