const { roles } = require("../access_control/roles");

exports.grantAccess = (action, resource) => {
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.user.role)[action](resource);

      if (!permission.granted) {
        return res.status(401).json({
          message: "You dont't have enough permissions to perform this action",
        });
      }
      next();
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong, please try again",
      });
    }
  };
};
