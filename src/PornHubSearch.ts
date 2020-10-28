import { Page } from './Page';
import { PornHubVideo } from './PornHubVideo';

export class PornHubSearch extends Page {
  async getVideoResults() {
    let dom = await this._fetchDOM();
    if (dom === null) throw new Error(`failed to fetch DOM for ${this._url}`);

    // do this with a verbose mode later
    console.log('getVideoResults', this._url);

    return Array.from(dom.window.document.querySelectorAll('ul#videoSearchResult li.pcVideoListItem span.title > a') as NodeListOf<HTMLAnchorElement>)
      .map(anchor => {

        // do this with a verbose mode later
        console.log('getVideoResults::subURL', anchor.href);

        return new PornHubVideo(anchor.href)
      });
  }



  async getNextPage() {
    let dom = await this._fetchDOM();
    if (dom === null) throw new Error(`failed to fetch DOM for ${this._url}`);

    // do this with a verbose mode later
    console.log('getNextPage', this._url);

    let nextPageButton = dom.window.document.querySelector('div.pagination3 li.page_next > a') as HTMLAnchorElement|null;

    console.log(nextPageButton);

    if (nextPageButton) return new PornHubSearch(nextPageButton.href);
    else return null;
  }
}