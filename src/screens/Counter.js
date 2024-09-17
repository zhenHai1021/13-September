import { useContext } from 'react';
import { useActionCreator } from '../hooks/useActionCreators';
import { useSelector } from 'react-redux';
import { UserContext } from '../context/UserContext';
import auth from '../hooks/auth';

const Counter = () => {
	const count = useSelector(state => state.counter.count);
	const { increaseCount, decreaseCount } = useActionCreator();
	const { state, dispatch } = useContext(UserContext);

	return (
		<main>
			<h1>Counter</h1>
			{count}
			<button onClick={() => increaseCount()}>Increase Count</button>
			<button onClick={() => decreaseCount()}>Decrease Count</button>
			<section>
				<p>{state.name}</p>
				<p>{state.email}</p>
			</section>
			<button
				onClick={() =>
					dispatch({ type: 'add-user', payload: { name: 'Nwafor', email: 'thaddydore@maildrop.com' } })
				}
			>
				update state manually
			</button>
		</main>
	);
};

export default auth(Counter);
