/* @jsx h */
import {h} from 'preact';

export default function Cart({...props}) {
  return (
    <svg width={20} height={20} viewBox="0 -2 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M22 6.8C22.24 6.8 22.48 6.88 22.64 7.12C22.8 7.28 22.8 7.6 22.8 7.84L20.72 15.44C20.4 16.48 19.44 17.2 18.4 17.2H9.60001C8.56001 17.2 7.60001 16.48 7.36001 15.52L3.92001 3.92C3.84001 3.68 3.68001 3.6 3.52001 3.6H2.00001C1.52001 3.6 1.20001 3.28 1.20001 2.8C1.20001 2.32 1.52001 2 2.00001 2H3.52001C4.40001 2 5.20001 2.56 5.44001 3.44L6.40001 6.8H22ZM11.1316 19.2688C11.7564 19.8937 11.7564 20.9067 11.1316 21.5316C10.5068 22.1564 9.49369 22.1564 8.86881 21.5316C8.24401 20.9068 8.24401 19.8936 8.86881 19.2688C9.49369 18.644 10.5068 18.644 11.1317 19.2688H11.1316ZM19.1316 19.2688C19.7564 19.8937 19.7564 20.9067 19.1316 21.5316C18.5068 22.1564 17.4937 22.1564 16.8688 21.5316C16.244 20.9068 16.244 19.8936 16.8688 19.2688C17.4937 18.644 18.5068 18.644 19.1317 19.2688H19.1316Z" fill="currentColor"/>
    </svg>
  );
}