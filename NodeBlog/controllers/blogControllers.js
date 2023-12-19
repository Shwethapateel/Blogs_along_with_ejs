const Rating = require("../models/Rating.js");
const blogs = require("../models/blogs");
const asyncErrorHandler = require("../utils/asyncErrorHandler.js");

const getBlogsByAuthor = asyncErrorHandler(async (req,res)=>{
  let author = req.user._id
  let blogs = await blogs.find({author: author}).populate("author")
  return res.render("blogs",{blogs})
})

const postBlog = asyncErrorHandler(async (req, res) => {
  let user = req.user;
  const newBlog = await blogs.create({
    title: req.body.title,
    snippet: req.body.snippet,
    description: req.body.description,
    image: req.file,
    author: user._id,
  });
  res.status(201).json({
    status: "success",
    data: {
      newBlog,
    },
  });
});

const getBlogs = asyncErrorHandler(async (req, res) => {
  let search = req.query.search || "";
  let page = req.query.page * 1 || 1;
  let limit = req.query.limit * 1 || 10;
  let sort = req.query.sort || "rating";
  let skip = (page - 1) * limit;
  sort && sort.split(",").join(" ");
  let newBlogs = await blogs
    .find({ title: { $regex: search, $options: "i" } })
    .populate("author")
    .skip(skip)
    .limit(limit)
    .sort(sort);
  let totalBlogs = await blogs.countDocuments();
  // console.log(newBlogs);
  res.render("blogs", {
    page,
    limit,
    totalBlogs,
    newBlogs,
  });
});

const getBlog = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  let blog = await blogs.findById(id).populate("author")
  const ratings = await Rating.find({blog: blog._id}).populate("user")
  res.render("blog", {blog, ratings})
})

const updateBlog = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  const { description, snippet, title, image } = req.body;
  if (req.user.role === "author") {
    const updatedBlog = await blogs.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          title: title,
          snippet: snippet,
          description: description,
          image: image,
        },
      },
      { new: true, runValidators: true }
    )
    res.status(200).json({
      status: "success",
      data: {
        updatedBlog,
      },
    })
  }
})

const deleteBlog = asyncErrorHandler(async (req, res) => {
  await blogs.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    data: null,
  })
})

let postRating = asyncErrorHandler(async (req, res) => {
  let user = req.user._id;
  let blog = req.params.id;
  let duplicateRating = await Rating.findOne({user: user, blog: blog})
  if(duplicateRating){
    duplicateRating.ratings = req.body.ratings
    await duplicateRating.save()
    return res.redirect("/app/v1/blogs/ratings/:id")
  }
  await Rating.create({
    ratings: +req.body.ratings,
    user: user,
    blog: blog,
  })
  res.redirect("/app/v1/blogs/ratings/:id")
})

// let getRatings = asyncErrorHandler(async (req, res) => {
//   let blogId = req.params.id;
//   let rating = await Rating.find({ blogId: blogId });
//   res.status(200).json({
//     status: "success",
//     blogId,
//     data: {
//       rating,
//     },
//   })
// })

const dashboard = (req, res) => {
  if (req.user.role === "admin") {
    return res.render("adminDashBoard");
  }
  if (req.user.role === "user") {
    return res.render("userDashBoard");
  }
  if (req.user.role === "author") {
    return res.render("authorDashBoard");
  }
}

module.exports = {
  postBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  postRating,
  dashboard,
  getBlogsByAuthor
}
