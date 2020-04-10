jest.mock("../services/cd_service")
jest.mock("../connection")
const connection = require("../connection")
const CdService = require('../services/cd_service')
const CdController = require('./cd_controller')

let cdController
let cdService

beforeEach(() => {
    cdService = new CdService(connection)
    cdController = new CdController(cdService)
})

test("should return status code 201 and disk data", () => {
    cdService.create.mockImplementation(data => {
        return new Promise((resolve, _) => resolve({id: 1, ...data}))
    })
    const req = {
        body: {
            title: "test_1",
            category: "test_category",
            rate: 10000,
            stock: 10
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
    cdController.create(req, res)
})

test("should return status code 201 and disk data", () => {
    cdService.updateStock.mockImplementation(data => {
        return new Promise((resolve, _) => resolve({id: 1, ...data}))
    })
    const req = {
        params : {
            id: 1
        },
        body: {
            title: "test_1",
            category: "test_category",
            rate: 10000,
            stock: 10
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
    cdController.updateStock(req, res)
})