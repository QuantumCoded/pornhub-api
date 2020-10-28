import { JSDOM } from 'jsdom';

export class Page {
  protected _jsdom?: JSDOM|null;
  protected _errored?: boolean = false;

  constructor(protected _url: string) {};

  async _fetchDOM() {
    if (this._errored) {
      console.warn(this._url);
      throw new Error('the DOM for a page in an errored state has been requested');
    }

    if (this._jsdom) return this._jsdom;
    else return this._jsdom = await JSDOM.fromURL(this._url)
      .catch(err => {
        console.warn(`a fatal error has occured with JSDOM in _fetchDOM for url ${this._url}`);
        this._errored = true;
        throw err;
      });
    ;
  }

  get url() {
    return this._url;
  }
}