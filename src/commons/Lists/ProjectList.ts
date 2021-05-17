import Project from '../Project';

export default class ProjectList {
    projects: Array<Project>;

    constructor() {
        this.projects = [];
    }

    addProject(project: Project = new Project()): void {
        if (project instanceof Project) this.projects.push(project);
    }

    getProjectByName(name: string = ""): Array<Project> | Project {
        if (name) return this.projects.filter((i: Project) => i.getName() === name);
        return this.projects;
    }

    getProjectByUID(uid: string = ""): Array<Project> | Project {
        if (uid) return this.projects.filter((i: Project) => i.getUID() === uid);
        return this.projects;
    }
}