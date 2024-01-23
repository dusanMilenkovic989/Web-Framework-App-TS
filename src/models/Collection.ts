import { ApiSync, Events, Model } from './'
import { WARNS, Eventing, Sync, HasId, Deserialize } from '../types'

/**
 * Class representing collection of models.
 * @template T Type of a complete model.
 * @template K The specific type/architecture of a data structure.
 * @template HasId Describes an object which will optionally have an *id* property.
 */
class Collection<T, K extends HasId> {
    public models: T[] = []

    /**
     * Creates a data collection system.
     * @param {Deserialize} deserialize Function tasked with deserializing - transforming data from its raw form into a form which will be stored inside the collection. Takes raw data as its only argument.
     * @param {Events} events Object defining the eventing system.
     * @param {Sync} sync Object defining the synchronization system.
     */
    constructor(
        private deserialize: Deserialize<T, K>,
        private events: Eventing,
        private sync: Sync<K>
    ) {}

    /**
     * Registers an event listener.
     * @param {string} eventName Event name.
     * @param {Function} callback Event handler.
     * @returns {void} No return value.
     */
    on =  this.events.on

    /**
     * Triggers an event listener.
     * @param {string} eventName Event which should be triggered.
     * @returns {void} No return value.
     */
    trigger = this.events.trigger

    /**
     * Fetches previously persisted data. Triggers the 'fetch' event in case of success, or the 'error' event in case an error occured during the fetching.
     * @returns {Promise<void>} Returns an empty promise.
    */
    fetch = async (): Promise<void> => {
        const RESPONSE = await this.sync.fetchAll()

        if (RESPONSE.ok)
        {
            const DATA = await RESPONSE.json()
            DATA.forEach((entry: K) => { this.models.push(this.deserialize(entry)) })
            this.events.trigger('fetch')
        }
        else
        {
            console.warn(WARNS.modelFetchFailed)
            this.events.trigger('error')
        }
    }

    /**
     * Creates a new preconfigured instance of the Collection class.
     * @param {Deserialize} deserialize Function tasked with deserializing - transforming data from its raw form into a form which will be stored inside the collection. Takes raw data as its only argument.
     * @returns {Collection} Returns a new instance of the Collection class.
     * @template T Type of a complete model.
     * @template Model Model model type.
     * @template K The specific type/architecture of a data structure.
     * @template HasId Describes an object which will optionally have an *id* property.
     */
    static initializeApiCollection = <T extends Model<K>, K extends HasId>(deserialize: Deserialize<T, K>, syncRootUrl: string): Collection<T, K> => new Collection<T, K>(deserialize, new Events(), new ApiSync<K>(syncRootUrl))
}

export { Collection }