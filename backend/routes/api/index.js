// backend/routes/api/index.js
const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const bookingRouter = require("./bookings.js");
const spotRouter = require("./spots.js");
const reviewRouter = require("./reviews.js");
const reviewImagesRouter = require("./review-images.js");
const spotImagesRouter = require("./spot-images.js");

// backend/routes/api/index.js
router.post("/test", function (req, res) {
  res.json({ requestBody: req.body });
});

// backend/routes/api/index.js

// GET /api/set-token-cookie
const { setTokenCookie } = require("../../utils/auth.js");
const { User } = require("../../db/models/index.js");
router.get("/set-token-cookie", async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: "Demo-lition",
    },
  });

  setTokenCookie(res, user);
  return res.json({ user: user });
});

// backend/routes/api/index.js

// GET /api/restore-user
const { restoreUser } = require("../../utils/auth.js");

router.use(restoreUser);

router.get("/restore-user", (req, res) => {
  return res.json(req.user);
});

// backend/routes/api/index.js

router.use(restoreUser);

// GET /api/require-auth
const { requireAuth } = require("../../utils/auth.js");
router.get("/require-auth", requireAuth, (req, res) => {
  return res.json(req.user);
});

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/spots", spotRouter);
router.use("/reviews", reviewRouter);
router.use("/bookings", bookingRouter);
router.use("/spot-images", spotImagesRouter);
router.use("/review-images", reviewImagesRouter);

router.post("/test", (req, res) => {
  res.json({ requestBody: req.body });
});


//Add a XSRF-TOKEN cookie in development

  router.get("/csrf/restore", (req, res) => {
 
    const csrfToken = req.csrfToken();
    console.log("Generated CSRF Token from api index:", csrfToken);
    res.cookie("XSRF-TOKEN", csrfToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: 'None',
      domain: process.env.NODE_ENV === "production" ? "https://airbnb-api-docs.onrender.com" : undefined
    });
    res.status(200).json({
      "XSRF-Token": csrfToken,
    });
  });


module.exports = router;
