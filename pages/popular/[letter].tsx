import { Layout } from "@components";
import { initializeApollo } from "@lib/apollo/utils";
import { PagePopularComp, ssrPopular } from "generated/page";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

const DEFINITIONS_PER_PAGES = 50;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();
  const variables = { letter: params?.letter as string, limit: DEFINITIONS_PER_PAGES };
  const { props } = await ssrPopular.getServerPage({ variables }, apolloClient);
  return { props, revalidate: 60 * 60 };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  const paths = alphabet.map((letter) => ({ params: { letter } }));
  return { paths, fallback: false };
};

const Popular: PagePopularComp = ({ data }) => (
  <>
    <Head>
      <title>Popular</title>
    </Head>
    <Layout>
      {data?.popular.map(
        (definitions) =>
          definitions && (
            <div className="definition" key={definitions.id}>
              <Link href={`/word/${encodeURIComponent(definitions.word)}`}>
                <a
                  href={`/word/${encodeURIComponent(definitions.word)}`}
                  className="word"
                  title={definitions.meaning}
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
