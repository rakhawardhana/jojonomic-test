class CdController {
    service

    constructor(service) {
        this.service = service
        this.create = this.create.bind(this)
        this.updateStock = this.updateStock.bind(this)
    }

    create(req, res) {
        const data = req.body
        this.service.create(data)
            .then(resp => res.status(201).json(resp))
            .catch(err => res.status(500).send(err))
    }

    updateStock(req, res) {
        const id = req.params.id
        const stock = req.body.stock

        this.service.updateStock(id, stock)
            .then(resp => res.send(resp))
            .catch(err => res.status(500).send(err))
    }
}

module.exports = CdController
