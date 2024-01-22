import { ApiSync } from './ApiSync'
import { Attributes } from './Attributes'
import { Events } from './Events'
import { Model } from './Model'
import { UserProps } from '../types/interfaces'

/**
 * Class extending the Model class. Makes use of the static method *initialize* to reduce the verbose syntax for instantiating it.
 */
class User extends Model<UserProps> {

    /**
     * Creates a new preconfigured instance of the User class.
     * @param {UserProps} data Object with an optional id, name and age properties.
     * @param {string} syncRootUrl Link for fetching and saving data to an outside API.
     * @returns {User} Returns a new instance of the User class.
     */
    static initialize = (data: UserProps, syncRootUrl: string): User => new User(new Attributes<UserProps>(data), new Events(), new ApiSync<UserProps>(syncRootUrl))
}

export { User }