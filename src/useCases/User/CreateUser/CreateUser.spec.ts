import { CreateUserUseCase } from "./CreateUserUseCase"
import { IUserRepository } from "../../../repositories/implementations/user/protocols/IUserRepository"
import { IUserDTO } from "../protocols/UserDTO"
import MongoUserRespository from "../../../repositories/implementations/user/mongo"

jest.mock("../../../repositories/implementations/user/mongo/MongoUserRepository", jest.fn())
jest.mock("./CreateUserUseCase")
jest.mock("./")
jest.spyOn(MongoUserRespository, "findByEmail").mockReturnValue(new Promise((resolve) => resolve([{ email: "", name: "", password: "" }])))


describe("Create User", () => {
  test("Should user is created", async () => {
    const sut = new CreateUserUseCase({} as IUserRepository)
    sut.execute({ email: 'teste@gmail.com' } as IUserDTO)
    expect(sut.execute).toHaveBeenLastCalledWith({ email: 'teste@gmail.com' })
  })
})