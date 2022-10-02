import React from 'react'

interface MultiDivProps {
  children: React.ReactNode
}

function MultiDiv(props: MultiDivProps) {
  return <div className="MultiDiv">{props.children}</div>
}

export default MultiDiv;