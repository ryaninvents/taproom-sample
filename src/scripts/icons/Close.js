/* @jsx h */
import {h} from 'preact';

export default function Close({...props}) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="icon" viewBox="0 2 20 20" style={{transform: 'translateY(-2px)'}} {...props}><path d="M15.89 14.696l-4.734-4.734 4.717-4.717c.4-.4.37-1.085-.03-1.485s-1.085-.43-1.485-.03L9.641 8.447 4.97 3.776c-.4-.4-1.085-.37-1.485.03s-.43 1.085-.03 1.485l4.671 4.671-4.688 4.688c-.4.4-.37 1.085.03 1.485s1.085.43 1.485.03l4.688-4.687 4.734 4.734c.4.4 1.085.37 1.485-.03s.43-1.085.03-1.485z"/></svg>);
}
