describe("Main page", () => {
  beforeEach(() => {
   cy.visit("/");
  })


it("User can login, click on a mechanic and make a request for a service", () => {
  cy.visit('/login')
    .get('[id=email]').type('granttaylor448@gmail.com')
    .get('[id=password]').type('123')
    .get('[type=submit]').click()

    cy.contains("Mike McGavin").should('be.visible')
    cy.contains("Request ").should('be.visible').click()
    cy.contains("Select car make")
    .get('[id=car-make]').select('Audi')
    .get('[id=car-model]').type('The fastest one')
    .get('[id=outlined-car-select]').select('2009')
    .get('[id=autocomplete]').type("Calgary AB, Canada").wait(1000).type('{downarrow}{enter}')
    
    .get('[id=description_of_problem]').type("cypresstest!@#$%")
    .get('[type=submit]').click()
    cy.contains("cypresstest!@#$%").should('be.visible')
    cy.visit('/')
    cy.contains("Inspection Summary").should('be.visible')
    
    cy.wait(1000)
    cy.get(".__PrivateStripeElement > iframe").then(($element) => {
      const $body = $element.contents().find("body");

      let stripe = cy.wrap($body);
      stripe
          .find('[name="cardnumber"]')
          .click()
          .type('4000001240000000');

      stripe = cy.wrap($body);
      stripe
          .find('[name="exp-date"]')
          .click()
          .type('1233');

      stripe = cy.wrap($body);
      stripe
          .find('[name="cvc"]')
          .click()
          .type('333');

      stripe = cy.wrap($body);
      stripe
          .find('[name="postal"]')
          .click()
          .type('333333');
        });
      
      
      cy.get('[type=button]').first().click()
      cy.get('[type=button]').first().click()
      .wait(12000)
      cy.get('[type=button]').first().click()

 })

})