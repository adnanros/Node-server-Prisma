const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const index = async(req, res)=> {
    const testGroups = await prisma.testGroup.findMany();
    res.status(201).send(testGroups);
}
const store = async(req, res) => {
    //console.log('testGroupStore');
    const {name, description, sampleCategoryId} = req.body;
    const testGroup = await prisma.testGroup.create({
        data: {name:name, description:description, sampleCategoryId: Number(sampleCategoryId)}
    });
    res.status(201).send(testGroup);
}

const findById = async(req, res) => {
    const id = Number(req.params.id);
    const testGroup = await prisma.testGroup.findUnique({where: {id:id}});
    res.status(200).send(testGroup);
}

const findBySampleCategoryId = async(req, res) => {
    const sampleCategoryId = Number(req.params.id);
    console.log('sampleCategoryId', sampleCategoryId);
    const testGroups = await prisma.sampleCategory.findUnique({
        where: {id:sampleCategoryId}
    }).testGroups();
    res.status(200).send(testGroups);
}

const edit = async (req, res) => {
    const {id, sampleCategoryId, name, description} = req.body;
    const updateTestGroup = await prisma.testGroup.update({
        where: {
            id: Number(id)
        },
        data: {
            name: name, 
            description: description,
            sampleCategoryId: Number(sampleCategoryId)
        }
    });
    res.status(201).send(updateTestGroup);

}

const remove = async (req, res) => {
    const deleteTestGroup = await prisma.testGroup.delete({
        where: {id: Number(req.params.id)}
    });
    res.status(201).send(deleteTestGroup);
}

module.exports.store = store;
module.exports.edit = edit;
module.exports.remove = remove;
module.exports.index = index;
module.exports.findById = findById;
module.exports.findBySampleCategoryId = findBySampleCategoryId;