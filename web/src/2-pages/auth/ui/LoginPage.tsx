import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AuthLayout} from './AuthLayout.tsx';
import {Button, ButtonType, PageHeader, TextField} from '@shared/ui';
import {APP_PATH, APP_TEXT} from '@shared/constants';
import {authModel} from '@entities/auth';
import {cn} from '@shared/lib';

export function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();

	const {login, isLoginPending} = authModel.useLogin();

	const [disabledBoxShadow, setDisabledBoxShadow] = useState(false);

	useEffect(() => {
		document.title = 'Log in | Finansy';

		return () => {
			document.title = 'Finansy';
		};
	}, []);

	useEffect(() => {
		function handleKeyUp(event: KeyboardEvent) {
			if (event.key === 'Enter') {
				handleLogin();
			}
		}

		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === 'Enter') {
				setDisabledBoxShadow(true);
			}
		}

		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('keyup', handleKeyUp);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('keyup', handleKeyUp);
		};
	}, [email, password]);

	function handleLogin() {
		const payload = {
			email,
			password,
		};

		login(payload);
	}

	return (
		<AuthLayout>
			<div className='px-4'>
				<PageHeader title={APP_TEXT.welcome} withBackButton={false} />

				<div className='flex w-[350px] flex-col gap-4'>
					<TextField type='email' value={email} onChange={setEmail} placeholder={APP_TEXT.username} isAutoFocus />
					<TextField type='password' value={password} onChange={setPassword} placeholder={APP_TEXT.password} />

					<Button
						className='w-fit text-left font-light'
						onClick={() => alert('Пока не можем помочь. Вспоминай, а то не войдешь 😁')}
					>
						{APP_TEXT.forgotPassword}
					</Button>
				</div>

				<div className='my-6 flex flex-col items-center gap-4'>
					<Button
						type={ButtonType.main}
						onClick={handleLogin}
						disabled={!email || !password}
						className={cn(disabledBoxShadow && 'shadow-none')}
						isLoading={isLoginPending}
					>
						{APP_TEXT.logIn}
					</Button>
					<Button onClick={() => navigate(APP_PATH.signUp)} isFetching={isLoginPending}>
						{APP_TEXT.signUp}
					</Button>
				</div>
			</div>
		</AuthLayout>
	);
}
