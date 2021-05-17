import Defect from '../Defect';

export default class DefectList {
    defects: Array<Defect>;

    constructor() {
        this.defects = [];
    }

    addDefect(defect: Defect = new Defect()): void {
        if (defect instanceof Defect) this.defects.push(defect);
    }
}