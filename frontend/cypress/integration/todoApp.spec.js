describe('Todo app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/testing/reset')
    const user = {
      username: 'testi',
      password: 'testi'
    }
    cy.request('POST', 'http://localhost:3003/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login page can be opened', function() {
    cy.contains('Sign in')
    cy.contains('create an account')
  })

  it('create new account page can be opened', function() {
    cy.contains('create an account').click()
    cy.contains("Sign up")
  })

  it('new account can be created', function() {
    cy.contains('create an account').click()
    cy.get('[data-cy=username').click().type("tommi")
    cy.get('[data-cy=password]').click().type("tommi")
    cy.get('[data-cy=confirmPassword]').click().type("tommi")
    cy.get('[data-cy=signUp]').click()
    cy.contains('My Todos')
  })

  it('new account with existing username can not be created', function() {
    cy.contains('create an account').click()
    cy.get('[data-cy=username').click().type("testi")
    cy.get('[data-cy=password]').click().type("testi")
    cy.get('[data-cy=confirmPassword]').click().type("testi")
    cy.get('[data-cy=signUp]').click()
    cy.contains('Username already taken')
  })

  it('user can log in', function() {
    cy.get('[data-cy=username').click().type("testi")
    cy.get('[data-cy=password]').click().type("testi")
    cy.get('[data-cy=signIn]').click()
    cy.contains('My Todos')
  })

  it('login fails with wrong password', function() {
    cy.get('[data-cy=username').click().type("testi")
    cy.get('[data-cy=password]').click().type("testi123")
    cy.get('[data-cy=signIn]').click()
    cy.contains("invalid username or password")
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('[data-cy=username').click().type("testi")
      cy.get('[data-cy=password]').click().type("testi")
      cy.get('[data-cy=signIn]').click()
    })

    it('user can logout', function() {
      cy.get('[data-cy=logout]').click()
      cy.contains("Sign in")
    })


    it('a new task can be created', function() {
      cy.get('[data-cy=name]').click().type("name test")
      cy.get('[data-cy=description]').click().type("description test")
      cy.get('[data-cy=addTask]').click()
      cy.contains('name test')
      cy.contains('description test')
      cy.contains('Complete')
      cy.contains('Delete')
    })

    describe('and when a task exists', function () {
      beforeEach(function () {
        cy.get('[data-cy=name]').click().type("name test")
        cy.get('[data-cy=description]').click().type("description test")
        cy.get('[data-cy=addTask]').click()
      })

      it('it can be completed', function () {
        cy.contains('Complete').click()
        cy.get('[data-cy="taskName"]')
          .should('contain', 'name test')
          .and('have.css', 'color', 'rgb(119, 119, 119)')

        cy.get('[data-cy="taskDesc"]')
          .should('contain', 'description test')
          .and('have.css', 'color', 'rgb(119, 119, 119)')
      })

      it('it can be deleted', function() {
        cy.contains("Delete").click()
        cy.get("html")
          .should('not.contain', 'name test')
          .should('not.contain', 'description test')

      })
  })
})
})