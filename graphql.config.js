module.exports = {
  projects: {
    app: {
      extensions: {
        endpoints: {
          default: {
            url: "http://localhost:4000/graphql",
            headers: { Authorization: `Bearer ${process.env.KREOL_API_TOKEN}` },
          },
        },
      },
    },
  },
};
