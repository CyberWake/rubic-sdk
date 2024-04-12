import { CacheConfig } from "./models/cache-config";
type DecoratorSignature = <T>(_: Object, __: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
/**
 * Decorator, used to cache calculated result of functions.
 */
export declare function Cache(cacheConfigOrTarget: CacheConfig): DecoratorSignature;
export declare function Cache<T>(cacheConfigOrTarget: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void;
/**
 * Decorated function should return {@link ConditionalResult}.
 * You have to check types by yourself {@see https://github.com/microsoft/TypeScript/issues/4881}
 */
export declare function PConditionalCache<T>(_: Object, __: string | symbol, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void;
export {};
