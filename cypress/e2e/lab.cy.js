<reference types= "cypress" />


describe('Hotel Search and Price Filter Test', () => {
  it('Should filter hotels by price and compare the first and last results', () => {
  

    cy.visit('https://www.almosafer.com/en');

    
    cy.get('.MuiTabs-flexContainer').eq(1).click();

    // Type a random city from the list: "dubai", "jeddah", "amman"
    const randomCity = ['dubai', 'jeddah', 'amman'][Math.floor(Math.random() * 3)];
    cy.get('[data-test=search-input]').type(randomCity);


    cy.wait(2000);


    cy.get('.search-results-list .MuiListItem-root').first().click();

    // Filter hotels by "lowest to high" price
    cy.get('[data-test=sort-filter]').click();
    cy.get('[data-test=price-lowest]').click();

    // Capture the prices of the first and last result
    cy.get('.hotel-card').first().invoke('text').then((firstPriceText) => {
      const firstPrice = parseFloat(firstPriceText.match(/(\d+\.\d+)/)[0]);

      cy.get('.hotel-card').last().invoke('text').then((lastPriceText) => {
        const lastPrice = parseFloat(lastPriceText.match(/(\d+\.\d+)/)[0]);

        // Assert that the first result's price is lower than the last result's price
        expect(firstPrice).to.be.lessThan(lastPrice);
      });
    });
  });
});

