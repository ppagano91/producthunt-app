import React, { useEffect } from "react";
import { useRouter } from "next/router";

const IdProducto = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  useEffect(() => {
    if (id) {
      console.log("Hay un id");
    }
  }, [id]);

  return <div>IdProducto {id}</div>;
};

export default IdProducto;
