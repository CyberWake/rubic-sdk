/**
 * Decorator for classes, which allows to implement static methods through interface.
 */
export declare function staticImplements<T>(): <U extends T>(constructor: U) => U;
