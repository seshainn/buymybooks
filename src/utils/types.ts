export type bookType = {
  id: number
  name: string
  imageUrl: string
  price: number
  qty: number
}

export type collectionObject = {
  title: string
  items: {
    id: number
    name: string
    imageUrl: string
    price: number
  }[]
}
