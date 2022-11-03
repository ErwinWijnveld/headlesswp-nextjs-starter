import { imageQuery, projectQuery, standardGlobalQueries, standardPostQueries } from "./fragments";

import { gql } from "@apollo/client";
import { client } from "./apollo";

export async function fetchAPI(query = '', { variables }: Record<string, any> = {}) {
  const {data} = await client.query({
		query: gql(query),
    variables,
	});
  // make immutable object data writeable
  return JSON.parse(JSON.stringify(data))
}

export async function mutateAPI(mutation = '', { variables }: Record<string, any> = {}) {
  const res = await client.mutate({
		mutation: gql(mutation),
    variables,
	});
  return res
}

