describe("Blog app", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });
  it("front page can be opened", function () {
    cy.contains("blog");
  });
  it("login form can be opened", function () {
    cy.contains("create new blog").click();
    cy.contains("cancel").click();
  });
  it("user can login", function () {
    const username = 12345;
    cy.get('input[name="username"]').type(username);
    cy.get("input[name='password']").type(username);
    cy.contains("login").click();
    cy.contains(`${username} is logged in`);
  });
});
