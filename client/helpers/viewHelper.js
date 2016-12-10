const join = (...klasses) => {
    return klasses.reduce((res, klass) => {
            return res = res.length ? `${res} ${klass}` : klass;
        }, '');
};

export { join };
