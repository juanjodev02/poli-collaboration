import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  HStack,
  Switch,
  Heading,
  VStack,
  SimpleGrid,
  FormControl,
  Input,
  Select,
  FormLabel,
  Button,
  InputRightElement,
  FormErrorMessage,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Login from '../components/login/Login';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import Terms from '../components/resources/Terms';
import axios from 'axios';
import environment from '../utils/environment';
import { useRouter } from 'next/router';
import Header from '../components/resources/header';
import Cookies from 'js-cookie';

const SignUp = () => {
  // Hooks in order to
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => setShowPassword(!showPassword);
  const [showPassConfirmation, setShowPassConf] = useState(false);
  const handleClickConf = () => setShowPassConf(!showPassConfirmation);
  const [termsAccepted, toggleTerms] = useState(false);
  const handleClickTerms = () => toggleTerms(!termsAccepted);

  const [formHabilitado, setformHabilitado] = useState(true);

  // Validaciones FrontEnd
  const initialFieldValue = '';
  const router = useRouter();

  const SignUpSchema = Yup.object().shape({
    nombres: Yup.string().min(3, 'Prueba con un nombre más largo.').max(70, 'Tu nombre debe ser más corto.').required('Campo obligatorio'),
    apellidos: Yup.string()
      .min(2, 'Prueba con un apellido más largo.')
      .max(70, 'Tu nombre debe ser más largo.')
      .required('Campo obligatorio'),
    correoInstitucional: Yup.string()
      .email('Dirección de correo electrónico no válida')
      .required('Campo obligatorio')
      .matches('^[a-z]{3,15}.[a-z]{3,15}[0-9]{0,2}(@epn.edu.ec)$', 'Correo no perteneciente a la EPN'),
    sexo: Yup.string().required('Campo obligatorio'),
    carrera: Yup.string().required('Campo obligatorio'),
    fechaNacimiento: Yup.date().required('Campo obligatorio'),
    password: Yup.string().required('Campo obligatorio'),
    passwordConfirmation: Yup.string()
      .required('Campo obligatorio')
      .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden'),
  });

  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      nombres: initialFieldValue,
      apellidos: initialFieldValue,
      correoInstitucional: initialFieldValue,
      sexo: initialFieldValue,
      carrera: initialFieldValue,
      fechaNacimiento: initialFieldValue,
      password: initialFieldValue,
      passwordConfirmation: initialFieldValue,
    },
    validationSchema: SignUpSchema,
    onSubmit: (values, { resetForm }) => {
      const usuario = {
        nombres: values.nombres,
        apellidos: values.apellidos,
        correoInstitucional: values.correoInstitucional,
        sexo: values.sexo,
        carrera: values.carrera,
        fechaNacimiento: values.fechaNacimiento,
        password: values.password,
      };
      axios
        .post(`${environment.api}/usuario`, usuario, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          setformHabilitado(false);
          toast({
            title: 'Usuario registrado',
            description: `El usuario ${usuario.nombres} ${usuario.apellidos} ahora puede iniciar sesión.`,
            status: 'success',
            duration: 4000,
            onCloseComplete: () => {
              router.reload(window.location.pathname);
            },
          });
        });
    },
  });

  useEffect(() => {
    if (Cookies.get('token')) {
      router.push('denuncias');
    }
  });
  
  return (
    <>
      <Header />
      <SimpleGrid columns={2} spacingX="40px" pt="7vh">
        <Terms />
        {/* Formulario de registro */}
        <Flex px={'10%'} pt={'5%'} pb={2}>
          <Box shadow="md" background="white" borderWidth="1px" width="100%" borderRadius="lg">
            {/* Titulo */}
            <VStack>
              <Heading as="h2" size="xl" py={10}>
                Crear una cuenta
              </Heading>
            </VStack>
            <form onSubmit={formik.handleSubmit}>
              {/* Nombre y Apellido */}
              <HStack px={10} py={2}>
                <FormControl width="50%" id="nombreUsuario" isInvalid={formik.errors.nombres && formik.touched.nombres}>
                  <Input placeholder="Nombres del estudiante *" name="nombres" onChange={formik.handleChange} />
                </FormControl>
                <FormControl width="50%" id="apellidoUsuario" isInvalid={formik.errors.apellidos && formik.touched.apellidos}>
                  <Input placeholder="Apellidos del estudiante *" name="apellidos" onChange={formik.handleChange} />
                </FormControl>
              </HStack>

              <HStack px={10}>
                <Text width="50%" fontSize="xs" color="red.500">
                  {formik.errors.nombres}
                </Text>
                <Text width="50%" fontSize="xs" color="red.500">
                  {formik.errors.apellidos}
                </Text>
              </HStack>

              {/* Correo */}
              <FormControl
                px={10}
                py={2}
                mt={2}
                id="correoInstitucional"
                isInvalid={formik.errors.correoInstitucional && formik.touched.correoInstitucional}
              >
                <Input
                  placeholder="Correo institucional (Ej.: nombre.apellido@epn.edu.ec)"
                  name="correoInstitucional"
                  onChange={formik.handleChange}
                />
                <Text py="2" fontSize="xs" color="red.500">
                  {formik.errors.correoInstitucional}
                </Text>
              </FormControl>

              {/* Carrera */}
              <FormControl id="carreraUsuario" px={10} py={2} isInvalid={formik.errors.carrera && formik.touched.carrera}>
                <Select id="carrera" placeholder="Seleccione una carrera" variant="filled" name="carrera" onChange={formik.handleChange}>
                  <option id="1" value="software">
                    Ingeniería de Software
                  </option>
                  <option id="2" value="computacion">
                    Ciencias de la Computación
                  </option>
                  <option id="3" value="sistemas">
                    Ingeniería en Sistemas
                  </option>
                </Select>
              </FormControl>

              <HStack px={10}>
                <Text width="50%" fontSize="xs" color="red.500">
                  {formik.errors.carrera}
                </Text>
              </HStack>

              {/* Sexo y fecha de nacimiento */}
              <HStack px={10} py={2} mt={2}>
                <FormControl width="50%" id="sexoUsuario" isInvalid={formik.errors.sexo && formik.touched.sexo}>
                  <Select id="sexo" placeholder="Seleccione su sexo" variant="filled" name="sexo" onChange={formik.handleChange}>
                    <option id="1" value="hombre">
                      Hombre
                    </option>
                    <option id="2" value="mujer">
                      Mujer
                    </option>
                  </Select>
                </FormControl>

                <FormControl width="50%" id="fechaNacimiento" isInvalid={formik.errors.fechaNacimiento && formik.touched.fechaNacimiento}>
                  <Input
                    type="text"
                    id="fechaNac"
                    onFocus={() => {
                      document.getElementById('fechaNac').type = 'date';
                    }}
                    onBlur={() => {
                      document.getElementById('fechaNac').type = 'text';
                    }}
                    name="fechaNacimiento"
                    placeholder="Fecha de nacimiento"
                    onChange={formik.handleChange}
                  />
                </FormControl>
              </HStack>

              <HStack px={10}>
                <Text width="50%" fontSize="xs" color="red.500">
                  {formik.errors.sexo}
                </Text>
                <Text width="50%" fontSize="xs" color="red.500">
                  {formik.errors.fechaNacimiento}
                </Text>
              </HStack>

              {/* Contraseña */}
              <HStack mt={2} px={10} py={2}>
                <FormControl width="50%" id="passwordUsuario" isInvalid={formik.errors.password && formik.touched.password}>
                  <Input
                    placeholder="Contraseña"
                    name="password"
                    onChange={formik.handleChange}
                    type={showPassword ? 'text' : 'password'}
                  />
                  <InputRightElement h="100%">
                    <Button onClick={handleClick}>{showPassword ? <ViewOffIcon /> : <ViewIcon />}</Button>
                  </InputRightElement>
                </FormControl>
                <FormControl
                  width="50%"
                  id="passwordConfirmacionUsuario"
                  isInvalid={formik.errors.passwordConfirmation && formik.touched.passwordConfirmation}
                >
                  <Input
                    placeholder="Confirmación de contraseña"
                    name="passwordConfirmation"
                    onChange={formik.handleChange}
                    type={showPassConfirmation ? 'text' : 'password'}
                  />
                  <InputRightElement h="100%">
                    <Button onClick={handleClickConf}>{showPassConfirmation ? <ViewOffIcon /> : <ViewIcon />}</Button>
                  </InputRightElement>
                </FormControl>
              </HStack>

              <HStack px={10}>
                <Text width="50%" fontSize="xs" color="red.500">
                  {formik.errors.password}
                </Text>
                <Text width="50%" fontSize="xs" color="red.500">
                  {formik.errors.passwordConfirmation}
                </Text>
              </HStack>

              {/* Aceptar terminos y condiciones */}
              <FormControl id="confirmacionTerminos" display="flex" justifyContent="center" py={4}>
                <Switch id="emailAlerts" pr={5} onChange={handleClickTerms} />
                <FormLabel htmlFor="email-alerts" mb="0">
                  Acepto los términos y condiciones
                </FormLabel>
              </FormControl>
              {/* Botón registrar */}
              <HStack justifyContent="center" mr={3} py={2}>
                <Button type="submit" colorScheme="blue" isDisabled={!termsAccepted || !formHabilitado}>
                  Crear una cuenta
                </Button>
              </HStack>
            </form>
            {/* Link ingresar */}
            <Login />
          </Box>
        </Flex>
      </SimpleGrid>
    </>
  );
};

export default SignUp;
