import { inject, injectable } from "tsyringe"
import { AppError } from "../../../../errors/AppError"
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository"

interface IRequest {
    name: string,
    description: string
}

@injectable()
class CreateSpecificationUseCase{
    constructor(
        @inject("SpecificationRepository")
        private speficationsRepository: ISpecificationRepository
        ){}

    async execute({name,description}: IRequest): Promise<void>{
        const specificationAlreadyExists = await this.speficationsRepository.findByName(name)

        if (specificationAlreadyExists) {
            throw new AppError("Specification Already Exists!")
        }

        await this.speficationsRepository.create({
            name,
            description
        })
    }
}

export {CreateSpecificationUseCase}