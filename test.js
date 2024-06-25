const regexStr = /^[a-z][a-z0-9]{3,9}[@][a-z]{2,10}[.][a-z]{2,10}$/
const anotherRegex=/^[t]$/
const testString="@"
const isValid=anotherRegex.test(testString);
console.log(isValid)