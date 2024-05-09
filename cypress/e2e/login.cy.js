/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when username is empty
 *   - should display alert when password is empty
 *   - should display alert when username and password are wrong
 *   - should display homepage when username and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should display login page correctly', () => {
    // memverifikasi elemen yang harus tampak pada halaman login
    cy.get('input[placeholder="masukan email..."]').should('be.visible');
    cy.get('input[placeholder="******************"]').should('be.visible');
    cy.get('button')
      .contains(/^Login$/)
      .should('be.visible');
  });

  it('should display alert when username is empty', () => {
    // klik tombol login tanpa mengisi username
    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    // mengisi username
    cy.get('input[placeholder="masukan email..."]').type('testuser@gmail.com');

    // klik tombol login tanpa mengisi password
    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when username and password are wrong', () => {
    // mengisi username
    cy.get('input[placeholder="masukan email..."]').type('testuser@gmail.com');

    // mengisi password salah
    cy.get('input[placeholder="******************"]').type('wrongpassword');

    // klik tombol login
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display homepage when username and password are correct', () => {
    // mengisi username
    cy.get('input[placeholder="masukan email..."]').type(
      'adniadni04@gmail.com',
    );

    // mengisi password
    cy.get('input[placeholder="******************"]').type('adniadni1234');

    // klik tombol login
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // memverifikasi bahwa elemen yang berada di homepage ditampilkan
    cy.get('nav')
      .contains(/^Threads$/)
      .should('be.visible');
    cy.get('button').contains('Sign Out').should('be.visible');
  });
});
