/// <reference types="Cypress" />
const dude = require("../fixtures/userForCreated.json");
const kitten = require("../fixtures/userForFixed.json");
const fixUser = require("../fixtures/fixedUser.json");
const fil = require("../fixtures/userForDelete.json");

describe("when a user is working with the service", () => {
  it("user should be created", () => {
    cy.requestUser("POST", "/", dude).then((response) => {
      expect(response.status).to.eq(200);
    });
    cy.requestUser("GET", "/dude").then((response) => {
      expect(response.body.id).to.eq(dude.id);
      expect(response.body.username).to.eq(dude.username);
      expect(response.body.firstName).to.eq(dude.firstName);
      expect(response.body.lastName).to.eq(dude.lastName);
      expect(response.body.email).to.eq(dude.email);
      expect(response.body.password).to.eq(dude.password);
      expect(response.body.phone).to.eq(dude.phone);
      expect(response.body.userStatus).to.eq(dude.userStatus);
    });
  });
  it("user should be fixed", () => {
    cy.requestUser("POST", "/", kitten).then((response) => {
      expect(response.status).to.eq(200);
    });
    cy.requestUser("PUT", "/kitten", fixUser);
    cy.requestUser("GET", "/new").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(fixUser.id);
      expect(response.body.username).to.eq(fixUser.username);
      expect(response.body.firstName).to.eq(fixUser.firstName);
      expect(response.body.lastName).to.eq(fixUser.lastName);
      expect(response.body.email).to.eq(fixUser.email);
      expect(response.body.password).to.eq(fixUser.password);
      expect(response.body.phone).to.eq(fixUser.phone);
      expect(response.body.userStatus).to.eq(fixUser.userStatus);
    });
  });
  it("user should be delete", () => {
    cy.requestUser("POST", "/", fil);
    cy.requestUser("DELETE", "/fil");
    cy.requestUserFail("GET", "/fil").then((response) => {
      expect(response.body.message).to.eq("User not found");
    });
  });
});
