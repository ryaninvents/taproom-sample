import {storiesOf} from '@storybook/html';
import './quick-view';

storiesOf('quick-view', module)
  .add('default', () => `
    <div class="quick-view__scrim">
      <div class="quick-view">
        <img class="quick-view__product-img" src="/watch.jpg">
        <div class="quick-view__info">
          <h2>Vintage Timex watch</h2>
          <hr>
          <div class="quick-view__price">$69.99</div>
          <p>
            This is the more text. Aberant terram pendebat. Lucis adsiduis consistere erant fert. Innabilis mollia bracchia di! Opifex lumina pulsant recessit ipsa flamina rudis! Fulgura effervescere levitate primaque inminet ad habendum super humanas. Sponte os sponte tanto frigore quanto nec fratrum! Quarum ultima diffundi terra aethera valles caecoque.
          </p>
          <hr>
        </div>
      </div>
    </div>
  `);

