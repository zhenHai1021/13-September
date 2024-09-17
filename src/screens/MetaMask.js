import { useSelector } from 'react-redux';
import { useAtom } from 'jotai';
import { connectWallet, getContract } from '../util/contract';
import { accountAtom } from '../atoms/contract';
import auth from '../hooks/auth';
function MetaMask() {
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

	const handleGetVotingActive = async () => {
		if (!window.ethereum.isConnected()) return alert('please install metamask');
		const { signer } = await connectWallet();
		const contract = getContract(signer);
		const response = await contract?.registerMember('past in your own wallet');
		console.log('voting active :', response);
	};

	const handleGetMembers = async () => {
		if (!window.ethereum.isConnected()) return alert('please install metamask');
		const { signer } = await connectWallet();
		const contract = getContract(signer);
		const response = await contract?.getMembers?.();

		console.log('members :', [...response]);
	};

	const handleGetAdmin = async () => {
		if (!window.ethereum.isConnected()) return alert('please install metamask');
		const { signer } = await connectWallet();
		const contract = getContract(signer);
		const response = await contract?.admin?.();

		console.log('admin :', response);
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
							{` ${account && account?.substring(0, 15)}.......... ${
								account && account?.substring(25, account?.length)
							}`}
						</span>
					)}
				</h1>
				{token && (
					<p>
						{name} is your name and {email} is your currrent email
					</p>
				)}

				<button onClick={handleWalletConnection}>Connect Wallet</button>
				<button onClick={handleGetVotingActive}> Get Voting Active</button>
				<button onClick={handleGetMembers}> Get Members</button>
				<button onClick={handleGetAdmin}> Get Admin</button>
			</main>
		</section>
	);
}

export default auth(MetaMask);
