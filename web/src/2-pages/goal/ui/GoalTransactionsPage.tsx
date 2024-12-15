import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getGoalProgressData} from '@widgets/goal';
import {GoalModel} from '@entities/goal';
import {Card, Item, List, LoadingItem, LoadingWrapper, PageHeader} from '@shared/ui';
import {APP_TEXT, APP_PATH} from '@shared/constants';
import {DateService, TextHelpers, TransactionHelpers} from '@shared/lib';

export function GoalTransactionsPage() {
	const {id} = useParams();

	const {goalDetails, isGoalDetailsLoading} = GoalModel.useItemDetails({id});
	const {goalTransactions, isGoalTransactionsLoading} = GoalModel.useItemTransactions({id, filter: {pageNumber: 0}});

	const [groupedItems, setGroupedItems] = useState({});

	useEffect(() => {
		if (!goalTransactions?.length) return;
		setGroupedItems(TransactionHelpers.groupItemsByMonth(goalTransactions));
	}, [goalTransactions]);

	const isLoading = isGoalDetailsLoading || isGoalTransactionsLoading;

	const {isCompleted} = getGoalProgressData(isGoalDetailsLoading, goalDetails) || {};

	return (
		<>
			<PageHeader title={APP_TEXT.transactions} backPath={APP_PATH.goal.getItemDetailsPath(id)} />

			<div className='flex flex-col gap-6 px-4 pb-6'>
				<LoadingWrapper
					isLoading={isLoading}
					className='my-0.5 h-4 w-10'
					loadingChildren={<LoadingItem withRightName />}
				>
					{Object.entries(groupedItems).map(([month, monthTransactions], transactionGroupIndex) => (
						<Card
							key={month}
							title={TransactionHelpers.getTransactionTitle([month, monthTransactions])}
							rightTitle={
								<div className='text-sm text-primary-grey'>
									{TransactionHelpers.getMonthTotal(monthTransactions) > 0}
									{goalDetails &&
										TextHelpers.getAmountWithCurrency(
											TransactionHelpers.getMonthTotal(monthTransactions),
											goalDetails.balance.currency,
										)}
								</div>
							}
						>
							<List
								isLoading={isLoading}
								rows={monthTransactions as any[]}
								renderRow={(row: any, index) => (
									<Item
										image={TransactionHelpers.getTransactionIcon(
											row,
											isCompleted && transactionGroupIndex === 0 && index === 0,
										)}
										name={TransactionHelpers.getTransactionName(row)}
										description={row.date && new DateService(new Date(row.date)).getLocalDateString()}
										// TODO: написал 10 дек в финансы чат, row && itemDetails - должно быть только row
										rightName={
											goalDetails &&
											TransactionHelpers.getTransactionRightName(
												row.type,
												(row.amount ?? row.fromGoalAmount) as number,
												goalDetails.balance.currency,
											)
										}
									/>
								)}
							/>
						</Card>
					))}
				</LoadingWrapper>
			</div>
		</>
	);
}
