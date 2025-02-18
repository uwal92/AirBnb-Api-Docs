// backend/routes/index.js
const express = require("express");
const router = express.Router();
const apiRouter = require("./api");

router.use("/api", apiRouter);

// Static routes
// Serve React build files in production
if (process.env.NODE_ENV === "production" && 1!=1) {
  const path = require("path");
  // Serve the frontend's index.html file at the root route
  // router.get("/", (req, res) => {
  //   res.cookie("XSRF-TOKEN", req.csrfToken());
  //   res.sendFile(
  //     path.resolve(__dirname, "../../frontend", "dist", "index.html")
  //   );
  // });
  router.get("/", (req, res) => {
    const token = req.csrfToken();
    console.log("Generated CSRF Token:", token);
    console.log("-- process.env.NODE_ENV --", process.env.NODE_ENV);

    res.cookie("XSRF-TOKEN", token, {
      httpOnly: false,
      path: "/",
      secure: true,
      sameSite: 'None',
      domain: process.env.NODE_ENV === "production" ? ".onrender.com" : undefined
    });
    res.sendFile(path.resolve(__dirname, "../../frontend", "dist", "index.html"));
  });
  console.log("path: ", path);
  // Serve the static assets in the frontend's build folder
  router.use(express.static(path.resolve("../frontend/dist")));

  // Serve the frontend's index.html file at all other routes NOT starting with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    console.log("CSRF Token2:", req.csrfToken());
    res.cookie("XSRF-TOKEN", req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, "../../frontend", "dist", "index.html")
    );
  });
}

// Add a XSRF-TOKEN cookie in development
   

module.exports = router;
