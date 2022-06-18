import React, { useState } from 'react';
import {
  Text,
  VStack,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  FormControl,
  Button,
  Heading,
  RadioGroup,
  Stack,
  Radio,
  HStack,
  FormLabel,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';
import environment from '../../utils/environment';

export default function RevisionDenuncia({ isOpen, onClose, titulo, fecha, autor, tipo, estado, hechos, idDenuncia }) {
  const initialRef = React.useRef();
  const finalRef = React.useRef();
  const [value, setValue] = React.useState(estado);

  const [formHabilitado, setformHabilitado] = useState(true);

  const token = Cookies.get('token');

  const toast = useToast();

  const router = useRouter();
  // Validaciones FrontEnd
  const initialFieldValue = '';

  const RevisionDenunciaSchema = Yup.object().shape({
    // Denuncia
    estadoDenuncia: Yup.string().required('Campo obligatorio'),
    // Revision
    observacion: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      estado: initialFieldValue,
      observacion: initialFieldValue,
    },
    validationSchema: RevisionDenunciaSchema,
    onSubmit: (formData) => {
      let revision = {};
      const param = idDenuncia;
      revision.observacion = formData.observacion;
      revision.idDenuncia = param;

      if (formData.observacion) {
        // revision
        axios
          .post(`${environment.api}/revision`, revision, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setformHabilitado(false);
            toast({
              title: 'Revisión registrada',
              description: `Se ha registrado correctamente su revisión.`,
              status: 'success',
              duration: 4000,
              onCloseComplete: () => {
                router.reload(window.location.pathname);
              },
            });
          });
      }

      let nuevoEstado = { estado: formData.estadoDenuncia };

      // estado
      if (estado.toUpperCase() !== formData.estadoDenuncia.toUpperCase()) {
        axios
          .put(`${environment.api}/denuncia/${param}`, nuevoEstado, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setformHabilitado(false);
            toast({
              title: 'Cambio de estado de la denuncia exitoso',
              description: `Ha cambiado el estado ${estado} a ${formData.estadoDenuncia}`,
              status: 'success',
              duration: 3000,
              onCloseComplete: () => {
                router.reload(window.location.pathname);
              },
            });
          });
      }
    },
  });

  return (
    <Modal p={5} initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} size="5xl" isCentered>
      <ModalOverlay />
      <ModalContent p={5}>
        <form onSubmit={formik.handleSubmit}>
          <ModalHeader>
            {/* Titulo denuncia */}
            <VStack align="stretch">
              <Heading as="h2" size="xl" px={8} pt={5} pb={2}>
                {titulo}
              </Heading>
            </VStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack alignItems="start">
              {/* Fecha-Autor-Tipo */}
              <SimpleGrid columns={3} width="100%" spacingX={'2%'} pb={5} px={8}>
                <Text color="gray.500">{fecha}</Text>
                <Text color="gray.500">{autor}</Text>
                <Text color="gray.500" pl={5}>
                  {tipo.toUpperCase()}
                </Text>
              </SimpleGrid>
              {/* Descripción de los hechos */}
              <FormControl width="100%" id="descripcionHechos" py={2} mt={2} mb={2} px={8} isReadOnly>
                <HStack>
                  <FormLabel width="30%">Descripción de los hechos:</FormLabel>
                  <Textarea size="sm" width="70%" height="150px">
                    {hechos}
                  </Textarea>
                </HStack>
              </FormControl>

              {/* Estado de la denuncia */}
              <FormControl
                width="100%"
                mt={2}
                mb={2}
                px={8}
                pt={5}
                id="estadoDenuncia"
                isInvalid={formik.errors.estadoDenuncia && formik.touched.estadoDenuncia}
                onChange={formik.handleChange}
              >
                <HStack>
                  <FormLabel width="30%">Estado de la denuncia:</FormLabel>
                  <RadioGroup id="estadoDenuncia" onChange={setValue} value={value} name="estadoDenuncia">
                    <Stack direction="row">
                      <Radio id="1" value="EN REVISIÓN">
                        En Revisión
                      </Radio>
                      <Radio id="2" value="FINALIZADO">
                        Finalizado
                      </Radio>
                    </Stack>
                  </RadioGroup>
                  {estado === 'CREADO' ? (
                    <Text fontSize="xs" color="red.500">
                      {formik.errors.estadoDenuncia}
                    </Text>
                  ) : (
                    ''
                  )}
                </HStack>
              </FormControl>

              {/* Observaciones */}
              <FormControl
                width="100%"
                id="observacion"
                pt={5}
                pb={2}
                mt={2}
                mb={2}
                px={8}
                isInvalid={formik.errors.observacion && formik.touched.observacion}
              >
                <HStack>
                  <FormLabel width="30%">Observaciones:</FormLabel>
                  <Textarea name="observacion" size="sm" width="70%" height="150px" onChange={formik.handleChange}></Textarea>
                </HStack>
              </FormControl>
              <HStack width="30%" pl={15}>
                <Text fontSize="xs" color="red.500">
                  {formik.errors.observacion}
                </Text>
              </HStack>
            </VStack>
          </ModalBody>
          <ModalFooter justifyContent="center">
            {/* Botón para iniciar sesión */}
            <Button type="submit" colorScheme="blue" mr={3} isDisabled={!formHabilitado}>
              Registrar Revisión
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
