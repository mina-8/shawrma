import React from 'react'

const Show = ({pdf}:any) => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">PDF Viewer</h1>
      <iframe
        src={pdf}
        width="100%"
        height="800px"
        className="border rounded"
        title="PDF Preview"
      ></iframe>
    </div>
  )
}

export default Show