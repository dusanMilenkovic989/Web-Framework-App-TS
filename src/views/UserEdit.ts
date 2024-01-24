import { User } from '../models'
import { UserForm, UserShow } from './'
import { View } from './View'
import { WARNS, UserProps } from '../types'

/**
 * Class extending the View abstract class. 
 * 
 * Defines UserEdit view class - component - HTML and nesting components structure.
 */
class UserEdit extends View<User, UserProps> {
    /**
     * Defines UserEdit component HTML structure.
     * @returns {string} Returns document fragment in form of a string.
     */
    protected template = (): string =>
    `
        <div>
            <div class="user-show"></div>
            <div class="user-form"></div>
        <div>
    `

    /**
     * Defines rendering structure of nested components. 
     * 
     * At this stage there is no need for adding simillar functionality to eventsMap and bindEvents - creating map object and binding it inside the View (super) class, because there is direct reference to the documentFragment from the View class.
     * @param {DocumentFragment} documentFragment DOM fragment coming from *template* method.
     * @returns {void} No return value.
     */
    protected onRender = (documentFragment: DocumentFragment): void =>
    {
        const USER_SHOW_EL = documentFragment.querySelector('.user-show')
        const USER_FORM_EL = documentFragment.querySelector('.user-form')

        if (USER_SHOW_EL && USER_FORM_EL)
        {
            new UserShow(USER_SHOW_EL, this.model).render()
            new UserForm(USER_FORM_EL, this.model).render()
        }
        else{
            console.warn(WARNS.domElementNotFound)
        }
    }
}

export { UserEdit }