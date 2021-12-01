import React from 'react'

const growTextArea = (e: React.KeyboardEvent<HTMLTextAreaElement> | React.FocusEvent<HTMLTextAreaElement, Element>) => {
  (e.target as HTMLElement).style.height = 'inherit';
  (e.target as HTMLElement).style.height = `${(e.target as HTMLElement).scrollHeight}px`;
}

export default growTextArea