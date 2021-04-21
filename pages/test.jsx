import Head from "next/head";
import Link from "next/link";
import { API } from "../services";
import { withApollo } from "../apollo";
import { Columns, Column, Section } from "../components/Bulma";
import { Definition, Layout, Navbar, Sidebar } from "../components";

const query = `query Definitions($author: ID, $word: String, $page: Int) {
    definitions(filter: { author: $author, word: $word }, page: $page) {
        id
        word
        meaning
        example
        score
        language
        author {
          id
          email
          name
        }
        createdAt
    }
  }`;

export const getServerSideProps = async ({ query: _query }) => {
  try {
    let { page } = _query;
    page = parseInt(page, 10);
    const variables = { page };
    const { data } = await API({ data: { query, variables } });
    const {
      data: { definitions },
    } = data;
    return {
      props: { definitions },
    };
  } catch (error) {
    console.error(error.response.data.errors);
    return { props: { definitions: [] } };
  }
};

const Text = ({ definitions }) => (
  <>
    <Head>
      <title>Kreol</title>
    </Head>
    <Navbar />
    <Layout>
      <Columns>
        <Column isOneFifth isHiddenMobile>
          <Sidebar />
        </Column>
        <Column isTwoThirds="desktop" isFourFifths="tablet">
          <Section>
            {definitions.map((definition) => (
              <Definition key={definition.id} data={definition} />
            ))}
          </Section>
          <Link href={{ pathname: "/test", query: { page: 1 } }}>
            <a href="/test">1</a>
          </Link>
          <Link href={{ pathname: "/test", query: { page: 2 } }}>
            <a href="/test">2</a>
          </Link>
        </Column>
      </Columns>
    </Layout>
  </>
);

export default withApollo(Text);
