import { useEffect } from 'react';
import './App.css';
import Quote from './components/Quote';
import { animIsLoadingEffect, getNewQuoteData } from './features/quoteSlice/quoteSlice';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
    useEffect(() => {
      let timer = setTimeout(() => {
        dispatch(animIsLoadingEffect())
        dispatch(getNewQuoteData());
      }, 2000);
      return () => {
        clearTimeout(timer)
      }
    }, []);
    
    const {quoteText,quoteAuthor, isLoading, playAnim} = useSelector(state => state.quote)
  return (
    <div className="App">
      <div className='main-container'>
        <Quote quoteText={quoteText} quoteAuthor={quoteAuthor} isLoading={isLoading} playAnim={playAnim}/>
      </div>
    </div>
  );
}

export default App;
