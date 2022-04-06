import { ApolloError } from "@apollo/client";
import { Layout } from "@components";
import { initializeApollo } from "@lib/apollo/utils";
import { PopularQuery } from "generated/graphql";
import { ssrPopular } from "generated/page";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { Block, Content, Heading } from "react-bulma-components";

const DEFINITIONS_PER_PAGES = 50;

type Props = { data?: PopularQuery; error?: ApolloError; letter: string };

type PagePopularComp = React.FC<Props>;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();
  const variables = { letter: params?.letter as string, limit: DEFINITIONS_PER_PAGES };
  const { props } = await ssrPopular.getServerPage({ variables }, apolloClient);
  return { props: { ...props, letter: params?.letter }, revalidate: 60 * 60 };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  const paths = alphabet.map((letter) => ({ params: { letter } }));
  return { paths, fallback: false };
};

const Popular: PagePopularComp = ({ data, letter }) => (
  <>
    <Head>
      <title>Popular</title>
    </Head>
    <Layout>
      <Heading>{letter.toUpperCase()}</Heading>
      {data?.popular.map(
        (definitions) =>
          definitions && (
            <div key={definitions.id}>
              <Link href={`/word/${encodeURIComponent(definitions.word)}`}>
                <a
                  href={`/word/${encodeURIComponent(definitions.word)}`}
                  title={definitions.meaning}
                  data-cy="definition"
                >
                  {definitions.word}
                </a>
              </Link>
            </div>
          )
      )}
    </Layout>
  </>
);

export default Popular;
