import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Box, Button, ButtonType, Dialog, Icon, NumericInputWithOptions, PageHeader, DatePicker} from '@shared/ui';
import {APP_PATH, APP_TEXT} from '@shared/constants';
import {savingModel} from '@entities/saving';
import {DateService, isNumber} from '@shared/lib';

export function GoalFundPage() {
	const navigate = useNavigate();

	const {fundGoal, isFundGoalPending, isFundGoalSuccess, isFundGoalError} = savingModel.useFundGoal();

	const {items} = savingModel.useItems({pageNumber: 0});
	const options = items?.map((option) => ({
		...option,
		image: <div className='h-10 w-10 rounded-full bg-primary-grey' />,
	}));
	// think about how to type activeOption
	const [activeOption, setActiveOption] = useState(options?.[0]);

	const [amount, setAmount] = useState<number | undefined>();
	const [date, setDate] = useState<Date>(new DateService().value);

	useEffect(() => {
		if (!options) return;
		setActiveOption(options[0]);
	}, [items]);

	function handleFundClick() {
		if (!activeOption?.id) return;

		const payload = {
			id: activeOption.id,
			amount: amount ?? 0,
			date: new DateService(date).getPayloadDateFormat(),
		};

		fundGoal(payload);
	}

	if (isFundGoalSuccess || isFundGoalError) {
		setTimeout(() => {
			navigate(APP_PATH.goalList);
		}, 2000);
	}

	return (
		<>
			<PageHeader title={APP_TEXT.fund} backPath={APP_PATH.root} />

			<Box className='flex-1' basePaddingX>
				<NumericInputWithOptions
					value={amount}
					onChange={setAmount}
					options={options}
					activeOption={activeOption}
					setActiveOption={setActiveOption}
				/>
				<DatePicker value={date} onChange={setDate} />
			</Box>

			<Dialog showUX={isFundGoalSuccess || isFundGoalError}>
				{isFundGoalSuccess && (
					<Box baseMarginY>
						<div className='mb-4 flex justify-center'>
							<div className='size-16 text-primary-violet'>{Icon.success}</div>
						</div>
						<div>
							Goal <span className='font-medium text-primary-violet'>{activeOption?.name} </span>
							has been funded <span className='font-medium text-primary-violet'>successfully</span>
						</div>
					</Box>
				)}
				{isFundGoalError && (
					<Box baseMarginY>
						<div className='mb-4 flex justify-center'>
							<div className='size-16 text-primary-violet'>{Icon.error}</div>
						</div>
						<div>
							Some error occur during funding{' '}
							<span className='font-medium text-primary-violet'>{activeOption?.name}</span>
						</div>
					</Box>
				)}
			</Dialog>

			<Box basePadding>
				<Button type={ButtonType.main} onClick={handleFundClick} disabled={!isNumber(amount)}>
					{isFundGoalPending ? 'Loading...' : APP_TEXT.fund}
				</Button>
			</Box>
		</>
	);
}
