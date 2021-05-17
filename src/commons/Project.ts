export default class Project {
    UID!: string;
    name!: string;

    setUID(uid: string): void {
        if (uid) this.UID = uid;
    }

    setName(name: string = ""): void {
        if (name) this.name = name;
    }

    getUID(): string {
        return this.UID || "";
    }

    getName(): string {
        return this.name || "";
    }
}