import { factory, primaryKey } from '@mswjs/data'
import { faker } from '@faker-js/faker'

export const db = factory({
  // Create a "user" model
  user: {
    id: primaryKey(faker.datatype.uuid),
    username: () => faker.internet.userName(),
    password: () => faker.internet.password()
  },
  // Create a "book" model
  book: {
    id: primaryKey(faker.datatype.uuid),
    title: () => faker.commerce.productName(),
    description: () => faker.commerce.productDescription(),
    image: {
      url: () => faker.image.imageUrl()
    },
    reading_status: () => 'unread' as const
  }
})
