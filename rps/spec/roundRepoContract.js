const Round = require("../src/Round")
const asyncIt = require("./support/asyncIt")

function roundRepoContract(repoFactoryClass) {
    describe("Round Repo Contract", function () {
        let repo

        beforeEach(function () {
            repo = new repoFactoryClass().roundRepo()
        })

        asyncIt("saves rounds", async function () {
            let round = new Round()
            await repo.save(round)

            let rounds = await repo.getAll()

            expect(rounds).toContain(round)
        })

        describe("when there are no rounds", function () {
            asyncIt("is empty", async function () {
                expect(await repo.empty()).toBe(true)
            })
        })

        describe("when there are rounds", function () {
            asyncIt("is not empty", async function () {
                repo.save(new Round())

                expect(await repo.empty()).toBe(false)
            })
        })
    })
}

module.exports = roundRepoContract