export default class WikiInfo {
    title: string;
    url: string;
    toc: string[];
    constructor(title: string = "", url: string = "", toc: string[] = []) {
        this.title = title;
        this.url = url;
        this.toc = toc;
    }

}