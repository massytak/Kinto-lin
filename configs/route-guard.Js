module.exports = (req, res, next) => {
    if (req.session.currentUser) next();
    else res.status('400').json({message:'You need to be logged'});
  };