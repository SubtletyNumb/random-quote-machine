import '../style-sheets/Quote.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faL, faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import { faTumblrSquare } from '@fortawesome/free-brands-svg-icons';
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { getNewQuoteData, randomizeColor } from '../features/quoteSlice/quoteSlice';
import { useDispatch } from 'react-redux';
import { animIsLoadingEffect } from '../features/quoteSlice/quoteSlice';
import { useEffect } from 'react';

const Quote = ({quoteText,quoteAuthor, isLoading, playAnim, bgColor}) => {
const dispatch = useDispatch();

return (  
  <div id='quote-box' className={playAnim ? `quote-box animation` : `quote-box`}>
  <div className='quote-text-author'>
  <p id='text' className='quote-text'><i><FontAwesomeIcon icon={faQuoteLeft} size='sm'/></i>{quoteText}<i ><FontAwesomeIcon icon={faQuoteRight} size='sm'/></i></p>
  <p id='author' className='quote-author'>- {quoteAuthor}</p>
</div>
  <div className='quote-footer'>
    <div className='icons'>
  <a id='tweet-quote' href='https://twitter.com/intent/twitter.com/intent/tweet' className='link' target='_blank'><i><FontAwesomeIcon icon={faTwitterSquare}/></i></a>
  <a id='tumblr-quote' href='#' className='link'><i><FontAwesomeIcon icon={faTumblrSquare}/></i></a>
    </div>
    {playAnim ?  <button id='new-quote' className='evenless'>next quote</button> : <button id='new-quote' onClick={() => {
      dispatch(randomizeColor())
      dispatch(animIsLoadingEffect())
      console.log(bgColor)
      document.documentElement.style.setProperty('--anim-bg-clr', bgColor)
      document.documentElement.style.setProperty('--anim-main-bg-clr', bgColor)
      let timer = setTimeout(() => {
        dispatch(getNewQuoteData())
        document.documentElement.style.setProperty('--quote-box-bg-clr', bgColor)
        document.documentElement.style.setProperty('--bg-clr', bgColor)
      }, 500);
      return () => clearTimeout(timer);
      }}>next quote</button>}
  </div>
</div>
)
}

export default Quote;