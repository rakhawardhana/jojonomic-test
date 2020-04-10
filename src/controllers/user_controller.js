class UserController {
    service

    constructor(service) {
        this.service = service
        this.create = this.create.bind(this)
    }

    create(req, res) {
        const data = req.body
        this.service.create(data)
            .then(resp => res.status(201).json(resp))
            .catch(err => res.status(500).send(err))
    }

   
}

module.exports = UserController