/**
 * Class defining arbitrary data structure and functionality.
 * @template T The specific type/architecture of a data structure.
 * @template object The object type.
 */
class Attributes<T extends object> {
    /**
     * Creates a data structure system.
     * @template T The specific type/architecture of a data structure which the Attributes class will be connected with.
     * @param {T} data Data structure.
     * @returns {Attributes} Returns a new instance of the Attributes class.
     */
    constructor(private data: T) {}

    /**
     * Gets the neccessary property of the data structure.
     * @template K Property of the `T` object.
     * @template T The specific type/architecture of a data structure which the Attributes class will be connected with.
     * @param {string} userProp Property to be fetched of the data structure.
     * @returns {T[K]} Returns data stored as a property on the data structure.
     */
    get = <K extends keyof T>(userProp: K): T[K] =>
    {
        return this.data[userProp]
    }

    /**
     * Gets all the properties of the data structure.
     * @template T The specific type/architecture of a data structure which the Attributes class will be connected with.
     * @returns {T} Returns data stored.
     */
    get getAll (): T
    {
        return this.data
    }

    /**
     * Updates the neccessary property/ies on the data structure.
     * @template T The specific type/architecture of a data structure which the Attributes class will be connected with.
     * @param {T} update Update object for changing the data structure.
     * @returns {void} No return value.
     */
    set = (update: T): void =>
    {
        Object.assign(this.data, update)
    }
}

export { Attributes }