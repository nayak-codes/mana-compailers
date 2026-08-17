import React from 'react'

export default function TerminalLoader({ lang, fileName }) {
  return (
    <div className="terminal-loader-center-wrap">
      <div className="terminal-circle-loader">
        <div className="circle-spinner" />
        <div className="circle-loader-text">
          <span>Running {fileName ? <strong>{fileName}</strong> : (lang?.label || 'code')}...</span>
        </div>
      </div>
    </div>
  )
}
