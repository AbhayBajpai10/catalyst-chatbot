export function checker(str) {
    return /^(\*)(\*)|(.*)\*$/.test(str)
}
export function rmstar(str) {
    return str.replace(/^(\*)(\*)|(\*)\*$/g,``)
}