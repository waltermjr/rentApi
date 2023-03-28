import { CreateUserUseCase } from "./CreateUserUseCase"
import { IUserDTO } from "../protocols/UserDTO"
import { MongoUserRespository } from "../../../repositories/implementations/user/mongo/MongoUserRepository"
import request from 'supertest'
import app from "../../../app"


describe("Create User", () => {
  
  afterEach(() => {
    jest.restoreAllMocks();
  });
  
  beforeEach(() => {
    jest.resetModules()
  })

  test("Should user create error", async () => {
    jest.spyOn(CreateUserUseCase.prototype, 'execute').mockImplementationOnce(() => Promise.reject(new Error('Usuário já cadastrado')))

    const res = await request(app).post('/user')
    expect(res.status).toEqual(400)
    expect(res.body.message).toEqual('Error: Usuário já cadastrado - erro ao criar usuário')
  })

  test("Should user create success", async () => {
    jest.spyOn(CreateUserUseCase.prototype, 'execute').mockImplementationOnce(() => Promise.resolve())

    const res = await request(app).post('/user')
    expect(res.status).toEqual(201)
    expect(res.body.message).toEqual('Usuário criado com sucesso')
  })
})