import React, { useState } from 'react'
import { useGetOrderHistoryQuery } from '../state/pizzaApi'

export default function OrderList() {
  const { data: orders = []} = useGetOrderHistoryQuery()
  const [filterSize, setFilterSize] = useState('All')

  const filteredOrders = filterSize === 'All'
    ? orders
    : orders.filter(order => order.size === filterSize)

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          filteredOrders.map(order => (
            <li key={order.id}>
              <div>
                {order.customer} ordered a size {order.size} with {order.toppings?.length ? `${order.toppings.length} topping${order.toppings.length > 1 ? 's' : ''}` : 'no toppings'}
              </div>
            </li>
          ))
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${size === filterSize ? ' active' : ''}`
            return (
              <button
                data-testid={`filterBtn${size}`}
                className={className}
                key={size}
                onClick={() => setFilterSize(size)}
              >
                {size}
              </button>
            )
          })
        }
      </div>
    </div>
  )
}
