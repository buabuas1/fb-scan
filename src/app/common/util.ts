const typeCache: { [label: string]: boolean} = {};
export function type<T>(label: T | ''): T {
    if (typeCache[<string>label]) {
        throw new Error(`Action type "${label}" is not unique"`);
    }

    typeCache[<string>label] = true;

    return <T>label;
}

export function execCb(callback, ...params) {
    if (callback && typeof callback === 'function') {
        if (params) {
            callback.apply(null, params);
        } else {
            callback();
        }
    }
}

export function getIdFromErrorMessage(mes: string) {
    const regex = /\d{7,20}/gmiu;
    const rs = regex.exec(mes);
    return rs[0] ? rs[0] : '';
}

export function getMessageFromError(error: any) {
    if (typeof error === 'string') {
        return error;
    }
    if (error && error.error && typeof error.error === 'string') {
        return error.error;
    }
    if (error && error.error && typeof error.error.message === 'string') {
        return error.error.message;
    }
    return '';
}
