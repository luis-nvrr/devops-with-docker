import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Stack, Box } from '@chakra-ui/react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <Stack>
      <Box style={hideWhenVisible} marginTop={3}>
        <Button size="md" colorScheme="teal" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </Box>
      <Box style={showWhenVisible}>{React.cloneElement(props.children, { toggleVisibility })}</Box>
    </Stack>
  )
}

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
