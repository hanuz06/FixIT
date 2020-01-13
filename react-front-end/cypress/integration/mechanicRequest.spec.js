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
    
    .get('[id=description_of_problem]').type("Will not start in this cold weather")
    .get('[type=submit]').click()
    cy.contains("Will not start in this cold weather").should('be.visible')
 })

})