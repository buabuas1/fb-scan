import {IBDSModel} from '@models/facebook/IBDS.model';

export interface IBDSType {
    validateType(entity: IBDSModel): boolean;
}

export interface ICost {
    getCosts(entity: IBDSModel): any[];
}
