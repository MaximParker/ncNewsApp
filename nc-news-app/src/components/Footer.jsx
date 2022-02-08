const links = [{text: "My portfolio", URL: "https://github.com/MaximParker"}]

function Footer() {
  return (
    <section id="footer">
      <ul>
        {links.map((entry) => {
          return <li key={entry.text}><a href={entry.URL}>{entry.text}</a></li>
        })}
      </ul>
      <sub>ForumFactory © MaximParker</sub>
    </section>
  );
}

export default Footer;
