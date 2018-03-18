import user from './user'
import account from './account'
import contacts from './contacts'

module.exports = {
    ...user,
    ...account,
    ...contacts,
}