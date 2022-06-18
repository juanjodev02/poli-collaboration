import React, { useState } from 'react';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  VStack,
  Textarea,
  Button,
  Text,
  Image,
  useToast,
} from '@chakra-ui/react';
import LeftBar from '../resources/leftBar';
import { FaUser } from 'react-icons/fa';
import { WarningTwoIcon } from '@chakra-ui/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import environment from '../../utils/environment';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const RegistrarDenuncia = ({ user }) => {

  const [formHabilitado, setformHabilitado] = useState(true)

  const toast = useToast();

  const router = useRouter();

  const token = Cookies.get('token');

  // Validaciones FrontEnd
  const initialFieldValue = '';

  const RegistrarDenunciaSchema = Yup.object().shape({
    tipoDenuncia: Yup.string().required('Campo obligatorio'),
    modoCanal: Yup.string().required('Campo obligatorio'),
    telefonoContacto: Yup.string()
      .required('Campo obligatorio')
      .matches('^[0-9]+$', 'Solo debe tener números')
      .min(7, 'Muy corto.')
      .max(10, 'Muy largo.'),
    descripcionHechos: Yup.string().required('Campo obligatorio').min(50, 'La descripción debe tener un mínimo de 50 caracteres.'),
    adjunto: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      tipoDenuncia: initialFieldValue,
      modoCanal: initialFieldValue,
      telefonoContacto: initialFieldValue,
      descripcionHechos: initialFieldValue,
      adjunto: initialFieldValue,
    },
    validationSchema: RegistrarDenunciaSchema,
    onSubmit: (formData) => {
      let denuncia = { ...formData };
      denuncia.idUsuario = user.idUsuario;
      denuncia.estado = 'Creado';
      axios
        .post(`${environment.api}/denuncia`, denuncia, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setformHabilitado(false);
          toast({
            title: 'Denuncia registrada',
            description: `Se ha registrado correctamente su denuncia.`,
            status: 'success',
            duration: 4000,
            onCloseComplete: () => {
              router.reload(window.location.pathname);
            },
          });
        });
    },
  });
  if (user) {
    return (
      <Flex>
        <LeftBar icono={WarningTwoIcon} user={user} listaAcciones="Registrar Denuncias" />
        <HStack pl="35%" pt="12vh" width="90%">
          <Flex shadow="md" background="white" borderWidth="1px" width="80%" borderRadius="lg" boxShadow="dark-lg" rounded="md" justifyContent="center">
            <VStack>
              {/* Título */}
              <Heading as="h2" size="xl" py={10}>
                Ingresar datos de la denuncia
              </Heading>
              <form onSubmit={formik.handleSubmit}>
                {/* Tipo de denuncia */}
                <FormControl
                  id="tipoDenuncia"
                  py={2}
                  mt={2}
                  mb={2}
                  isInvalid={formik.errors.tipoDenuncia && formik.touched.tipoDenuncia}
                >
                  <HStack w="100%">
                    <FormLabel id="tipoDenuncia" width="40%">
                      Tipo de denuncia:
                    </FormLabel>
                    <Select
                      id="tipoDenuncia"
                      placeholder="Seleccione un tipo de denuncia"
                      variant="filled"
                      height="60px"
                      name="tipoDenuncia"
                      onChange={formik.handleChange}
                    >
                      <option id="1" value="Acoso y maltrato">
                        Acoso y maltrato
                      </option>
                      <option id="2" value="Abuso de poder">
                        Abuso de poder
                      </option>
                      <option id="3" value="Otros">
                        Otros
                      </option>
                    </Select>
                  </HStack>
                </FormControl>

                <HStack pl="32%">
                  <Text justifyContent="left" fontSize="xs" color="red.500">
                    {formik.errors.tipoDenuncia}
                  </Text>
                </HStack>

                {/* Modo canal */}
                <FormControl
                  id="modoCanal"
                  py={2}
                  mt={2}
                  mb={2}
                  isInvalid={formik.errors.modoCanal && formik.touched.modoCanal}
                >
                  <HStack>
                    <FormLabel width="40%">Modo del canal:</FormLabel>
                    <Select
                      id="modoCanal"
                      placeholder="Seleccione un modo de denuncia"
                      variant="filled"
                      height="60px"
                      name="modoCanal"
                      onChange={formik.handleChange}
                    >
                      <option value="Confidencial">Confidencial</option>
                      <option value="No confidencial">No confidencial</option>
                    </Select>
                  </HStack>
                </FormControl>
                <HStack pl="32%">
                  <Text fontSize="xs" color="red.500">
                    {formik.errors.modoCanal}
                  </Text>
                </HStack>

                {/* Teléfono */}
                <FormControl
                  id="telefonoContacto"
                  py={2}
                  mt={2}
                  mb={2}
                  isInvalid={formik.errors.telefonoContacto && formik.touched.telefonoContacto}
                >
                  <HStack>
                    <FormLabel width="30%">Teléfono de contacto:</FormLabel>
                    <Input
                      placeholder="(Ej.: 0993568456)"
                      width="70%"
                      height="60px"
                      name="telefonoContacto"
                      onChange={formik.handleChange}
                    ></Input>
                  </HStack>
                </FormControl>
                <HStack pl="32%">
                  <Text fontSize="xs" color="red.500">
                    {formik.errors.telefonoContacto}
                  </Text>
                </HStack>

                {/* Descripción de los hechos */}
                <FormControl
                  id="descripcionHechos"
                  py={2}
                  mt={2}
                  mb={2}
                  isInvalid={formik.errors.descripcionHechos && formik.touched.descripcionHechos}
                >
                  <HStack>
                    <FormLabel width="30%">Descripción de los hechos:</FormLabel>
                    <Textarea
                      name="descripcionHechos"
                      placeholder="Detalle los actores, la situación y la posible solución que propone"
                      size="sm"
                      width="70%"
                      height="150px"
                      onChange={formik.handleChange}
                    ></Textarea>
                  </HStack>
                </FormControl>
                <HStack pl="32%">
                  <Text fontSize="xs" color="red.500">
                    {formik.errors.descripcionHechos}
                  </Text>
                </HStack>

                {/* Subir evidencia */}
                <FormControl id="adjunto" py={2} mt={2} mb={2} isInvalid={formik.errors.adjunto && formik.touched.adjunto}>
                  <HStack>
                    <FormLabel width="30%">Información adjunta:</FormLabel>
                    <Input
                      name="adjunto"
                      pt={2}
                      type="file"
                      placeholder="Ningún archivo subido"
                      width="70%"
                      height="60px"
                      onChange={formik.handleChange}
                    ></Input>
                  </HStack>
                </FormControl>
                <HStack px="32%">
                  <Text fontSize="xs" color="red.500">
                    {formik.errors.adjunto}
                  </Text>
                </HStack>

                {/* Botón */}
                <HStack justifyContent="center" pt={2} pb={8}>
                  <Button type="submit" colorScheme="blue" isDisabled={!formHabilitado}>
                    Registrar Denuncia
                  </Button>
                </HStack>
              </form>
            </VStack>
          </Flex>
          <Flex width="20%" pl="5%">
            <VStack>
              <FaUser size="100px" />
              <Heading as="h3" size="lg" pt={10} pb={8}>
                Recuerda...
              </Heading>
              <Text as="b">La información proporcionada debes ser real</Text>
              <Image src="https://i.imgur.com/agchfao.png" alt="flecha"/>
            </VStack>
          </Flex>
        </HStack>
      </Flex>
    );
  } else {
    return <h1>Esperando</h1>;
  }
};

export default RegistrarDenuncia;
