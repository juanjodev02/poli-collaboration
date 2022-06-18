import React, { useState, useEffect } from 'react';
import { Box, Text, VStack, Heading, Flex } from '@chakra-ui/react';
import LeftBar from '../resources/leftBar';
import { FaClipboardList } from 'react-icons/fa';
import DenunciaItem from '../resources/denunciaItem';
import environment from '../../utils/environment';

function ListarDenuncias({ user }) {
  const [denuncias, setDenuncias] = useState(null);
  useEffect(() => {
    (async function () {
      const token = document.cookie.split('=')[1];
      const resp = await fetch(environment.api + '/denuncia', {
        headers: new Headers({
          Authorization: 'Bearer ' + token,
        }),
      });
      const respDenuncias = await resp.json();
      setDenuncias(respDenuncias);
    })();
  }, []);

  if (denuncias) {
    return (
      <>
        <Flex>
          <LeftBar icono={FaClipboardList} user={user} listaAcciones="Gestionar Denuncias" />
          <VStack p={20} width="80%" ml="30%">
            <Heading as="h1" py={10}>
              Seleccione una denuncia
            </Heading>
            {denuncias.map((denuncia, i) => (
              <DenunciaItem
                key={denuncia.idDenuncia}
                titulo={`${i + 1}) ${denuncia.descripcionHechos.replace('\n', ' ').substring(0, 50)}...`}
                fecha={new Date(denuncia.fechaCreacion).toDateString()}
                autor={denuncia.usuario}
                tipo={denuncia.modoCanal}
                estado={denuncia.estado.toUpperCase()}
                hechos={denuncia.descripcionHechos}
                idDenuncia={denuncia.idDenuncia}
              />
            ))}
          </VStack>
        </Flex>
      </>
    );
  } else {
    return <h1>No hay denuncias</h1>;
  }
}

export default ListarDenuncias;
