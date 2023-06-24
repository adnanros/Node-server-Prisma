const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const index = async (req, res) => {
    const testPacks = await prisma.testPack.findMany();
    res.status(201).send(testPacks);
}

const store = async (req, res) => {
    const {name, description} = req.body;
    const testPack = await prisma.testPack.create({
        data: {name: name, description: description}
    });
    res.status(201).send(testPack);
}

const findById = async (req, res) => {
    // console.log('req.query',req.params);
     const id = Number(req.params.id);
     const testPack = await prisma.testPack.findUnique({where:{id: id}});
     res.status(201).send(testPack);
}

const edit = async (req, res) => {
    const {id, name, description} = req.body;
    const updateTestPack = await prisma.testPack.update({
        where: {
            id: Number(id)
        },
        data: {
            name: name, 
            description: description
        }
    });
    res.status(201).send(updateTestPack);

}

const remove = async (req, res) => {
    const deleteTestPack = await prisma.testPack.delete({
        where: {id: Number(req.params.id)}
    });
    res.status(201).send(deleteTestPack);
}

module.exports.store = store;
module.exports.index = index;
module.exports.findById = findById;
module.exports.edit = edit;
module.exports.remove = remove;