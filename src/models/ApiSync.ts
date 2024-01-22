import { HasId } from '../types/interfaces'

/**
 * Class defining an arbitrary persisting system which relies upon using an outside API.
 * @template T The specific type/architecture of a data structure.
 * @template HasId Describes an object which will optionally have an *id* property.
 */
class ApiSync<T extends HasId> {
    /**
     * Creates an outside API persisting system.
     * @param {string} url URL on which the requests for fetching and saving data should be performed.
     * @returns Returns a new instance of the ApiSync class.
     */
    constructor(public url: string) {}

    /**
     * Fetches persisted data for a single entry.
     * @param {number} id An id of the record which contains the data neccessary.
     * @returns {Promise<Response>} Returns a Promise containing the response from a server.
     */
    fetch = async (id: number): Promise<Response> => fetch(`${this.url}/${id}`)

    /**
     * Fetches persisted data for all entries.
     * @returns {Promise<Response>} Returns a Promise containing the response from a server.
     */
    fetchAll = async (): Promise<Response> => fetch(this.url)

    /**
     * Persists data.
     * @param {T} data An object containing the data to be persisted.
     * @returns {Promise<Response>} Returns a Promise containing the response from a server.
     */
    save = async (data: T): Promise<Response> =>
    {
        const ID = data.id
        const LINK = ID ? `${this.url}/${ID}` : this.url

        return fetch(LINK, {
            method: ID ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
    }
}

export { ApiSync }