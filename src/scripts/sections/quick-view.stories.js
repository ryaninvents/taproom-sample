import {storiesOf} from '@storybook/html';
import quickView from './quick-view';

storiesOf('quick-view', module)
  .add('default', () => {
    const container = document.createElement('div');
    const qv = quickView(container, {
      title: 'Vintage Timex watch',
      price: 6999,
      description: 'This is the more text. Aberant terram pendebat. Lucis adsiduis consistere erant fert. Innabilis mollia bracchia di! Opifex lumina pulsant recessit ipsa flamina rudis! Fulgura effervescere levitate primaque inminet ad habendum super humanas. Sponte os sponte tanto frigore quanto nec fratrum! Quarum ultima diffundi terra aethera valles caecoque.',
      imageSrc: '/watch.jpg',
      defaultIsOpen: true,
    });
    const story = document.createElement('div');
    story.innerHTML = `
    <button style="cursor:pointer;">Quick View</button>
    `;
    story.querySelector('button').addEventListener('click', () => {
      qv.open();
    });
    story.appendChild(container);
    return story;
  });
