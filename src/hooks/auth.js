import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const auth = Component => {
	const Auth = props => {
		const token = useSelector(state => state.user.token);
		const navigate = useNavigate();

		useEffect(() => {
			if (!token) navigate('/login');
		}, [token]);

		return <Component {...props} />;
	};

	return Auth;
};

export default auth;
