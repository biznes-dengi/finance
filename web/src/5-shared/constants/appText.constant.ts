export const APP_TEXT = {
	forgotPassword: 'Forgot your password?',
	dontHaveAccount: 'Don’t have an account yet?',
	pageNotFound: 'Page not found',
	goBackHome: 'Go back home',
	dontHaveAccess: 'Sorry, but you do not have access to this page',
	balance: 'Balance',
	totalBalance: 'Total balance',
	goal: 'Goal',
	goalName: 'Goal name',
	goals: 'Goals',
	create: 'Create',
	fund: 'Fund',
	transfer: 'Transfer',
	withdraw: 'Withdraw',
	continue: 'Continue',
	search: 'Search',
	amount: 'Amount',
	targetAmount: 'Target amount',
	target: 'Target',
	progress: 'Progress',
	transaction: 'Transaction',
	transactions: 'Transactions',
	seeAll: 'See all',
	createdSuccess: 'has been successfully created',
	edit: 'Edit',
	deleteGoal: 'Delete Goal',
	email: 'Email',
	password: 'Password',
	welcome: 'Welcome',
	logIn: 'Log in',
	signUp: 'Sign up',
	finansy: 'Finansy',
	createAccount: 'Create account',
} as const;

export function getEmptyText(emptyStateEntity: string) {
	return `Your ${emptyStateEntity} will appear here`;
}
