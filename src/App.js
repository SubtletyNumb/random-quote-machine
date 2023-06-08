import { useEffect } from 'react';
import './App.css';
import Quote from './components/Quote';
import { animIsLoadingEffect, getNewQuoteData, randomizeColor } from './features/quoteSlice/quoteSlice';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const {quoteText,quoteAuthor, isLoading, playAnim, currentBgColor} = useSelector(state => state.quote)
    useEffect(() => {
      let timer = setTimeout(() => {
        dispatch(randomizeColor())
        dispatch(getNewQuoteData());
      }, 100);
      return () => {
        clearTimeout(timer)
      }
    }, []);
  return (
    <div className='App'>
      <div className={playAnim ? `main-container main-animation` : `main-container`}>
        <Quote quoteText={quoteText} quoteAuthor={quoteAuthor} isLoading={isLoading} playAnim={playAnim} bgColor={currentBgColor}/>
      </div>
    </div>
  );
}

export default App;
