import React from 'react'
import { useGetOrderHistoryQuery } from '../state/pizzaApi'

export default function OrderList() {
  const { data: orders = [], error, isLoading } = useGetOrderHistoryQuery()
  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          orders.map(order => {
            return (
              <li key={order.id}>
                <div>`
                  {order.customer} oderered a size {order.size} with {order.toppings.length} topping{order.toppings.length > 1 ? 's' : ''}
                  `
                </div>
              </li>
            )
          })
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${size === 'All' ? ' active' : ''}`
            return <button
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}>{size}</button>
          })
        }
      </div>
    </div>
  )
}
