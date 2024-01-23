import { Model } from '../models'
import { WARNS, HasId, EventsCallback } from '../types'

/*
    The idea:
      1. A view class must produce HTML
      2. We should be able to nest one view's HTML inside of the other
      3. Should be able to reach inside the HTML of a view to get a specific element
      4. Eventing system should exist in order to synchronize different parts of a view's HTML
      5. Probably will have to have tight coupling with a Model class
      6. Extraction approach with composition or inheritance
*/

/**
 * Abstract view class intended to represent a blueprint for building view classes - components - which will render HTML to the DOM.
 * @template T Type of a complete model.
 * @template Model Model model type.
 * @template K The specific type/architecture of a data structure.
 * @template HasId Describes an object which will optionally have an *id* property.
 */
abstract class View<T extends Model<K>, K extends HasId> {
    /**
     * Abstract method which will have to be implemented by the view class - component - in order to render HTML to the DOM.
     * @returns {string} Returns document fragment in form of a string.
     */
    protected abstract template(): string

    /**
     * Asigns the parent inside the DOM in which the model will be rendered and the model for rendering. Sets the component for re-rendering when the 'change' event gets triggered.
     * @param {Element} parent HTML element which will contain model.
     * @param {T} model Model for rendering.
     * @returns {View} Returns a new instance of the class extending the View class.
     */
    constructor(
        private parent: Element,
        protected model: T
    ) 
    {
        this.bindModelEvents()
    }

    /**
     * Registers 'change' event listener on the component for its re-rendering.
     * @returns {void} No return value.
     */
    private bindModelEvents = (): void =>
    {
        this.model.on('change', (): void => void this.render())
    }

    /**
     * Optionaly registers an event map, which will later be parsed, elements found inside the DOM and proper event listeners attached to them. Not abstract, since implementing this method will be optional.
     * @returns {Object} Returns object containing event names and selectors as keys and event handlers as values.
     */
    protected eventsMap = (): { [key: string]: EventsCallback } => ({})

    /**
     * Loops through the events map, parses it, finds the elements inside the DOM and assigns according event listeners to them.
     * @param {DocumentFragment} documentFragment DOM fragment coming from *template* method, in which the elements from the events map object reside.
     * @returns {void} No return value.
     */
    private bindEvents = (documentFragment: DocumentFragment): void =>
    {
        const EVENTS_MAP = this.eventsMap()

        // Verbose solution, but performance friendly - introduces less calls to the DOM

        const DOM_SELECTORS = new Set<string>()
        const DOM_NODES: { [key: string]: NodeList } = {}

        // There could be one selector occuring multiple times inside the eventsMap object - register it once so querySelectorAll could be used only neccessary amounts of time later
        for (const EVENT in EVENTS_MAP)
        {
            const [, SELECTOR] = EVENT.split(':')
            DOM_SELECTORS.add(SELECTOR)
        }

        // Use querySelectorAll once per selector inside the eventsMap object
        for (const SELECTOR of DOM_SELECTORS)
        {
            DOM_NODES[SELECTOR] = documentFragment.querySelectorAll(SELECTOR)

            if (DOM_NODES[SELECTOR].length === 0)
            {
                console.warn(WARNS.domElementNotFound)
            }
        }

        // Attach every event handler on respective selector
        for (const EVENT in EVENTS_MAP)
        {
            const [EVENT_NAME, SELECTOR] = EVENT.split(':')
            
            DOM_NODES[SELECTOR].forEach((element: Node): void => void element.addEventListener(EVENT_NAME, EVENTS_MAP[EVENT]))
        }

        // Tidier solution, but performance unfriendly
        
        // for (const EVENT in EVENTS_MAP)
        // {
        //     const [EVENT_NAME, SELECTOR] = EVENT.split(':')
        //     documentFragment
        //         .querySelectorAll(SELECTOR)
        //         .forEach((element: Element): void => void element.addEventListener(EVENT_NAME, EVENTS_MAP[EVENT]))
        // }
    }

    /**
     * Provides a way to optionally render components inside the parent component using this. Not abstract, since implementing this method will be optional.
     * @param {DocumentFragment} documentFragment DOM fragment coming from *template* method, in which the components could be nested.
     * @returns {void} No return value.
     */
    protected onRender = (documentFragment: DocumentFragment): void => {}
    
    /**
     * Clears the component's parent previous content and renders the component.
     * @returns {void} No return value.
     */
    render = (): void =>
    {
        this.parent.innerHTML = ''
        const TEMPLATE_EL = document.createElement('template')
        TEMPLATE_EL.innerHTML = this.template()
        this.bindEvents(TEMPLATE_EL.content)
        this.onRender(TEMPLATE_EL.content)
        this.parent.appendChild(TEMPLATE_EL.content)
    }
}

export { View }