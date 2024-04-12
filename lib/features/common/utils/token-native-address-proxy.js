"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTokenNativeAddressProxyInPathStartAndEnd = exports.createTokenNativeAddressProxy = void 0;
const errors_1 = require("../../../common/errors");
function createTokenNativeAddressProxy(token, wrappedNativeAddress, useLowerCase = true) {
    const wethAbleAddress = token.isNative ? wrappedNativeAddress : token.address;
    return new Proxy(token, {
        get: (target, key) => {
            if (!(key in target)) {
                return undefined;
            }
            if (key === 'address') {
                return useLowerCase ? wethAbleAddress.toLowerCase() : wethAbleAddress;
            }
            return target[key];
        }
    });
}
exports.createTokenNativeAddressProxy = createTokenNativeAddressProxy;
function createTokenNativeAddressProxyInPathStartAndEnd(path, wrappedNativeAddress) {
    if (!path?.[0]) {
        throw new errors_1.RubicSdkError('Path cannot be empty');
    }
    const token = path[path.length - 1];
    if (!token) {
        throw new errors_1.RubicSdkError("Path's tokens has to be defined");
    }
    return [createTokenNativeAddressProxy(path[0], wrappedNativeAddress)]
        .concat(path.slice(1, path.length - 1))
        .concat(createTokenNativeAddressProxy(token, wrappedNativeAddress));
}
exports.createTokenNativeAddressProxyInPathStartAndEnd = createTokenNativeAddressProxyInPathStartAndEnd;
//# sourceMappingURL=token-native-address-proxy.js.map