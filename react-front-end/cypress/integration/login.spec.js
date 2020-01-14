describe("Login", () => {
  beforeEach(() => {
    cy.visit("/");

  })
  it("A person can log in sucessfully with correct username and password", () => {
    cy.visit('/login')
      .get('[id=email]')
      .type('granttaylor448@gmail.com')
      .get('[id=password]')
      .type('123')
      .get('[type=submit]')
      .click()
    .wait(1000)
    cy.get("[title=Logout]").click()
  })
});