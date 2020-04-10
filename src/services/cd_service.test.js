jest.mock("../connection")
const connection = require("../connection")
const CdService = require("./cd_service")

let cdService

beforeEach(() => {
    cdService = new CdService(connection)
})

test("should create new disk", () => {
    const data = {
        title: "test_1",
        category: "test_category",
        rate: 10000,
        stock: 10
    }
    const expected = {
        id: 1,
        ...data
    }
    connection.query.mockImplementation((sql, args, resultCallback) => {
        expect(sql).toContain("INSERT INTO DISKS")
        expect(args).toEqual([data.title, data.category, data.rate, data.stock])
        resultCallback(null, { insertId: 1 })
    })
    cdService.create(data)
        .then(actual => expect(actual).toEqual(expected))
})

test("should update disk quantity", () => {
    const stock = 11
    const id = 1
    connection.query.mockImplementation((sql, args, resultCallback) => {
        expect(sql).toContain("UPDATE DISKS SET")
        expect(args).toEqual([stock, id])
        resultCallback(null, null)
    })
    cdService.updateStock(id, stock)
        .then(res => expect(res).toEqual("success"))
})