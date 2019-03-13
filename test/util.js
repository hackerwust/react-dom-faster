export default function makeMockProps (obj, defaultValue) {
    const target = {};
    for (const key in obj) {
        target[key] = defaultValue;
    }
    return target;
}