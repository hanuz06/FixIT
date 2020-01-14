describe("Signup", () => {
  beforeEach(() => {
    cy.visit("/");

  })

  const generateRandomString= () => {
    let chars = "0123456789abcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < 6; i ++) {
      result += chars.charAt(Math.floor(Math.random() * 36));
    }
    return result;
  }
  const testEmail = generateRandomString()

  it("A person can sign up sucessfully", () => {
    cy.visit('/signup')
      .get('[id=firstName]')
      .type('Grant')
      .get('[id=lastName]')
      .type('Man')
      .get('[id=email]')
      .type(`${testEmail}@gmail.com`)
      .get('[id=password]')
      .type('12345')
      .get('[id=passwordConfirmation]')
      .type('12345')
      .get('[id=phone]')
      .type('4035555555')
      .get('[id=location]')
      .type('Calgary')
      .get('[type=checkbox]')
      .click()
      .get('[type=submit]')
      .click()
  })
});