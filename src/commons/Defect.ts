export default class Defect {
    subject!: number; // numero que representa um assunto. Exemplo: 1025 - Portal Oi
    project!: string;
    hasLinkage!: boolean;
    productionReproducible!: boolean;
    developmentReproducible!: string;
    ofensorAgent!: string;
    severity!: string;
    defectSystem!: string;
    expectedDateSolutionDefect!: Date;
    releaseTarget!: string;
    alreadyBeenRejected!: boolean;
    reasonPending!: string;
    crPKEDetail!: string;
    environment!: string;
    defectToAudit!: string;
    modified!: Date;
    solutionTime!: number; // em dias
    closedInVersion!: string;
    fase!: string; // TI, TRG ...
    detectedOnTheDay!: Date;
    detectedOnEnvironment!: string;
    plannedClosingVersion!: Date;
    closedDate!: Date;
    detectedBy!: string;
    detectedOnRelease!: string;
    detectedInVersion!: string;
    estimatedFixTime!: number;
    sentTo!: string;
    status!: string;
    targetCycle!: string;
    testCaseSystem!: string;
    errorNature!: string;
    errorOrigin!: string;
    recidivismAmount!: number;
    forwardFor!: string;
    impactedCTAmount!: number;
    defectParent!: string;
    timeToResolution!: number; // em hora
    auditableDefect!: boolean;
    purgedDefect!: boolean;
    defectDescription!: string;
    devComments!: string;
    defectID!: number;
}
