import { UserShowData } from './'

/*
    Reasons for using readonly objects over Enums are of the same nature as the TS Documentation suggests:
      1. Better performance
      2. Easier integration when/if the Enums become available inside the JavaScript language itself
*/

/**
 * Warning/error messages.
 */
const WARNS =  {
    handlerNotFound: 'There are no event handlers registered for this event',
    modelFetchFailed: 'Data could not be fetched!',
    modelSaveFailed: 'Data could not be saved!',
    modelIdNotFound: 'Id could not be found!',
    domElementNotFound: 'The specified DOM element could not be found!',
    rootElementNotFoud: 'The specified root element could not be found!'
} as const

/**
 * Links used across the application.
 */
const LINKS = {
    jsonServerUsers: 'http://localhost:3000/users'
} as const

/**
 * Templates used by components for rendering the content.
 */
const TEMPLATES = {
    userForm: `
        <div>   
            <form>
                <input name="user-name" placeholder="User name" type="text" class="name-input">
                <button class="set-name" type="submit">Update name</button>
                <button class="set-age" type="button">Random age</button>
                <button class="save-user" type="button">Save</button>
            </form>
        </div>
    `,

    /**
     * Method tasked with returning a template for rendering by a component, which builds upon the user data provided.
     * @template UserShowData Describes *User* view `name` and `age` properties which will contain data for rendering to the DOM.
     * @param {UserShowData} [userDataObject] Optional data object containing user data.
     * @returns {string} Returns template for rendering by component. Template will use 'Anonymous' as User's name, and no value as User's age if none are provided through the functions argument.
     */
    userShow: ({ name, age }: UserShowData = { name: undefined, age: undefined }): string => 
    `
        <h2>User: ${name || 'Anonymous'}</h2>
        <h2>Age: ${typeof age === 'number' ? age : ''}</h2>
    `
} as const

export { WARNS, LINKS, TEMPLATES }