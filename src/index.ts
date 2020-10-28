import { PornHubSearch } from './PornHubSearch';

export { Page } from './Page';
export { PornHubSearch } from './PornHubSearch';
export { PornHubUser } from './PornHubUser';
export { PornHubVideo } from './PornHubVideo';
export { IRatingInfo } from './IRatingInfo';

export function search(search: string, page: number = 1) {
  return new PornHubSearch(`https://www.pornhub.com/video/search?search=${search}&page=${page}`);
}