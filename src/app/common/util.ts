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
