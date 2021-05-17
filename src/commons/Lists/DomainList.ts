import Domain from '../Domain';

export default class DomainList {
    domains: Array<Domain>;

    constructor() {
        this.domains = [];
    }

    addDomain(domain: Domain = new Domain()): void {
        if (domain instanceof Domain) this.domains.push(domain);
    }

    getDomain(name: string = ""): Array<Domain> | Domain {
        if (name) return this.domains.filter((i: Domain) => i.getName() === name);
        return this.domains;
    }
}