import React from 'react';
import { Flex, HStack, Heading, Text, VStack } from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';

const Terms = () => {
  return (
    <Flex px={'10%'} py={'5%'}>
      <VStack alignItems="left">
        <Heading as="h2" size="xl" pb={10}>
          Términos y condiciones
        </Heading>
        {/* Primera norma */}
        <HStack>
          <InfoIcon boxSize={7} />
          <Heading as="h4" size="md" mb={10} pl={5}>
            Uso de lenguaje adecuado
          </Heading>
        </HStack>
        <Text pl={'8%'} pt={5} color="gray.500">
          Mantén un vocabulario respetuoso, decente y apropiado durante tu interacción dentro de la plataforma.
        </Text>
        {/* Segunda norma */}
        <HStack pt={5}>
          <InfoIcon boxSize={7} />
          <Heading as="h4" size="md" mb={10} pl={5}>
            Se respetuoso con los demás
          </Heading>
        </HStack>
        <Text pl={'8%'} pt={5} color="gray.500">
          No ofender o atacar verbalmente a otros estudiantes, profesores o personal administrativo.
        </Text>
        {/* Tercera norma */}
        <HStack pt={5}>
          <InfoIcon boxSize={7} />
          <Heading as="h4" size="md" mb={10} pl={5}>
            Involúcrate en actividades pertinentes
          </Heading>
        </HStack>
        <Text pl={'8%'} pt={5} color="gray.500">
          Ayudar a otros estudiantes solo cuando se sepa la respuesta correcta o solicitar ayuda de temas de relevancia para toda la
          comunidad.
        </Text>
        {/* Cuarta norma */}
        <HStack pt={5}>
          <InfoIcon boxSize={7} />
          <Heading as="h4" size="md" mb={10} pl={5}>
            Evitar temas polémicos
          </Heading>
        </HStack>
        <Text pl={'8%'} pt={5} color="gray.500">
          No generar preguntas, respuestas o denuncias que no sean adecuadas/correctas/comprobadas para mantener un ambiente sano y
          enriquecedor.
        </Text>
      </VStack>
    </Flex>
  );
};

export default Terms;
