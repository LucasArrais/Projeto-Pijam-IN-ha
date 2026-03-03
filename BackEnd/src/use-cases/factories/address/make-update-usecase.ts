import { PrismaAddressRepository } from "@/repositories/prisma/address-prisma-repository.js"
import { UpdateAddressUseCase } from "@/use-cases/address-use-cases/update-address.js"



export function makeUpdateAddressUseCase() {

        const addressRepository = new PrismaAddressRepository()

        const updateAddressUseCase = new UpdateAddressUseCase(addressRepository)

        return updateAddressUseCase
}
