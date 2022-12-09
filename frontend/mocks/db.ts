import { factory, primaryKey } from '@mswjs/data'
import { faker } from '@faker-js/faker'

export const db = factory({
  // Create a "user" model,
  user: {
    id: primaryKey(faker.datatype.uuid),
    username: () => faker.internet.userName(),
    password: () => faker.internet.password()
  }
})
