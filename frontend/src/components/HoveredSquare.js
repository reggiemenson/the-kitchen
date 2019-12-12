import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import posed from 'react-pose'
import styled from 'styled-components'


const Square = posed.div({
  idle: { scale: 1 },
  hovered: { scale: 1.1 }
})

const StyledSquare = styled(Square)`
  width: 450px;
  height: 250px;
`

class RecipeHoveredSquare extends React.Component {
	state = { hovering: false }

	render() {
	  return (
	    <StyledSquare className="box" id="inner-border"
	      pose={this.state.hovering ? 'hovered' : 'idle'}
	      onMouseEnter={() => this.setState({ hovering: true })}
	      onMouseLeave={() => this.setState({ hovering: false })}
	    ><Link to="/recipes" style={{ color: '#FFF' }}>Fancy Cheffing Up?</Link></StyledSquare>
	  )
	}
}

export default RecipeHoveredSquare