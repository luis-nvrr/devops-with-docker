import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, Box } from '@chakra-ui/react'

const UsersView = () => {
  const users = useSelector((state) => state.users)

  return (
    <Box maxWidth="md" borderWidth="1px" borderRadius="lg" overflow="hidden" padding={4} boxShadow="md">
      <Table size="md" variant="striped" colorScheme="teal">
        <TableCaption>Users table</TableCaption>
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th isNumeric>Blogs created</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.id}>
              <Td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </Td>
              <Td isNumeric>{user.blogs.length}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>User</Th>
            <Th isNumeric>BlogsCreated</Th>
          </Tr>
        </Tfoot>
      </Table>
    </Box>
  )
}

export default UsersView
