module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    if (
      req.body.username === "mahoo12138" &&
      req.body.password === "xm12345678"
    ) {
      return res.status(200).json({
        user: {
          token: "12345",
        },
      });
    } else {
      return res.status(400).json({ message: "用户名或密码错误" });
    }
  }
  next();
};
