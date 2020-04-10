jest.mock("../services/user_service")
jest.mock("../connection")
const connection = require("../connection")
const UserService = require('../services/user_service')
const UserController = require('./user_controller')

let userController
let userService

beforeEach(() => {
    userService = new UserService(connection)
    userController = new UserController(userService)
})

test("should return status code 201 and user data", () => {
    userService.create.mockImplementation(data => {
        return new Promise((resolve, _) => resolve({id: 1, ...data}))
    })
    const req = {
        body: {
           name: 'test_name'
        }
    }
    const res = {}
    res.json = resp => {
        expect(resp).toEqual({ id: 1, ...req.body })
        return res
    }
    res.status = code => {
        expect(code).toEqual(201)
        return res
    }
    userController.create(req, res)
})

