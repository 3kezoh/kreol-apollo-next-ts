import Head from "next/head";
import Link from "next/link";
import { gql } from "@apollo/client";
import { Columns, Column, Section } from "@Bulma";
import { Layout, Navbar, Sidebar } from "@components";
import { fetch } from "@lib/api";

const DEFINITIONS_PER_PAGES = 50;

const GET_POPULAR = gql`
  query Popular($letter: String!, $limit: Int) {
    popular(letter: $letter, limit: $limit) {
      id
      word
      meaning
    }
  }
`;

const getServerSideProps = async ({ query }) => {
  const { letter } = query;
  const {
    data: { popular: definitions },
  } = await fetch({
    query: GET_POPULAR,
    variables: { letter, limit: DEFINITIONS_PER_PAGES },
  });
  return { props: { definitions, letter } };
};

const Popular = ({ definitions }) => (
  <>
    <Head>
      <title>Popular</title>
    </Head>
    <Navbar />
    <Layout>
      <Columns>
        <Column isOneFifth isHiddenMobile>
          <Sidebar />
        </Column>
        <Column>
          <Section>
            {definitions.map(({ id, word, meaning }) => (
              <div className="definition" key={id}>
                <Link href={`/word/${encodeURIComponent(word)}`}>
                  <a href={`/word/${encodeURIComponent(word)}`} className="word" title={meaning}>
                    {word}
                  </a>
                </Link>
              </div>
            ))}
          </Section>
        </Column>
      </Columns>
    </Layout>
  </>
);

export default Popular;
export { getServerSideProps };
