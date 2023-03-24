export interface IUseCase {
  execute(data: any, id?: any): Promise<void>
}