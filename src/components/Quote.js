import '../style-sheets/Quote.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faL, faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import { faTumblrSquare } from '@fortawesome/free-brands-svg-icons';
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { getNewQuoteData } from '../features/quoteSlice/quoteSlice';
import { useDispatch, useSelector } from 'react-redux';
import { animIsLoadingEffect } from '../features/quoteSlice/quoteSlice';

const Quote = ({quoteText,quoteAuthor, isLoading, playAnim}) => {
  
  const animPossibleColors = {
    0: 'yellow',
    1: 'red',
    2: 'aqua',
    3: 'lightcoral',
    4: 'lemonchiffon'
  }
  let color = '';
  const randomizeColor = (colors) => {
      color = colors[Math.floor(Math.random() * Object.keys(animPossibleColors).length)];
      document.documentElement.style.setProperty('--anim-bg-clr', color);
  }
  const setBackgroundColor = () => {
    console.log('setting background color...')
    document.documentElement.style.setProperty('--quote-box-bg-clr', color);
    console.log(color)
  }

const dispatch = useDispatch();
if(isLoading){
  return(
    <div id='quote-box' className='quote-box'>
        <div className='quote-text-author'>
        <p id='text' className='quote-text'><i><FontAwesomeIcon icon={faQuoteLeft} size='sm'/></i>{quoteText}<i ><FontAwesomeIcon icon={faQuoteRight} size='sm'/></i></p>
        <p id='author' className='quote-author'>- {quoteAuthor}</p>
      </div>
        <div className='quote-footer'>
          <div className='icons'>
        <a id='tweet-quote' href='https://twitter.com/intent/twitter.com/intent/tweet' className='link' target='_blank'><i><FontAwesomeIcon icon={faTwitterSquare}/></i></a>
        <a id='tumblr-quote' href='#' className='link'><i><FontAwesomeIcon icon={faTumblrSquare}/></i></a>
          </div>
          <button id='new-quote'>next quote</button>
        </div>
      </div>
  )
}
if(playAnim){
  return(
    <div id='quote-box' className='quote-box animation'>
        <div className='quote-text-author'>
        <p id='text' className='quote-text'><i><FontAwesomeIcon icon={faQuoteLeft} size='sm'/></i>{quoteText}<i ><FontAwesomeIcon icon={faQuoteRight} size='sm'/></i></p>
        <p id='author' className='quote-author'>- {quoteAuthor}</p>
      </div>
        <div className='quote-footer'>
          <div className='icons'>
        <a id='tweet-quote' href='https://twitter.com/intent/twitter.com/intent/tweet' className='link' target='_blank'><i><FontAwesomeIcon icon={faTwitterSquare}/></i></a>
        <a id='tumblr-quote' href='#' className='link'><i><FontAwesomeIcon icon={faTumblrSquare}/></i></a>
          </div>
          <button id='new-quote'>next quote</button>
        </div>
      </div>
  )
}
return(
  <div id='quote-box' className='quote-box'>
      <div className='quote-text-author'>
      <p id='text' className='quote-text'><i><FontAwesomeIcon icon={faQuoteLeft} size='sm'/></i>{quoteText}<i ><FontAwesomeIcon icon={faQuoteRight} size='sm'/></i></p>
      <p id='author' className='quote-author'>- {quoteAuthor}</p>
    </div>
      <div className='quote-footer'>
        <div className='icons'>
      <a id='tweet-quote' href='https://twitter.com/intent/twitter.com/intent/tweet' className='link' target='_blank'><i><FontAwesomeIcon icon={faTwitterSquare}/></i></a>
      <a id='tumblr-quote' href='#' className='link'><i><FontAwesomeIcon icon={faTumblrSquare}/></i></a>
        </div>
        <button id='new-quote' onClick={() => {
          randomizeColor(animPossibleColors);
          dispatch(animIsLoadingEffect())
          let timer = setTimeout(() => {
            setBackgroundColor();
            dispatch(getNewQuoteData())
          }, 2000);
          return () => clearTimeout(timer);
          }}>next quote</button>
      </div>
    </div>
)
}

export default Quote;