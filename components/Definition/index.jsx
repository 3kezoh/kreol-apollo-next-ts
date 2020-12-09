const Definition = ({ data: { word, meaning, example, author } }) => (
  <article className="content">
    <h1 className="title">{word}</h1>
    <p>{meaning}</p>
    <p className="is-italic">{example}</p>
    <p>{`by ${author.email}`}</p>
  </article>
);

export default Definition;
