export interface IBDSType {
    validateType(entity: IBDSModel): boolean;
}

export interface ICost {
    getCosts(entity: IBDSModel): any[];
}
