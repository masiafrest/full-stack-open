const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  if (blogs.length === 1) return blogs[0].likes;
  return blogs.reduce((a, v) => a + v.likes, 0);
};

const favoriteBlog = (blogs) => {
  let maxLikes = 0;
  let idx = 0;
  for (let i = 0; i < blogs.length; i++) {
    const like = blogs[i].likes;
    if (like > maxLikes) {
      maxLikes = like;
      idx = i;
    }
  }
  const newObj = { ...blogs[idx] };
  delete newObj.__v;
  delete newObj._id;
  delete newObj.url;
  return newObj;
};

const mostBlogs = (blogs) => {
  const authorsBlogs = {};
  for (let i = 0; i < blogs.length; i++) {
    authorsBlogs[blogs[i].author]
      ? authorsBlogs[blogs[i].author]++
      : (authorsBlogs[blogs[i].author] = 1);
  }
  return Object.entries(authorsBlogs).reduce(
    (a, v) => {
      if (v[1] > a.blogs) {
        a.author = v[0];
        a.blogs = v[1];
        return a;
      }
      return a;
    },
    { author: "", blogs: 0 }
  );
};

const mostLikes = (blogs) => {
  const authorsBlogs = {};
  for (let i = 0; i < blogs.length; i++) {
    const author = blogs[i].author;
    const likes = blogs[i].likes;
    authorsBlogs[author]
      ? (authorsBlogs[author] += likes)
      : (authorsBlogs[author] = likes);
  }
  return Object.entries(authorsBlogs).reduce(
    (a, v) => {
      if (v[1] > a.likes) {
        a.author = v[0];
        a.likes = v[1];
        return a;
      }
      return a;
    },
    { author: "", likes: 0 }
  );
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
