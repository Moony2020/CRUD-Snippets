const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

/**
 * User form
 * @type {module:mongoose.Schema<Document, Model<any, any>, undefined>}
 */
const userForm = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    }
  },
  {
    timestamps: true
  }
)

/**
 * Authentication Handler for User in database
 *
 * @param {String} username Username.
 * @param {String} password Password.
 * @returns {Promise<awaited Query<T | null, T, TQueryHelpers> & TQueryHelpers|awaited Query<DocType | null,
 * DocType, THelpers> & THelpers|TSchema|{username}>}
 */
userForm.statics.authenticate = async function (username, password) {
  const user = await this.findOne({ username })
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid login attempt.')
  }
  return user
}

/**
 * Encrypt user's password
 */
userForm.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 8)
})

const User = mongoose.model('User', userForm)

module.exports = User
