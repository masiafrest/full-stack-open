describe("Blog app", function () {
  const user = {
    name: "naruto",
    username: "hokage",
    password: "hinata",
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

  describe.only("When logged in", function () {
    beforeEach(function () {
      const { username, password } = user;
      cy.login({ username, password });
      cy.createBlog({
        author: "minato",
        title: "way of ninja",
        url: "naruto.com",
      });
    });
    it("A blog can be create", function () {
      const blog = {
        author: "orochimaru",
        title: "1000 jutsu",
        url: "orochimaru.com",
      };
      cy.contains("create new blog").click();
      cy.get('input[name="title"]').type(blog.title);
      cy.get('input[name="author"]').type(blog.author);
      cy.get('input[name="url"]').type(blog.url);
      cy.contains("save").click();

      cy.contains(`added title: ${blog.title}`);
      cy.get("#blogs").contains(blog.title).contains("view").click();
      cy.contains(blog.author);
      cy.contains(blog.url);
      cy.contains("likes");
    });
  });
});
