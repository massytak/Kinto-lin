
  module.exports = (
    req,
    res,
    next = () => {
      /// ici soit next pour middelware sinon simple return quand utiliser en simple function
      return;
    }
  ) => {
    console.log("In ROUTE-GARD!!");
    if (!!req.user) next();
    else
    res.status('400').json({message:'You need to be logged'});
  };