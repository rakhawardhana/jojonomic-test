jest.mock("../connection")
const connection = require("../connection")
const UserService = require("./user_service")

let userService

beforeEach(() => {
    userService = new UserService(connection)
})

test("should create new user", () => {
    const data = {
       name: 'test_name'
    }
    const expected = {
        id: 1,
        ...data
    }
    connection.query.mockImplementation((sql, args, resultCallback) => {
        expect(sql).toContain("INSERT INTO CUSTOMERS")
        expect(args).toEqual([data.name])
        resultCallback(null, { insertId: 1 })
    })
    userService.create(data)
        .then(actual => expect(actual).toEqual(expected))
})

