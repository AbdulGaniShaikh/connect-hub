import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, selectCount } from './../redux/slices/counter';
const Counter = () => {
  const counter = useSelector(selectCount);
  const dispatch = useDispatch();
  const onIncrement = () => {
    dispatch(increment());
  };

  const onDecrement = () => {
    dispatch(decrement());
  };

  return (
    <div>
      <button onClick={onIncrement}>increment</button>
      <p>{counter}</p>
      <button onClick={onDecrement}>decrement</button>
    </div>
  );
};

export default Counter;
