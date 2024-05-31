import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFullName, selectSize, toggleTopping, resetForm } from '../state/pizzaSlice';
import { useCreateOrderMutation } from '../state/pizzaApi';

export default function PizzaForm() {
  const dispatch = useDispatch();
  const formState = useSelector((st) => st.pizzaState)
  const [createOrder, {error: creationError, isLoading: creatingOrder}] = useCreateOrderMutation()

  const handleSubmit = (e) => {
    e.preventDefault()
    const transformedData = {
      fullName: formState.fullName,
      size: formState.size,
      toppings: Object.keys(formState).filter(key => formState[key] && key !== 'fullName' && key !== 'size')
    }
    console.log("Transformed data:", transformedData)
    createOrder(transformedData)
      .unwrap()
      .then(data => {
        console.log(data)
        dispatch(resetForm())
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      {true && <div className='pending'>{creatingOrder && 'Order in progress'}</div>}
      {true && <div className='failure'>{creationError && creationError.data.message}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={formState.fullName}
            onChange={(e) => dispatch(updateFullName(e.target.value))}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select
            data-testid="sizeSelect"
            id="size"
            name="size"
            value={formState.size}
            onChange={(e) => dispatch(selectSize(e.target.value))}
          >
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input
            data-testid="checkPepperoni"
            name="1"
            type="checkbox"
            checked={formState['1']}
            onChange={() => dispatch(toggleTopping('1'))}
          />
          Pepperoni<br /></label>
        <label>
          <input
            data-testid="checkGreenpeppers"
            name="2"
            type="checkbox"
            checked={formState['2']}
            onChange={() => dispatch(toggleTopping('2'))}
          />
          Green Peppers<br /></label>
        <label>
          <input
            data-testid="checkPineapple"
            name="3"
            type="checkbox"
            checked={formState['3']}
            onChange={() => dispatch(toggleTopping('3'))}
          />
          Pineapple<br /></label>
        <label>
          <input
            data-testid="checkMushrooms"
            name="4"
            type="checkbox"
            checked={formState['4']}
            onChange={() => dispatch(toggleTopping('4'))}
          />
          Mushrooms<br /></label>
        <label>
          <input
            data-testid="checkHam"
            name="5"
            type="checkbox"
            checked={formState['5']}
            onChange={() => dispatch(toggleTopping('5'))}
          />
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  );
}
