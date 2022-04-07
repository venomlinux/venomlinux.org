
export default class FeedItemClass {
    date: string;
    publisher: string;
    title: string;
    announcement: string[];
    constructor(date: string = "", publisher: string = "", title: string = "", announcements: string[] = ["", "", ""]) {
        this.date = date;
        this.publisher = publisher;
        this.title = title;
        this.announcement = announcements;
    }
}
