import React from 'react';
import { Box, Text, VStack, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import RevisionDenuncia from '../denuncias/RevisionDenuncia';

export default function DenunciaItem({ titulo, fecha, autor, tipo, estado, hechos, idDenuncia }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box shadow="md" background="white" borderWidth="1px" width="80%" alignItems="center" onClick={onOpen}>
        <VStack pt={5} px={10} align="start">
          {/* Titulo Denuncia */}
          <Text as="b" fontSize="xl">
            {titulo} - <strong>{estado}</strong>
          </Text>
          {/* Datos Denuncia */}
          <SimpleGrid columns={3} width="100%" spacingX={'5%'} pb={5}>
            <Text color="gray.500">{fecha}</Text>
            <Text color="gray.500">{autor}</Text>
            <Text color="gray.500" pl={5}>
              {tipo.toUpperCase()}
            </Text>
          </SimpleGrid>
        </VStack>
      </Box>
      <RevisionDenuncia
        isOpen={isOpen}
        onClose={onClose}
        titulo={titulo}
        fecha={fecha}
        autor={autor}
        tipo={tipo}
        estado={estado}
        hechos={hechos}
        idDenuncia={idDenuncia}
      />
    </>
  );
}
