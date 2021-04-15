import React from 'react'

import classes from './BuildControls.module.css'

import BuildControl from './BuildControl/BuildControl'

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
]

const BuildControls = (props) => {

  return (
    <div className={classes.BuildControls}>
      {controls.map(ctrl => (
        <BuildControl
          added={() => props.ingredientAdded(ctrl.type)}
          removed={() => props.ingredientRemoved(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
          key={ctrl.label}
          label={ctrl.label} />
      ))}
    </div>
  )
}

export default BuildControls