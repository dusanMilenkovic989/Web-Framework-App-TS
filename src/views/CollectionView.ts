import { Collection } from '../models/Collection'
import { HasId } from '../types/interfaces'

/**
 * Abstract view class intended to represent a blueprint for building view classes, which will render lists of models to the DOM.
 * @template T Type of a complete model.
 * @template K The specific type/architecture of a data structure.
 * @template HasId Describes an object which will optionally have an *id* property.
 */
abstract class CollectionView<T, K extends HasId> {
    /**
     * Abstract method which will have to be implemented by the view class, that renders model of a certain type to the DOM.
     * @param {Element} itemParent DOM element in which a model will be rendered, inside the DOM.
     * @param {T} model Model for rendering to the DOM.
     * @returns {void} No return value.
     */
    protected abstract renderItem(itemParent: Element, model: T): void

    /**
     * Asigns the model collection for rendering and the parent inside the DOM in which the models will be rendered.
     * @param {Collection<T, K>} collection Model collection.
     * @param {Element} parent HTML element which will contain model collection.
     * @returns {CollectionView} Returns a new instance of the class extending the CollectionView class.
     */
    constructor(
        private collection: Collection<T, K>,
        private parent: Element
    ) {}

    /**
     * Creates DOM elements hierarchy which will hold collection of models for a list view class.
     * @returns {void} No return value.
     */
    render = (): void => {
        this.parent.innerHTML = ''
        const TEMPLATE_EL = document.createElement('template')

        for (const MODEL of this.collection.models)
        {
            const ITEM_PARENT = document.createElement('div')
            this.renderItem(ITEM_PARENT, MODEL)
            TEMPLATE_EL.content.appendChild(ITEM_PARENT)
        }

        this.parent.appendChild(TEMPLATE_EL.content)
    }
}

export { CollectionView }