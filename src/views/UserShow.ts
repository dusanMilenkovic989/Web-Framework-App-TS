import { User } from '../models/User'
import { View } from './View'
import { TEMPLATES } from '../types/enums'
import { UserProps } from '../types/interfaces'

/**
 * Class extending the View abstract class. Defines UserShow view class - component - HTML structure.
 */
class UserShow extends View<User, UserProps> {
    /**
     * Defines UserShow component HTML structure.
     * @returns {string} Returns document fragment in form of a string.
     */
    protected template = (): string => TEMPLATES.userShow({ 
        name: this.model.get('name'),
        age: this.model.get('age') 
    })
}

export { UserShow }