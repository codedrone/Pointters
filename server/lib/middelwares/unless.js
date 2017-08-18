module.exports = (middelware) => ({path}) => {
    const pathSet = new Set(path);
    return async(ctx, next) => {
        const pathRequest = ctx.path;

        if (pathSet.has(pathRequest) && next) return await next();

        await middelware(ctx, next);
    };
};
