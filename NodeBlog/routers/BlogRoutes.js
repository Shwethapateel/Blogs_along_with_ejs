const router = require("express").Router()
const multer = require("multer")
const storage = require("../middlewares/multer")
const {
  postBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  postRating,
  dashboard,
  getBlogsByAuthor,
  getUpdateBlog} = require("../controllers/blogControllers")
const { auth, verifyRole } = require("../middlewares/authMiddleware")
const upload = multer({ storage: storage })

router.get( "/dashboard", auth,verifyRole(["user", "admin", "author"]), dashboard)
router.post( "/", auth, verifyRole(["author"]), upload.single("image"), postBlog)
router.get("/", auth, getBlogs)
router.get("/author", auth, verifyRole(["author"]), getBlogsByAuthor)
router.get("/author/:id", auth, verifyRole(["author"]), getUpdateBlog)
router.get("/:id", auth, getBlog)
router.put("/author/:id", auth, verifyRole(["author"]), upload.single("image"), updateBlog )
router.post("/ratings/:id", auth, verifyRole(["user"]), postRating)
router.delete("/author/:id", auth, verifyRole(["admin", "author"]), deleteBlog)

module.exports = router
