// Middleware to authorize admins
function adminauth(req, res, next) {
  if (!req.user.isAdmin) return res.status(403).send('Access denied.');

  next();
}

module.exports = adminauth;
