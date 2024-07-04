import React from 'react'

export default function TooltipTransactions({ active, payload, label, labelFormatter, formatter }) {
  if (active && payload && payload.length) {
    return (
      <ul
        className="custom-tooltip"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 1)',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          listStyleType: 'none',
        }}
      >
        <li className="label">{`${labelFormatter(label, payload)}`}</li>
        {payload.map((t, index) => {
          const formattedValue = formatter(t.value, t.name)
          return (
            <li key={index} className="label" style={{ color: t.color }}>
              {t.name} : {formattedValue}
            </li>
          )
        })}
      </ul>
    )
  }

  return null
}
