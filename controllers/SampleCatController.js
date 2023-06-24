const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const index = async (req, res) => {
    const sampleCategories = await prisma.sampleCategory.findMany();
    res.status(201).send(sampleCategories);
}

const store = async (req, res) => {
    const {name, description} = req.body;
    const sampleCategory = await prisma.sampleCategory.create({
        data: {name: name, description: description}
    });
    res.status(201).send(sampleCategory);
}

const findById = async (req, res) => {
    // console.log('req.query',req.params);
     const id = Number(req.params.id);
     const category = await prisma.sampleCategory.findUnique({where:{id: id}});
     res.status(201).send(category);
}

const edit = async (req, res) => {
    const {id, name, description} = req.body;
    const updateSampleCategory = await prisma.sampleCategory.update({
        where: {
            id: Number(id)
        },
        data: {
            name: name, 
            description: description
        }
    });
    res.status(201).send(updateSampleCategory);

}

const remove = async (req, res) => {
    const deleteSamplseCategrory = await prisma.sampleCategory.delete({
        where: {id: Number(req.params.id)}
    });
    res.status(201).send(req.params.id);
}

module.exports.store = store;
module.exports.index = index;
module.exports.findById = findById;
module.exports.edit = edit;
module.exports.remove = remove;