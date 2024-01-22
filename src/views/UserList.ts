import { User } from '../models/User'
import { CollectionView } from './CollectionView'
import { UserShow } from './UserShow'
import { UserProps } from '../types/interfaces'

/**
 * Class extending the CollectionView abstract class. Defines that the UserShow view class - component - will be used to render a User model to the DOM.
 */
class UserList extends CollectionView<User, UserProps> {
    /**
     * Renders User model inside an HTML element.
     * @param {Element} itemParent HTML element parent of the User model.
     * @param {User} model User model.
     * @returns {void} No return value.
     */
    renderItem = (itemParent: Element, model: User): void => void new UserShow(itemParent, model).render()
}

export { UserList }