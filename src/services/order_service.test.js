jest.mock("../connection")
const connection = require("../connection")
const OrderService = require("./order_service")

let orderService

beforeEach(() => {
    orderService = new OrderService(connection)
})

test("should create new order", () => {
    const data = {
        "user_id": 2,
        "disk_id": 3,
        "quantity": 10
    }
    const expected = {
        ...data
    }
    connection.query.mockImplementation((sql, args, resultCallback) => {
        expect(sql).toContain("SELECT * FROM DISKS")
        expect(args).toEqual([data.user_id, data.disk_id, data.quantity])
        resultCallback(null)
    })
    orderService.create(data)
        .then(actual => expect(actual).toEqual(expected))
})

test("should update total product", () => {
    const user_id = 1
    const id = 1
    connection.query.mockImplementation((sql, args, resultCallback) => {
        expect(sql).toContain("INSERT INTO ORDERS SET")
        expect(args).toEqual([user_id, id])
        resultCallback(null, null)
    })
    orderService.createOrder(id, user_id)
        .then(res => expect(res).toEqual("success"))
})