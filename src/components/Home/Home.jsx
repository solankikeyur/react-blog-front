import Front from "../Layout/Front";
import BlogList from "../Blog/BlogList";

const Home = () => {
  return (
    <Front headerText={"Homepage"}>
      <BlogList></BlogList>
    </Front>
  )
}

export default Home
