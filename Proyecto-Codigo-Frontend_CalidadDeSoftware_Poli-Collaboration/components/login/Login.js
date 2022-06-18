import React from 'react';
import {
  useDisclosure,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  Input,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  Modal,
  FormControl,
  HStack,
  Button,
  Link,
  VStack,
  Text,
  Heading,
  Checkbox,
  InputRightElement,
  useToast
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import environment from '../../utils/environment';
import Cookies from 'js-cookie'

const Login = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const toast = useToast();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showNoAuthorized, setShowNoAuthorized] = React.useState(false);
  const handleClick = () => setShowPassword(!showPassword);

  // Validaciones FrontEnd
  const initialFieldValue = '';

  const router = useRouter();

  const LoginSchema = Yup.object().shape({
    correoInstitucional: Yup.string()
      .email('Dirección de correo electrónico no válida')
      .required('Campo obligatorio')
      .matches('^[a-z]{3,15}.[a-z]{3,15}[0-9]{0,2}(@epn.edu.ec)$', 'Correo no perteneciente a la EPN'),
    password: Yup.string().required('Campo obligatorio'),
  });

  const formik = useFormik({
    initialValues: {
      correoInstitucional: initialFieldValue,
      password: initialFieldValue,
    },
    validationSchema: LoginSchema,
    onSubmit: (credenciales) => {
      axios
        .post(`${environment.api}/auth/login`, credenciales, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((resp) => {
          toast({
            title: 'Se ha auntenticado correctamente',
            description: `Bienvenido al sistema Poli - Collaboration.`,
            status: 'success',
            duration: 2000,
          });
          setShowNoAuthorized(false);
          Cookies.set('token',  resp.data.access_token , { expires: 1 })
          router.push('./denuncias');
        })
        .catch((err) => {
          setShowNoAuthorized(true);
        });
    },
  });


  return (
    <>
      {/* Apertura de la ventana de LogIn */}
      <HStack justifyContent="center" mr={3} py={2}>
        <Link color="blue.400" onClick={onOpen}>
          ¿Tienes cuenta? Ingresa aquí
        </Link>
      </HStack>

      {/* Cuadro modal */}
      <Modal p={5} initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent p={5}>
          <form onSubmit={formik.handleSubmit}>
            {/* Titulo */}
            <ModalHeader>
              <VStack>
                <Heading as="h2" size="xl" pt={5} pb={10}>
                  Iniciar Sesión
                </Heading>
              </VStack>
            </ModalHeader>

            <ModalCloseButton />
            <ModalBody pb={6}>
              {/* Correo institucional */}
              <FormControl
                mt={2}
                mb={2}
                px={8}
                id="correoUsuario"
                isInvalid={formik.errors.correoInstitucional && formik.touched.correoInstitucional}
              >
                <Input
                  height={'60px'}
                  name="correoInstitucional"
                  placeholder="Correo institucional (Ej. : nombre.apellido@epn.edu.ec)"
                  onChange={formik.handleChange}
                />
                <Text py="2" fontSize="xs" color="red.500">
                  {formik.errors.correoInstitucional}
                </Text>
              </FormControl>

              {/* Contraseña de usuario */}
              <HStack mt={4}>
                <FormControl mt={2} mb={2} px={8} id="passwordUsuario" isInvalid={formik.errors.password && formik.touched.password}>
                  <Input
                    height={'60px'}
                    name="password"
                    onChange={formik.handleChange}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Contraseña"
                  />
                  <InputRightElement h="100%" pr={10}>
                    <Button onClick={handleClick}>{showPassword ? <ViewOffIcon /> : <ViewIcon />}</Button>
                  </InputRightElement>
                </FormControl>
              </HStack>
              <HStack px={8}>
                <Text fontSize="xs" color="red.500">
                  {formik.errors.password}
                </Text>
              </HStack>

              {/* Recordar Credenciales */}
              {showNoAuthorized ? (
                <HStack mt={5} mb={3} px={8}>
                  <Text fontSize="xs" color="red.500">
                    Por favor, proporcione credenciales válidas.
                  </Text>
                </HStack>
              ) : (
                ''
              )}
            </ModalBody>

            <ModalFooter justifyContent="center">
              {/* Botón para iniciar sesión */}
              <Button type="submit" colorScheme="blue" mr={3}>
                Ingresar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Login;
