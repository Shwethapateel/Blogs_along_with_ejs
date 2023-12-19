const router = require('express').Router()
const {auth, verifyRole} = require('../middlewares/authMiddleware.js')
const {postBlog, getBlog, getBlogs, updateBlog, deleteBlog, postRating, dashboard, getBlogsByAuthor} = require('../controllers/blogControllers.js')
const multer = require("multer")
const storage = require("../middlewares/multer.js")

const upload = multer({ storage: storage })


router.get("/dashboard", auth, verifyRole(["admin", "user", "author"]), dashboard)
router.post("/", auth, verifyRole(["author"]), upload.single("image"), postBlog)
router.post("/", auth, verifyRole(["author"]), postBlog)
router.get("/author", auth,verifyRole(["author"]),getBlogsByAuthor)
router.get("/", auth, getBlogs)
router.get("/:id", auth, getBlog)
router.patch(":/id", auth,verifyRole(["author"]), updateBlog)
router.post("/ratings/:id", auth,verifyRole(["user"]), postRating)
router.delete("/:id",auth, verifyRole(["admin", "author"]), deleteBlog)

module.exports = router