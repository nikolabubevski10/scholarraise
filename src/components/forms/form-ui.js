import React from 'react'

export function FormContainer({className, ...props}) {
  return <div {...props} className={`w-full p-10 bg-white shadow-forms ${className}`} />
}

export function InputGroups(props) {
  return <div {...props} className="grid md:grid-cols-3 grid-cols-1 col-gap-4 row-gap-1" />
}
