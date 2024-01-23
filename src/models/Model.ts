import { WARNS, Data, Eventing, Sync, HasId } from '../types'

// The idea:
// **** The Extraction approach ****
//   1. Create a Custom model which will have functionality of initializing data, getting and setting it, fetching and saving it and setting and triggering events which should notify other parts of the app
//   2. Use Composition approach:
//        - at high level to make it reusable - to work with different styles of data structure, eventing and persisting systems and to delegate main functionality to composing classes
//        - at low level to reduce the verbose syntax, introduce own functionality and delegate
//   3. Extract the Custom model to its own class and make the Model - composable/inheritable by custom models

/**
 * Class delegating its functionality and composed of editable three different classes that specify a way to store, get and set data, set and trigger events related to that data, and a way to persist and fetch data.
 * @template T The specific type/architecture of a data structure.
 * @template HasId Describes an object which will optionally have an *id* property.
 */
class Model<T extends HasId> {
    /**
     * Asigns the data structure, eventing and synchronization system.
     * @param {Data} attributes Object defining the data structure.
     * @param {Eventing} events Object defining the eventing system.
     * @param {Sync} sync Object defining the synchronization system.
     * @returns {Model} Returns a new instance of the Model class.
     */
    constructor(
        private attributes: Data<T>, 
        private events: Eventing,
        private sync: Sync<T>
    ) {}

    /**
     * Access data stored.
     * @param {string} property Specific part of the data stored.
     * @returns Returns desired part of the data stored.
     */
    get get()
    {
        return this.attributes.get
    }

    /**
     * Set new data and trigger 'change' event.
     * @param {T} update Update object representing new data.
     * @returns {void} No return value.
     */
    set = (update: T): void =>
    {
        this.attributes.set(update)
        this.events.trigger('change')
    }

    /**
     * Registers an event listener.
     * @param {string} eventName Event name.
     * @param {Function} callback Event handler.
     * @returns {void} No return value.
     */
    get on()
    {
        return this.events.on
    }

    /**
     * Triggers an event listener.
     * @param {string} eventName Event which should be triggered.
     * @returns {void} No return value.
     */
    get trigger()
    {
        return this.events.trigger
    }

    /**
     * Fetches previously persisted data. Triggers the 'fetch' event in case of success, or the 'error' event in case the 'id' was not present as part of the Model data, or if an error occured during the fetching.
     * @returns {Promise<Response | void>} Returns a promise containing a response or nothing, in case the 'id' property was not present as part of the Model data.
    */
    fetch = async (): Promise<Response | void> =>
    {
        const ID = this.attributes.get('id')

        if (typeof ID !== 'number')
        {
            console.warn(WARNS.modelIdNotFound)
            this.events.trigger('error')

            return
        }
        
        const RESPONSE = await this.sync.fetch(ID)

        if (RESPONSE.ok)
        {
            this.set(await RESPONSE.json())
            this.events.trigger('fetch')
        }
        else
        {
            console.warn(WARNS.modelFetchFailed)
            this.events.trigger('error')
        }

        return RESPONSE
    }

    /**
     * Fetches previously persisted data for all models of a type. Triggers the 'fetch' event in case of success, or the 'error' event in case an error occured during the fetching.
     * @returns {Promise<Response>} Returns a promise containing a response.
    */
    fetchAll = async (): Promise<Response> =>
    {
        const RESPONSE = await this.sync.fetchAll()

        if (RESPONSE.ok)
        {
            this.events.trigger('fetch')
        }
        else
        {
            console.warn(WARNS.modelFetchFailed)
            this.events.trigger('error')
        }

        return RESPONSE
    }

    /**
     * Persists data. Triggers the 'save' event in case of success, or the 'error' event in case an error occured during saving.
     * @returns {Promise<Response>} Returns a promise containing a response.
     */
    save = async (): Promise<Response> =>
    {
        const RESPONSE = await this.sync.save(this.attributes.getAll)

        if (RESPONSE.ok)
        {
            this.events.trigger('save')
        }
        else
        {
            console.warn(WARNS.modelSaveFailed)
            this.events.trigger('error')
        }

        return RESPONSE
    }
}

export { Model }