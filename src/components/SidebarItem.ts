export default class SidebarItem<T> {
    title: string;
    sections: SidebarSection[];
    info: ExtraInfo<T>
    constructor(title: string = "", sections: SidebarSection[] = [], info: ExtraInfo<T> = new ExtraInfo<T>()) {
        this.title = title;
        this.sections = sections;
        this.info = info;
    }
}

export class SidebarSection {
    title: string;
    subsection: string;
    constructor(title: string = "", subsection: string = "") {
        this.title = title;
        this.subsection = subsection;
    }
}

interface AsyncPromiseFunction<T> {
    (): Promise<T>;
}
export class ExtraInfo<T> {
    callback: AsyncPromiseFunction<T>;
    constructor(callback: AsyncPromiseFunction<T> = () => { return new Promise<T>(() => { }); }) {
        this.callback = callback;
    }
}