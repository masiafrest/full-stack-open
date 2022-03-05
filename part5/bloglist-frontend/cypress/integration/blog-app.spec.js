describe("Blog app", function () {
  const user = {
    name: "naruto",
    username: "hokage",
    password: "hinata",
  };
  const orochimaruBlog = {
    author: "orochimaru",
    title: "1000 jutsu",
    url: "orochimaru.com",
  };
  const minatoBlog = {
    author: "minato",
    title: "way of ninja",
    url: "naruto.com",
  };
  const itachiBlog = {
    author: "itachi",
    title: "loyal",
    url: "itachi.com",
    likes: 10,
  };
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.request("POST", "http://localhost:3001/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", function () {
    cy.contains("blog");
  });

  it("create form can be opened", function () {
    cy.contains("create new blog").click();
    cy.contains("cancel").click();
  });

  describe("Login", function () {
    it("user can login", function () {
      cy.get('input[name="username"]').type(user.username);
      cy.get("input[name='password']").type(user.password);
      cy.contains("login").click();
      cy.contains(`${user.name} is logged in`);
    });

    it("user unsuccesful attemps", function () {
      cy.get('input[name="username"]').type(user.username);
      cy.get("input[name='password']").type(user.username);
      cy.contains("login").click();
      cy.contains(`Wrong credential`).should(
        "have.css",
        "color",
        "rgb(255, 0, 0)"
      );
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      const { username, password } = user;
      cy.login({ username, password });
      cy.createBlog(minatoBlog);
    });

    it("A blog can be create", function () {
      cy.contains("create new blog").click();
      cy.get('input[name="title"]').type(orochimaruBlog.title);
      cy.get('input[name="author"]').type(orochimaruBlog.author);
      cy.get('input[name="url"]').type(orochimaruBlog.url);
      cy.contains("save").click();

      cy.contains(`added title: ${orochimaruBlog.title}`);
      cy.get("#blogs").contains(orochimaruBlog.title).contains("view").click();
      cy.contains(orochimaruBlog.author);
      cy.contains(orochimaruBlog.url);
      cy.contains("likes");
    });

    it("A blog can be liked", function () {
      cy.get("#blogs").contains(minatoBlog.title).contains("view").click();
      cy.contains(minatoBlog.author);
      cy.contains(minatoBlog.url);
      cy.contains("likes").contains("like").click().parent().contains(1);
    });

    it("Can delete a blog", function () {
      cy.get("#blogs").contains(minatoBlog.title).contains("view").click();
      cy.get("#blogs").contains("delete").click();
      cy.get("#blogs").should("not.contain", minatoBlog.title);
    });
  });

  describe.only("Blogs", function () {
    beforeEach(function () {
      const { username, password } = user;
      cy.login({ username, password });
      cy.createBlog(minatoBlog);
      cy.createBlog(orochimaruBlog);
      cy.createBlog(itachiBlog);
    });

    it("blogs are order by likes", function () {
      cy.contains(minatoBlog.title);
      cy.contains(itachiBlog.title);
      cy.get("#blogs").contains(minatoBlog.title).contains("view").click();
      cy.get("#blogs").contains(orochimaruBlog.title).contains("view").click();
      cy.get("#blogs").contains(itachiBlog.title).contains("view").click();
      // cy.get("#likes");
    });
  });
});
