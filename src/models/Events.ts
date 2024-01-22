import { WARNS } from '../types/enums'
import { Callback } from '../types/interfaces'

/**
 * Class defining an arbitrary (most likely even general) eventing system.
 */
class Events {
    events: { [key: string]: Callback[] } = {}

    /**
     * Registers an event.
     * @param {string} eventName Event name.
     * @param {Function} callback Callback to be triggered when an event occurs.
     * @returns {void} No return value.
     */
    on = (eventName: string, callback: Callback): void =>
    {
        const HANDLERS = this.events[eventName] || []
        HANDLERS.push(callback)
        this.events[eventName] = HANDLERS
    }

    /**
     * Triggers an event.
     * @param {string} eventName Name of the event which is to be triggered.
     * @returns {void} No return value.
     */
    trigger = (eventName: string): void =>
    {
        const HANDLERS = this.events[eventName]

        !HANDLERS || HANDLERS.length === 0 ? 
            console.info(WARNS.handlerNotFound) : 
            HANDLERS.forEach((handler: Callback): void => handler())
    }
}

export { Events }