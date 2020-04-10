jest.mock("../services/order_service")
jest.mock("../connection")
const connection = require("../connection")
const OrderService = require('../services/order_service')
const OrderController = require('./order_controller')

let orderController
let orderService

beforeEach(() => {
    orderService = new OrderService(connection)
    orderController = new OrderController(orderService)
})

test("should return status code 201 and order data", () => {
    orderService.create.mockImplementation(data => {
        return new Promise((resolve, _) => resolve({id: 1, ...data}))
    })
    const req = {
        body: {
            "user_id": 2,
            "disk_id": 3,
            "quantity": 10
        }
    }
    const res = {}
    res.json = resp => {
        expect(resp).toEqual({ ...req.body })
        return res
    }
    res.status = code => {
        expect(code).toEqual(201)
        return res
    }
    orderController.create(req, res)
})