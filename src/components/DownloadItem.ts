
export default class DownloadItem {
    version: string;
    download_url: DownloadItemMirror[];
    constructor(version: string = "", download_url: DownloadItemMirror[]) {
        this.version = version;
        this.download_url = download_url;
    }
}

export enum DownloadItemType {rootfs,live_cd}

export class DownloadItemMirror {
    download_type: DownloadItemType;
    page: string;
    url: string;
    disabled: boolean;
    constructor(type: DownloadItemType = DownloadItemType.live_cd, page:string = "", url: string = "" , disabled: boolean = false) {
        this.download_type = type;
        this.page = page;
        this.url = url;
        this.disabled = disabled;
    }
}