import { useState, useEffect } from "react"
import { web3 } from '../lib/web3';

const EnsName = function () {
  // TODO!
  // get the address from outside
  // format it
  // check for ENS domain
  // get image if it has one
  // make jazzicon if not

  return (
    <div className="eth-name">
      <div className="icon">
        {/* icon goes here */}
      </div>

      <div className="name">
        <span className="primary">
          {/* ENS name if one here */}
        </span>
        <span className="secondary">
          {/* formatted address here */}
        </span>
      </div>
     
    </div>
  )
}

export default EnsName