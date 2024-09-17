import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActionCreator } from '../hooks/useActionCreators';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Login = () => {
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const { addUser } = useActionCreator();
	const navigate = useNavigate();
	const baseUrl = process.env.REACT_APP_BASE_URL;
	const token = useSelector(state => state.user.token);

	useEffect(() => {
		if (token) navigate('/homepage');
	}, [token]);

	const handleLgoin = async e => {
		e.preventDefault();
		try {
			if (!email) throw new Error('email is required');
			if (!password) throw new Error('password is required');
			setLoading(true);

			const response = await axios.post(`${baseUrl}/user/login`, { email, password });
			alert(response?.data?.message);
			const emailAddress = response?.data?.data?.email;
			const token = response?.data?.data?.token;
			addUser({ name: '', email: emailAddress, token });
			navigate('/homepage');
		} catch (error) {
			const errorMessage = error?.response?.data?.message ?? error?.message;

			alert(errorMessage);
		} finally {
			setEmail('');
			setPassword('');
			setLoading(false);
		}
	};

	return (
		<main>
			<h1>Please provide your information to login</h1>
			<form onSubmit={handleLgoin}>
				<section>
					<label>
						name: <input name='email' type='email' value={email} onChange={e => setEmail(e.target.value)} />
					</label>
				</section>
				<section>
					<label>
						name:{' '}
						<input name='password' type='password' value={password} onChange={e => setPassword(e.target.value)} />
					</label>
				</section>
				<button disabled={loading}>{loading ? 'Login...' : 'Login'}</button>
			</form>
		</main>
	);
};

export default Login;
