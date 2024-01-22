/**
 * Class defining arbitrary data structure and functionality.
 * @template T The specific type/architecture of a data structure.
 * @template object The object type.
 */
class Attributes<T extends object> {
    /**
     * Creates a data structure system.
     * @param {T} data Data structure.
     * @returns {Attributes} Returns a new instance of the Attributes class.
     */
    constructor(private data: T) {}

    /**
     * Gets the neccessary property of the data structure.
     * @param {string} userProp Property to be fetched of the data structure.
     * @returns Returns data stored as a property on the data structure.
     */
    get = <K extends keyof T>(userProp: K): T[K] =>
    {
        return this.data[userProp]
    }

    /**
     * Gets all the properties of the data structure.
     * @returns Returns data stored.
     */
    get getAll (): T
    {
        return this.data
    }

    /**
     * Updates the neccessary property/ies on the data structure.
     * @param {Object} update Update object for changing the data structure.
     * @returns No return value.
     */
    set = (update: T): void =>
    {
        Object.assign(this.data, update)
    }
}

export { Attributes }