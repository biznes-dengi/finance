import {PageNotFound} from '../ui/PageNotFound.tsx';

import {APP_PATH} from '@shared/constants';
import {withRouteGuard} from '@shared/lib';

export const pageNotFoundRoute = {
	path: APP_PATH.pageNotFound,
	element: withRouteGuard({page: <PageNotFound />}),
};
