describe("Nextjs Boilerplate", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("Should have a header for the page.", () => {
    cy.get("h1").contains("My Nextjs Boilerplate.").should("exist");
  });
  it("Should have a footer", () => {
    cy.get("div.text-white > p").should("contain.text", "Jordan Addison 2020");
  });
  describe("Counter Component", () => {
    it("Should start at 1", () => {
      cy.dataCy("counter-value").should("contain.text", "1");
    });
    it("Should count up", () => {
      cy.wait(1000).then(() => {
        cy.dataCy("counter-value").should("contain.text", "2");
      });
    });
    it("Should reset the counter to 1", () => {
      cy.wait(1000).then(() => {
        cy.dataCy("counter-value").should("contain.text", "2");
        cy.get("button.bg-blue-800").click();
        cy.dataCy("counter-value").should("contain.text", "1");
      });
    });
  });

  describe("Window Size Component", () => {
    it("Should record the correct window width and height", () => {
      cy.viewport(1920, 1080);
      cy.dataCy("window-width-value").should("contain.text", "1920");
      cy.dataCy("window-height-value").should("contain.text", "1080");
      cy.viewport(1000, 600);
      cy.dataCy("window-width-value").should("contain.text", "1000");
      cy.dataCy("window-height-value").should("contain.text", "600");
    });
  });
});

export {};
