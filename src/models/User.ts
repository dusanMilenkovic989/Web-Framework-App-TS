import { ApiSync, Attributes, Events, Model } from './'
import { UserProps } from '../types'

/**
 * Class extending the Model class. Makes use of the static method *initialize* to reduce the verbose syntax for instantiating it.
 */
class User extends Model<UserProps> {

    /**
     * Creates a new preconfigured instance of the User class.
     * @template UserProps Describes *User* model which will optionally have an `id`, `name` and/or `age` property/ies.
     * @param {UserProps} data Object with an optional id, name and age properties.
     * @param {string} syncRootUrl Link for fetching and saving data to an outside API.
     * @returns {User} Returns a new instance of the User class.
     */
    static initialize = (data: UserProps, syncRootUrl: string): User => new User(new Attributes<UserProps>(data), new Events(), new ApiSync<UserProps>(syncRootUrl))
}

export { User }