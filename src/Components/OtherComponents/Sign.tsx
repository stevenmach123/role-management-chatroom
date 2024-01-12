import React, { CSSProperties }  from 'react'

interface v{
    info?:string,
    message:JSX.Element,
    error ?:any
}

const tt ={
    padding:"0.6rem 1rem " 
 } as CSSProperties
 const icon = {
    fontSize:"200%",    
 } as CSSProperties 
const error_sim  = 'bi bi-x'
const suc_sim = 'bi bi-check'
const info_sim = 'bi bi-exclamation'

const error_text =  'text-red-600'
const suc_text = 'text-green-600'
const info_text = 'text-gray-300'

function Sign({info='loading',error,message=<>Nothing</>}:v) {
  let bg = error?.other?.indexOf('server') >= 0 || error?.other?.indexOf('weird') >=0 ? "bg-orange-300":error?"bg-red-300":''

  bg = info==='success'? 'bg-green-400':info==='loading'?'bg-gray-400':bg===''?"bg-red-300":bg  
  let sign = info==='success' ? suc_sim: info==='loading'?info_sim: error_sim
  let text =  info==='success' ? suc_text: info==='loading'?info_text: error_text 
  return (<div style={tt} id="dam" className={`flex justify-between  items-center text-xl ${bg}`}>
    <i  style={icon} className={`${sign} ${text}`} />
    {message}

  </div>
  )
}

export default Sign
