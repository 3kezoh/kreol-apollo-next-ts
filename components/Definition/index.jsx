import { format } from "date-fns";
import { fr as locale } from "date-fns/locale";

const FORMAT = "d MMMM yyyy";
const options = { locale };

const Definition = ({ data: { word, meaning, example, author, createdAt } }) => {
  const date = format(new Date(createdAt), FORMAT, options);

  return (
    <article className="content">
      <h1 className="title">{word}</h1>
      <p>{meaning}</p>
      <p className="is-italic">{example}</p>
      <p>{`Posté le ${date} par ${author.name}`}</p>
    </article>
  );
};

export default Definition;
