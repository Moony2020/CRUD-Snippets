const Snippet = require('../models/snippet')
const moment = require('moment')
const snippetsController = {}

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
snippetsController.index = async (req, res, next) => {
  try {
    const data = {
      snippets: (await Snippet.find({})).map((snippet) => ({
        id: snippet._id,
        user: snippet.username,
        snippet: snippet.snippet,
        createdAt: moment(snippet.createdAt).format('YY-MM-DD HH:mm'),
        updatedAt: moment(snippet.updatedAt).format('YY-MM-DD HH:mm')
      }))
    }
    data.snippets.reverse()
    res.render('snippets/index', { viewData: data })
  } catch (err) {
    err.statusCode = 500
    return next(err)
  }
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
snippetsController.new = async (req, res) => {
  res.render('snippets/new', {})
}

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
snippetsController.create = async (req, res, next) => {
  if (req.body.snippet.trim().length) {
    try {
      const snippet = new Snippet({
        username: req.session.userName,
        snippet: req.body.snippet
      })
      await snippet.save()
      req.session.flash = {
        type: 'success',
        text: 'Snippet successfully saved.'
      }
      res.redirect('.')
    } catch (err) {
      err.statusCode = 500
      return next(err)
    }
  } else {
    req.session.flash = {
      type: 'danger',
      text: 'Obs .. Snippet Code must be One character or more.'
    }
    res.redirect('.')
  }
}

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
snippetsController.update = async (req, res, next) => {
  if (req.body.snippet.trim().length) {
    try {
      const result = await Snippet.updateOne(
        { _id: req.params.id },
        {
          snippet: req.body.snippet
        }
      )
      if (result.nModified === 1) {
        req.session.flash = {
          type: 'success',
          text: 'The code snippet was updated successfully.'
        }
      } else {
        req.session.flash = {
          type: 'danger',
          text: 'Unable to update code snippet.'
        }
      }
      res.redirect('..')
    } catch (err) {
      err.statusCode = 500
      return next(err)
    }
  } else {
    req.session.flash = {
      type: 'danger',
      text: 'Obs .. Snippet Code must be One character or more.'
    }
    res.redirect('./edit')
  }
}

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
snippetsController.remove = async (req, res, next) => {
  try {
    const snippet = await Snippet.findOne({ _id: req.params.id })
    const viewData = {
      id: snippet._id,
      snippet: snippet.snippet
    }
    res.render('snippets/remove', { viewData })
  } catch (err) {
    err.statusCode = 500
    return next(err)
  }
}

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
snippetsController.delete = async (req, res, next) => {
  try {
    await Snippet.deleteOne({ _id: req.params.id })
    req.session.flash = {
      type: 'success',
      text: 'The code snippet was deleted successfully.'
    }
    res.redirect('..')
  } catch (err) {
    err.statusCode = 500
    return next(err)
  }
}

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
snippetsController.edit = async (req, res, next) => {
  try {
    const snippet = await Snippet.findOne({ _id: req.params.id })
    const data = {
      id: snippet._id,
      user: snippet.username,
      snippet: snippet.snippet,
      createdAt: moment(snippet.createdAt).format('YY-MM-DD HH:mm'),
      updatedAt: moment(snippet.updatedAt).format('YY-MM-DD HH:mm')
    }
    res.render('snippets/edit', { viewData: data })
  } catch (err) {
    err.statusCode = 500
    return next(err)
  }
}

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
snippetsController.authorize = async (req, res, next) => {
  if (!req.params.id && req.session.userName) {
    return next()
  }

  const userName = async function () {
    const user = await Snippet.findOne({ _id: req.params.id })
    return user.username
  }
  if (!req.session.userName || req.session.userName !== (await userName())) {
    const err = new Error('403: Forbidden')
    err.statusCode = 403
    return next(err)
  }
  next()
}

module.exports = snippetsController
