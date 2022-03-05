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

    it.only("user unsuccesful attemps", function () {
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
});
