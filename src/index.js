module.exports = {
    data: {
        engine: require('./data/engine.json'),
        ground: require('./data/ground.json'),
        input: require('./data/input.json')
    },
    structs: {
        block: require('./structs/block'),
        ground: require('./structs/ground')
    },
    input: {
        utils: {
            keyMapper: require('./input/utils/key-mapper').default,
            keyStore: require('./input/utils/key-store').default
        }
    },
    engine: require('./engine').default
}