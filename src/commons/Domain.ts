export default class Domain {
    name!: string;

    setName(name: string = ""): void {
        if (name) this.name = name;
    }

    getName(): string {
        return this.name || "";
    }
}