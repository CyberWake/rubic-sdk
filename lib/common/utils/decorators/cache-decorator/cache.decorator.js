"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PConditionalCache = exports.Cache = void 0;
const errors_1 = require("../../../errors");
function generateKey(...args) {
    return args.reduce((acc, arg) => (Object(arg) === arg ? acc + JSON.stringify(arg) : acc + String(arg)), '');
}
function saveResult(storage, key, result, maxAge) {
    const validUntilTimestamp = maxAge ? Date.now() + maxAge : Infinity;
    storage.set(key, { validUntilTimestamp, value: result });
}
function buildGetterCacheDescriptor(propertyKey, { get, enumerable }) {
    return {
        enumerable,
        get() {
            const value = get.call(this);
            Object.defineProperty(this, propertyKey, {
                enumerable,
                value
            });
            return value;
        }
    };
}
function modifyMethodCacheDescriptor(cacheConfig, descriptor) {
    const originalMethod = descriptor.value;
    const storage = new WeakMap();
    descriptor.value = function method(...args) {
        if (!storage.has(this)) {
            storage.set(this, new Map());
        }
        const instanceStore = storage.get(this);
        const key = generateKey(args);
        if (instanceStore.has(key)) {
            const cacheItem = instanceStore.get(key);
            if (cacheItem.validUntilTimestamp > Date.now()) {
                return cacheItem.value;
            }
            instanceStore.delete(key);
        }
        let result = originalMethod.apply(this, args);
        if (cacheConfig.conditionalCache) {
            if (result instanceof Promise) {
                const handledPromise = result
                    .then((resolved) => {
                    if (resolved.notSave) {
                        instanceStore.delete(key);
                    }
                    return resolved.value;
                })
                    .catch(err => {
                    instanceStore.delete(key);
                    throw err;
                });
                saveResult(instanceStore, key, handledPromise, cacheConfig.maxAge);
                return handledPromise;
            }
            result = result;
            if (result.notSave) {
                instanceStore.delete(key);
            }
            else {
                saveResult(instanceStore, key, result.value, cacheConfig.maxAge);
            }
            return result.value;
        }
        if (result instanceof Promise) {
            const handledPromise = result.catch(err => {
                instanceStore.delete(key);
                throw err;
            });
            saveResult(instanceStore, key, handledPromise, cacheConfig.maxAge);
            return handledPromise;
        }
        saveResult(instanceStore, key, result, cacheConfig.maxAge);
        return result;
    };
    return descriptor;
}
function CacheBuilder(cacheConfig) {
    return function cacheBuilder(_, propertyKey, descriptor) {
        const { get, value: originalMethod } = descriptor;
        if (get) {
            return buildGetterCacheDescriptor(propertyKey, {
                get,
                enumerable: descriptor.enumerable
            });
        }
        if (!originalMethod) {
            throw new errors_1.RubicSdkError('Descriptor value is undefined.');
        }
        return modifyMethodCacheDescriptor(cacheConfig, descriptor);
    };
}
function Cache(cacheConfigOrTarget, propertyKey, descriptor) {
    const defaultCacheConfig = {};
    // if decorator called with config as @Cache({ ... })
    if (!propertyKey) {
        return CacheBuilder(cacheConfigOrTarget);
    }
    // decorator called as @Cache
    if (!descriptor) {
        throw new errors_1.RubicSdkError('Descriptor is undefined');
    }
    return CacheBuilder(defaultCacheConfig)(cacheConfigOrTarget, propertyKey, descriptor);
}
exports.Cache = Cache;
/**
 * Decorated function should return {@link ConditionalResult}.
 * You have to check types by yourself {@see https://github.com/microsoft/TypeScript/issues/4881}
 */
function PConditionalCache(_, __, descriptor) {
    const originalMethod = descriptor.value;
    if (!originalMethod) {
        throw new errors_1.RubicSdkError('Descriptor value is undefined');
    }
    const storage = new WeakMap();
    descriptor.value = async function method(...args) {
        if (!storage.has(this)) {
            storage.set(this, new Map());
        }
        const instanceStore = storage.get(this);
        const key = generateKey(args);
        if (instanceStore.has(key)) {
            return instanceStore.get(key);
        }
        const result = await originalMethod.apply(this, args);
        if (result.notSave) {
            instanceStore.delete(key);
        }
        else {
            instanceStore.set(key, result.value);
        }
        return result.value;
    };
}
exports.PConditionalCache = PConditionalCache;
//# sourceMappingURL=cache.decorator.js.map