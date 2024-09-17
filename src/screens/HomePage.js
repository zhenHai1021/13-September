import { useSelector } from 'react-redux';
import { useAtom } from 'jotai';
import { connectWallet } from '../util/contract';
import { accountAtom } from '../atoms/contract';
import auth from '../hooks/auth';

function HomePage() {
	const { name, email, token } = useSelector(state => state.user);
	const [account, setAccount] = useAtom(accountAtom);

	const handleWalletConnection = async () => {
		try {
			const { account } = await connectWallet();

			setAccount(account);
		} catch (error) {
			console.error(error?.message);
		}
	};

	window?.ethereum?.on('accountsChanged', accounts => {
		const account = accounts?.length > 0 ? accounts[0] : '';
		setAccount(account);
	});

	return (
		<section className='App'>
			<main>
				<h1>
					Welcome To the Homepage{' '}
					{account && (
						<span>
							connected accounts{' '}
							{` ${account?.substring(0, 15)}.......... ${account?.substring(25, account?.length)}`}
						</span>
					)}
				</h1>
				{token && (
					<p>
						{name} is your name and {email} is your currrent email
					</p>
				)}

				<button onClick={handleWalletConnection}>Connect Wallet</button>
			</main>
		</section>
	);
}

export default auth(HomePage);
