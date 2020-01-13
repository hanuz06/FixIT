describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
});
describe("It should visit the login page", () => {
  it("should visit root", () => {
    cy.visit("/login");
  });
});
describe("It should visit the sign up page", () => {
  it("should visit root", () => {
    cy.visit("/signup");
  });
});
