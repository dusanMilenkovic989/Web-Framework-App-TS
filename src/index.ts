import { ApiSync } from './models/ApiSync'
import { Attributes } from './models/Attributes'
import { Collection } from './models/Collection'
import { Events } from './models/Events'
import { Model } from './models/Model'
import { User } from './models/User'
import { CollectionView } from './views/CollectionView'
import { UserEdit } from './views/UserEdit'
import { UserForm } from './views/UserForm'
import { UserList } from './views/UserList'
import { UserShow } from './views/UserShow'
import { View } from './views/View'
import { WARNS, LINKS, TEMPLATES } from './types/enums'
import { Data, Eventing, Sync, HasId, UserProps, UserShowData, Callback, EventsCallback, Deserialize } from './types/interfaces'

/*
    JSDoc has been used throughout the app only to describe different Classes, functions and types.
    Its functionality of type checking is disabled inside the TS compiler configuration file.
    When enabling type checking of JSDoc, make sure that the types are correctly described.
*/

/*
    Usage examples
*/

/**
 * Example 1:
 */

// const ROOT_EL = document.querySelector('#root')

// if (ROOT_EL)
// {
//     const USER_ONE = User.initialize({ id: 1, name: 'Jonathan Doe', age: 40 }, LINKS.jsonServerUsers)
//     const USER_FORM = new UserEdit(ROOT_EL, USER_ONE)
//     USER_FORM.render()
// }
// else
// {
//     throw new Error(WARNS.rootElementNotFoud)
// }

/**
 * Example 2:
 */

// const ROOT_EL = document.querySelector('#root')

// if (ROOT_EL)
// {
//     const USERS = Collection.initializeApiCollection<User, UserProps>((data: UserProps): User => User.initialize(data, LINKS.jsonServerUsers), LINKS.jsonServerUsers)
//     USERS.on('fetch', (): void => 
//     {
//         new UserList(USERS, ROOT_EL).render()
//     })
//     USERS.fetch()
//         .then((): void => { console.log(USERS.models) })
//         .catch((e: unknown): void => 
//         {
//             if (e instanceof Error)
//             {
//                 console.warn(e.message)
//             }

//             throw new Error(WARNS.modelFetchFailed)
//         })
// }
// else
// {
//     throw new Error(WARNS.rootElementNotFoud)
// }

export { ApiSync, Attributes, Collection, Events, Model, User, CollectionView, UserEdit, UserForm, UserList, UserShow, View, WARNS, LINKS, TEMPLATES }
export type { Data, Eventing, Sync, HasId, UserProps, UserShowData, Callback, EventsCallback, Deserialize }