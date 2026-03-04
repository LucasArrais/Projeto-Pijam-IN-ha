import { PrismaAddressRepository } from "@/repositories/prisma/address-prisma-repository.js"
import { CreateAddressUseCase } from "@/use-cases/address-use-cases/create-address.js"


export function makeCreateAddressUseCase() {

        const addressRepository = new PrismaAddressRepository()

        const createAddressUseCase = new CreateAddressUseCase(addressRepository)

        return createAddressUseCase
}
