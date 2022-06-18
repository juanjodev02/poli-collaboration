import React, { useState } from 'react';
import { Flex, Avatar, Heading, Text, Box, Button } from '@chakra-ui/react';
import { WarningTwoIcon } from '@chakra-ui/icons';
import NavItem from '../resources/navItem';
import Cookies from 'js-cookie'
import { useRouter } from 'next/router';

export default function LeftBar({ icono, listaAcciones, user }) {

    const router = useRouter()
    const cerrarSesion = (e) => {
        Cookies.remove("token")
        router.push("signup")
    }

  return (
    <Flex w="25%" flexDir="column" bg="white" boxShadow="dark-lg" p="8" mt="7vh" rounded="md" pos="fixed">
      {/* Avatar */}
      <Flex p="5%" flexDir="column" w="100%" mb={4}>
        <Flex mt={4} align="center" pt={5} pl={3}>
          <Avatar size="xl" bg="black" />
          <Flex flexDir="column" ml={10} display="flex">
            <Heading as="h3" size="sm">
              {user.nombres.split(' ')[0]} {user.apellidos.split(' ')[0]}
            </Heading>
            <Text color="gray" pt={3}>
              {user.rol.toUpperCase()}
            </Text>
          </Flex>
        </Flex>
      </Flex>

      {/* Ítems */}
      <Flex p="5%" w="100%" as="nav" flexDir="column">
        <NavItem icon={icono} title={listaAcciones} active />
      </Flex>
      <Flex p="5%"  w="100%" as="nav" align="center" pt="25%" flexDir="column">
        <Button  w="50%" colorScheme="pink" variant="solid" onClick={cerrarSesion}>
          Cerrar sesión
        </Button>
      </Flex>
      <Box h="500px"></Box>
    </Flex>
  );
}
