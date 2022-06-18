import React from 'react'
import { Flex, Text, Icon, Link, Menu, MenuButton, MenuList } from '@chakra-ui/react'

export default function NavItem({ icon, title, active }) {
    return (
        <Flex mt={30} flexDir="column" w="100%">
            <Link
                backgroundColor = {active && "blue.100"}
                p = {3}
                _hover = {{ textDecor: 'none', backgroundColor: "gray.100" }}
                w = "100%"
            >
                <Flex>
                    <Icon as={icon} ml={5} boxSize={7} color="black"/>
                    <Text ml={5} my={1} as="b" display="flex">{title}</Text>
                </Flex>
            </Link>
        </Flex>
    )
}