const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const index = async (req, res) => {
    const testPacksOnTestGroups = await prisma.testPacksOnTestGroups.findMany();
    res.status(201).send(testPacksOnTestGroups);
}

const store = async (req, res) => {
    const { testGroupId, testPackId } = req.body;
    const testPacksOnTestGroups = await prisma.testPacksOnTestGroups.create({
        data: { testGroupId: Number(testGroupId), testPackId: Number(testPackId) }
    });
    res.status(201).send(testPacksOnTestGroups);
}

const findByTestPackId = async (req, res) => {
    const testPackId = req.params.testPackId;
    const testPacksOnTestGroups = await prisma.testPacksOnTestGroups.findMany({
        where: {
            testPackId: Number(testPackId)
        }
    });
    res.status(201).send(testPacksOnTestGroups);
}

const findByTestGroupId = async (req, res) => {
    const testGroupId = req.params.testGroupId;
    const testPacksOnTestGroups = await prisma.testPacksOnTestGroups.findMany({
        where: {
            testGroupId: Number(testGroupId)
        }
    });
    res.status(201).send(testPacksOnTestGroups);
}

const edit = async (req, res) => {
    const {oldTestGroupId, oldTestPackId, newTestGroupId, newTestPackId } = req.body;
    // console.log(req.body);
    const updateTestPacksOnTestGroups = await prisma.testPacksOnTestGroups.update({
        where: {
            testGroupId_testPackId: {
                testGroupId: Number(oldTestGroupId),
                testPackId: Number(oldTestPackId)
            }
        },
        data: {
            testGroupId: Number(newTestGroupId),
            testPackId: Number(newTestPackId)
        }
    });
    res.status(201).send(updateTestPacksOnTestGroups);

}

const remove = async (req, res) => {
    const { testGroupId, testPackId } = req.body;
    const deleteTestPacksOnTestGroups = await prisma.testPacksOnTestGroups.delete({
        where: {
            testGroupId_testPackId: {
                testGroupId: Number(testGroupId),
                testPackId: Number(testPackId)
            }
        }
    });
    res.status(201).send(deleteTestPacksOnTestGroups);
}

module.exports.store = store;
module.exports.index = index;
module.exports.findByTestGroupId = findByTestGroupId;
module.exports.findByTestPackId = findByTestPackId;
module.exports.edit = edit;
module.exports.remove = remove;