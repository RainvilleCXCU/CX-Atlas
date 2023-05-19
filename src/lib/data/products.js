import { client } from "client";

const { usePosts, useQuery } = client;

export const getProductByName = (name) => {
    const product = useQuery().products({
        where: {
            title: name?.replace('-', ' ')
        }
      });
      return product.edges[0]?.node;
}