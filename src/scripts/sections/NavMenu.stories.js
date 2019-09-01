/* @jsx h */
import {h, render} from 'preact';
import {storiesOf} from '@storybook/html';
import NavMenu from './NavMenu';
import './NavMenu.stories.scss';

storiesOf('NavMenu', module)
  .add('preview', () => {
    const container = document.createElement('div');
    container.className = 'NavMenu__preview';
    render(<NavMenu />, container);
    return container;
  });
