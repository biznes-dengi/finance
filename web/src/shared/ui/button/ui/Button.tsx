import {ReactElement, ReactNode} from 'react';
import {NavigateFunction, useNavigate} from 'react-router-dom';

import {cn, styleElement} from '@shared/lib';

export enum ButtonType {
	main,
	text,
	icon,
}

export interface CommonButtonSettings {
	icon?: ReactElement;
	type?: ButtonType;
	onClick: ({navigate}: {navigate: NavigateFunction}) => void;
}
interface Props extends CommonButtonSettings {
	children?: ReactNode;
	className?: string;
	disabled?: boolean;
}

// TODO: Typescript: when type = icon -> icon prop required

export function Button(props: Props) {
	const {children, className, onClick, type = ButtonType.text, icon, disabled} = props;

	const navigate = useNavigate();

	const buttonProps = {
		onClick: disabled ? undefined : () => onClick({navigate}),
		disabled,
	};

	function gcn(...buttonClassName: Array<unknown>) {
		return cn('block', disabled ? 'cursor-not-allowed' : 'cursor-pointer', ...buttonClassName, className);
	}

	if (type === ButtonType.main) {
		return (
			<button
				{...buttonProps}
				className={gcn(
					'block w-full rounded-2xl py-2 text-center text-white',
					!disabled ? 'bg-primary-violet shadow-md shadow-primary-blue' : 'bg-secondary-grey',
				)}
			>
				{children}
			</button>
		);
	}

	if (type === ButtonType.text) {
		// svg-path size = 12x12
		return (
			<button {...buttonProps} className={gcn('text-sm font-medium text-primary-violet', icon && 'flex items-center')}>
				{icon && styleElement(icon, 'mr-2 size-4')}
				{children}
			</button>
		);
	}

	if (type === ButtonType.icon) {
		return (
			<button {...buttonProps} className={gcn('flex flex-col items-center text-primary-violet')}>
				{icon && (
					<div className='size-10 flex items-center justify-center rounded-full bg-secondary-violet'>
						{styleElement(icon, icon.type === 'img' ? 'size-5' : 'size-6')}
					</div>
				)}
				{children && <div className='mt-1'>{children}</div>}
			</button>
		);
	}
}
