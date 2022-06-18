import RegistrarDenuncia from '../components/denuncias/RegistrarDenuncia';
import ListarDenuncia from '../components/denuncias/ListarDenuncias';
import Header from '../components/resources/header';
import environment from '../utils/environment';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const Denuncias = () => {
  const [user, setUsuario] = useState({});

  const router = useRouter();

  useEffect(() => {
    if (!Cookies.get('token')) {
      router.push('signup');
    }
    (async function () {
      console.log('COOKIES', document.cookie);
      const token = document.cookie.split('token=')[1];
      console.log('TOKEN', token);
      const resp = await fetch(environment.api + '/auth/getuser', {
        headers: new Headers({
          Authorization: 'Bearer ' + token,
        }),
      }).catch((error) => {
        router.push('signup');
        console.error('Error:', error);
      });
      const user = await resp.json();
      setUsuario(user);
    })();
  }, []);

  if (user) {
    return (
      <>
        <Header />
        {user.rol === 'estudiante' ? <RegistrarDenuncia user={user} /> : user.rol === 'moderador' ? <ListarDenuncia user={user} /> : ''}
      </>
    );
  } else {
    return <h1>Cargando tus datos</h1>;
  }
};

export default Denuncias;
