import { Page } from './Page';
import { IRatingInfo } from './IRatingInfo';
import { PornHubUser } from './PornHubUser';

export class PornHubVideo extends Page {
  async getTitle() {
    let dom = await this._fetchDOM();

    // do this with a verbose mode later
    console.log('getVideoTitle', this._url);

    let title = (dom.window.document.querySelector('h1.title span.inlineFree') as HTMLSpanElement|null)?.textContent;

    if (!title) throw new Error('unable to find title of video');
    else return title;
  }

  

  async getIsVerified() {
    let dom = await this._fetchDOM();

    // do this with a verbose mode later
    console.log('getIsVideoVerified', this._url);

    let verificationBadge = dom.window.document.querySelector('i.isMe');

    return Boolean(verificationBadge);
  }

  

  async getRatingInfo() {
    let dom = await this._fetchDOM();

    // do this with a verbose mode later
    console.log('getRatingInfo', this._url);

    let views = (dom.window.document.querySelector('div.rating-info-container > div.views > span.count') as HTMLSpanElement|null)?.textContent?.replace(/,/g,'');
    let likes = (dom.window.document.querySelector('div.rating-info-container > div.votes-count-container > span.votesUp') as HTMLSpanElement|null)?.textContent;
    let dislikes = (dom.window.document.querySelector('div.rating-info-container > div.votes-count-container > span.votesDown') as HTMLSpanElement|null)?.textContent;
    let ratio = (dom.window.document.querySelector('div.rating-info-container > div.votes-count-container > span.percent') as HTMLSpanElement|null)?.textContent?.replace('%','');

    if (!views) throw new Error('unable to find rating information, missing views');
    if (!likes) throw new Error('unable to find rating information, missing likes');
    if (!dislikes) throw new Error('unable to find rating information, missing dislikes');
    if (!ratio) throw new Error('unable to find rating information, missing ratio');

    return {
      views: Number.parseInt(views),
      likes: Number.parseInt(likes),
      dislikes: Number.parseInt(dislikes),
      ratio: Number.parseInt(ratio)
    } as IRatingInfo;
  }



  async getCreator() {
    let dom = await this._fetchDOM();

    // do this with a verbose mode later
    console.log('getVideoCreator', this._url);

    let creatorURL = (dom.window.document.querySelector('div.video-detailed-info span.usernameBadgesWrapper > a') as HTMLAnchorElement|null)?.href;

    if (creatorURL) return new PornHubUser(creatorURL);
    else return null;
  }



  async getCreatorName() {
    let dom = await this._fetchDOM();

    // do this with a verbose mode later
    console.log('getVideoCreatorName', this._url);

    let creatorName = (dom.window.document.querySelector('div.video-detailed-info span.usernameBadgesWrapper > a') as HTMLAnchorElement|null)?.textContent;

    if (creatorName) return creatorName;
    else return null;
  }



  async getCategories() {
    let dom = await this._fetchDOM();

    // do this with a verbose mode later
    console.log('getCategories', this._url);

    let categories = (dom.window.document.querySelectorAll('div.video-detailed-info div.categoriesWrapper > a') as NodeListOf<HTMLAnchorElement>);

    return Array.from(categories).map(anchor => anchor.textContent); // new PornHubCategory(anchor.href));
  }



  async getProduction() {
    let dom = await this._fetchDOM();

    // do this with a verbose mode later
    console.log('getProduction', this._url);

    let production = dom.window.document.querySelector('div.video-detailed-info div.productionWrapper > a') as HTMLAnchorElement;

    return production.textContent;
  }



  async getTags() {
    let dom = await this._fetchDOM();

    // do this with a verbose mode later
    console.log('getTagNames', this._url);

    let tags = (dom.window.document.querySelectorAll('div.video-detailed-info div.tagsWrapper > a') as NodeListOf<HTMLAnchorElement>);

    return Array.from(tags).map(anchor => anchor.textContent);
  }



  async getComments() {
    let dom = await this._fetchDOM();
   
    // do this with a verbose mode later
    console.log('getComments', this._url);

    let comments = (dom.window.document.querySelectorAll('div.topCommentBlock div.commentMessage > span') as NodeListOf<HTMLSpanElement>);

    return Array.from(comments).map(span => span.textContent);
  }
}