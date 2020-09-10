import {vlElement, define} from '/node_modules/vl-ui-core/dist/vl-core.js';
import '/src/vl-radio-all.js';

export class VlRadioTest extends vlElement(HTMLElement) {
  constructor() {
    super(`
      <style>
          @import '/src/style.css';
      </style>

      <vl-radio id="radio-1" data-vl-label="Ja" data-vl-value="yes" data-vl-name="group-0"></vl-radio>
      <vl-radio id="radio-2" data-vl-label="Nee" data-vl-value="no" data-vl-name="group-0"></vl-radio>
    `);
  }
}

define('vl-radio-test', VlRadioTest);
