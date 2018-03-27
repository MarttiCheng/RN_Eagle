import user from './user'
import account from './account'
import contacts from './contacts'
import listings from './listings'
import tasks from './tasks'

module.exports = {
    ...user,
    ...account,
    ...contacts,
    ...listings,
    ...tasks,
}