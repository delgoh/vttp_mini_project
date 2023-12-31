export interface Order {
  orderId: string
  visitor: string
  exhibitorId: string
  productId: string
  productName: string
  quantity: number
  unitPrice: number
  isSelected: boolean
}
