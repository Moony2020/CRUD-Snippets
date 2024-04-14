const homeController = {}
/**
 *
 * @param req
 * @param res
 */
homeController.index = (req, res) => {
  res.render('home/index')
}
module.exports = homeController
