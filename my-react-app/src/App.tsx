import { Header } from "./components/Header.tsx";
import { PostList } from "./components/PostList.tsx";
import { posts } from "./data/posts.ts";
import "./App.css";

function App() {
  return (
    <>
      <Header
        title="Forum"
        description="Місце для спілкування та обміну ідеями"
      />

      <main className="container">
        <h2 className="section-title">Останні публікації</h2>

        <PostList posts={posts} />
      </main>
    </>
  );
}

export default App;