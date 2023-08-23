import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { FirebaseContext } from "../../firebase";

import Layout from "../../components/layout/Layout";
import Error404 from "../../components/layout/404";

const IdProducto = () => {
  // state del componente
  const [producto, setProducto] = useState({});
  const [error, setError] = useState(false);

  // routing para obtener el id actual
  const router = useRouter();
  const {
    query: { id },
  } = router;

  // context de firebase
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    if (id) {
      const obtenerProducto = async () => {
        const productoQuery = await firebase.db.collection("productos").doc(id);
        const producto = await productoQuery.get();
        if (producto.exists) {
          console.log(producto.data());
          setProducto(producto.data());
        } else {
          setError(true);
        }
        setError(false);
      };
      obtenerProducto();
    }
  }, [id]);

  return (
    <Layout>
      <>{error && <Error404 />}</>
    </Layout>
  );
};

export default IdProducto;
