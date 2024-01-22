/*
    Using one file for exporting the application types over the 'namespace' convention is a matter of personal choice.
*/

/**
 * Describes methods which will have to be implemented by a data structure.
 * @template T The specific type/architecture of a data structure.
 */
interface Data<T> {
    /**
     * Retrieves a single property value of a data structure.
     * @param {T} key Property of a data structure.
     * @returns {T[K]} Returns property value of a data structure.
     */
    get<K extends keyof T>(key: K): T[K]

    /**
     * Retrieves all properties of a data structure.
     * @returns Returns data structure.
     */
    get getAll(): T

    /**
     * Updates property/ies of a data structure.
     * @param {T} update Object containing updates for a data structure.
     * @returns {void} No return value.
     */
    set(update: T): void
}

/**
 * Describes methods which will have to be implemented by an eventing system.
 */
interface Eventing {
    events: { [key: string]: Callback[] }

    /**
     * Sets up an event listener.
     * @param {string} eventName Event name.
     * @param {Callback} callback Event handler.
     * @returns {void} No return value.
     */
    on(eventName: string, callback: Callback): void

    /**
     * Triggers an event.
     * @param {string} eventName Event name.
     * @returns {void} No return value.
     */
    trigger(eventName: string): void
}

/**
 * Describes methods which will have to be implemented by a synchronization system.
 * @template T The specific type/architecture of a data structure which will be synchronized.
 */
interface Sync<T> {
    /**
     * Retrieves an entry from a database. ID must be provided.
     * @param {number} id ID of the record.
     * @returns {Promise<Response>} Returns a Promise containing the response from a server.
     */
    fetch(id: number): Promise<Response>

    /**
     * Retrieves all entries from a database
     * @returns Returns a Promise containing the response from a server.
     */
    fetchAll(): Promise<Response>

    /**
     * Persists data.
     * @param {T} data Object containing data for persisting.
     * @returns Returns a Promise containing the response from a server.
     */
    save(data: T): Promise<Response>
}

/**
 * Describes an object which will optionally have an `id` property.
 */
interface HasId{
    id?: number
}

/**
 * Describes *User* model which will optionally have an `id`, `name` and/or `age` property/ies.
 */
interface UserProps extends HasId {
    name?: string;
    age?: number;
}

/**
 * Describes *User* view `name` and `age` properties which will contain data for rendering to the DOM.
 */
interface UserShowData
{
    name: string | undefined
    age: number | undefined
}

/**
 * Describes callback function.
 */
type Callback = () => void

/**
 * Describes event handler.
 */
type EventsCallback = (e: Event) => void

/**
 * Describes deserializing function for transforming data from its raw form into a form which will be stored inside the data collection.
 * @template T Form of data which will be stored inside the data collection.
 * @template K Raw data to be deserialized.
 * @template HasId Describes an object which will optionally have an *id* property.
 */
type Deserialize<T, K extends HasId> = (entry: K) => T

export { Data, Eventing, Sync, HasId, UserProps, UserShowData, Callback, EventsCallback, Deserialize }