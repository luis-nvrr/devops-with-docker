/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
import Logout from './Logout'
import { Flex, Stack, Spacer, Box, Heading, Breadcrumb, BreadcrumbItem } from '@chakra-ui/react'

const Menu = () => {
  return (
    <Flex color="white.500" boxShadow="lg">
      <Stack alignItems="center" direction="row" padding={2}>
        <Heading size="md" spacing={3} marginRight={4}>
          Blogs App
        </Heading>
        <Breadcrumb>
          <BreadcrumbItem>
            <Box color="teal.500">
              <Link to="/">blogs</Link>
            </Box>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Box color="teal.500">
              <Link to="/users">users</Link>
            </Box>
          </BreadcrumbItem>
        </Breadcrumb>
      </Stack>
      <Spacer />
      <Stack alignItems="center" direction="row" padding={2} marginRight={2}>
        <Logout />
      </Stack>
    </Flex>
  )
}

export default Menu
