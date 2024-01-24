import { User } from '../models'
import { View } from './View'
import { TEMPLATES, UserProps, EventsCallback } from '../types'

/**
 * Class extending the View abstract class. 
 * 
 * Defines UserForm view class - component - HTML and eventing structure. 
 */
class UserForm extends View<User, UserProps> {
    /**
     * Defines UserForm component HTML structure.
     * @returns {string} Returns document fragment in form of a string.
     */
    protected template = (): string => TEMPLATES.userForm

    /**
     * Registers an event map, which will later be parsed, elements found inside the DOM and proper event listeners attached to them.
     * @template EventsCallback Describes event handler.
     * @returns {Object} Returns object containing event names and selectors as keys and event handlers as values.
     */
    protected eventsMap = (): { [key: string]: EventsCallback } =>
        ({
            'submit:form': this.onFormSubmit,
            'click:.set-age': this.onSetAge,
            'click:.save-user': this.onSaveUser
        })

    /**
     * Form element form submit event handler.
     * @param {Event} e Form submit event.
     * @returns {void} No return value.
     */
    private onFormSubmit = (e: Event): void =>
    {
        e.preventDefault()
        const TARGET = e.target as HTMLFormElement
        const USER_NAME_INPUT = TARGET.elements.namedItem('user-name') as HTMLInputElement | null
        const NEW_USER_NAME = USER_NAME_INPUT?.value.trim()
        
        if (NEW_USER_NAME && NEW_USER_NAME.length > 0)
        {
            this.model.set({ name: NEW_USER_NAME })
        }
    }

    /**
     * Class *.set-age* button click event hanler.
     * @returns {void} No return value.
     */
    private onSetAge = (): void =>
    {
        const RANDOM_AGE = Math.round(Math.random() * 100)
        this.model.set({ age: RANDOM_AGE })
    }

    /**
     * Class *.save-user* button click event hanler.
     * @returns {void} No return value.
     */
    private onSaveUser = (): void => {
        try
        {
            this.model.save()
        }
        catch (e)
        {
            console.warn(e)
        }
    }
}

export { UserForm }