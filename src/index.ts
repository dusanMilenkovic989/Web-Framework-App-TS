import { ApiSync, Attributes, Collection, Events, Model, User } from './models'
import { UserEdit, UserForm, UserList, UserShow } from './views'
import { CollectionView } from './views/CollectionView'
import { View } from './views/View'
import { WARNS, LINKS, TEMPLATES, Data, Eventing, Sync, HasId, UserProps, UserShowData, Callback, EventsCallback, Deserialize } from './types'

/*
    Purpose of this application is to present the manner in which TypeScript should be used to access its full potential while developing an application, and as a playground.

    This app is using barrel modules. 
    Be aware that barrel modules could cause unwanted effects:
      - Some testing frameworks (Jest) might take longer time to run tests when parsing barrel modules. Barrel modules intentionally obfuscate file location and testing frameworks could have to load every export inside it to find its target
      - Barrel modules could be affecting JS file size significantly in larger-scale projects, which could affect website's user experience
      - Continuous integration stages times could be affected by a large percent
      - Bundlers might encounter issues when TypeScript is combined with barrel modules

    JSDoc has been used throughout the application only to describe different Classes, functions and types.
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