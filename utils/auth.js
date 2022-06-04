// Function to check if session user id exists
const withAuth = (req, res, next) => {
    if (!req.session.userId) {
      res.replace('login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;