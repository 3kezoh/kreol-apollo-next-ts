import Head from "next/head";
import Link from "next/link";
import { Layout } from "@components";
import { getPopular } from "@framework/ssr/definition";
import { initializeApollo } from "@lib/apollo/utils";

const DEFINITIONS_PER_PAGES = 50;

const getStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();
  const { letter } = params;
  const definitions = await getPopular(apolloClient, { letter, limit: DEFINITIONS_PER_PAGES });
  return { props: { definitions }, revalidate: 60 * 60 };
};

const getStaticPaths = async () => {
  const alphabet = [..."abcdefghijklmnopqrstuvwxyz"];
  const paths = alphabet.map((letter) => ({ params: { letter } }));
  return { paths, fallback: false };
};

const Popular = ({ definitions }) => (
  <>
    <Head>
      <title>Popular</title>
    </Head>
    <Layout>
      {definitions.map(({ id, word, meaning }) => (
        <div className="definition" key={id}>
          <Link href={`/word/${encodeURIComponent(word)}`}>
            <a href={`/word/${encodeURIComponent(word)}`} className="word" title={meaning}>
              {word}
            </a>
          </Link>
        </div>
      ))}
    </Layout>
  </>
);

export default Popular;
export { getStaticProps, getStaticPaths };
