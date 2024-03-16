describe("Tensor Flow test", () => {
  before(() => {
    cy.visit("/");
  });

  it("tests basic Tensor flow", () => {
    // Prints test loss value to console
    cy.get("#loss-test").then(($el) => {
      cy.log($el.text());
      console.log($el.text());
    });

    // Changes dataset to exclusive
    cy.get(".dataset-list").within(() => {
      cy.get('[title="Exclusive or"]').click();
      cy.get('[title="Exclusive or"]')
        .find("canvas")
        .should("have.class", "selected");
    });

    // Changes noise to 5%
    cy.get(".ui-noise").within(() => {
      cy.get("#noise").invoke("val", 5).trigger("input");
      cy.get(".value").should("have.text", "5");
    });

    // Selects two additional features
    cy.get("#canvas-xSquared").click();
    cy.get("#canvas-xSquared").should("have.class", "active");
    cy.get("#canvas-ySquared").click();
    cy.get("#canvas-ySquared").should("have.class", "active");

    // Removes one neuron from each hidden layer
    cy.get(".ui-numNodes1").within(() => {
      cy.get("button").contains("remove").click();
    });
    cy.get(".ui-numNodes1").siblings().should("contain.text", "3 neurons");

    cy.get(".ui-numNodes2").within(() => {
      cy.get("button").contains("remove").click();
    });
    cy.get(".ui-numNodes2").siblings().should("contain.text", "1 neuron");

    // Changes learning rate to 0.1
    cy.get("#learningRate").select("0.1");

    // Starts the simulation
    cy.get("#play-pause-button").click();

    // Waits for epoch to be more than 0.3
    cy.get("#iter-number").should(($el) => {
      const epochString = $el.text();
      const cleanEpochString = epochString.replace(",", ".");
      const epoch = parseFloat(cleanEpochString);

      expect(epoch).to.be.greaterThan(0.3);
    });
    cy.get("#play-pause-button").click();

    // Prints test loss value to console
    cy.get("#loss-test").then(($el) => {
      cy.log($el.text());
      console.log($el.text());
    });
  });
});
