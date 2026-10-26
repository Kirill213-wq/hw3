import { Header } from "./components/Header.tsx";
import { PostList } from "./components/PostList.tsx";
import { useGetPostsQuery } from "./api/baseApi.ts";
import "./App.css";

function App() {
  const { data: posts = [], isLoading, isError } = useGetPostsQuery();

  return (
    <>
      <Header
        title="Forum"
        description="Місце для спілкування та обміну ідеями"
      />

      <main className="container">
        <h2 className="section-title">Останні публікації</h2>

        {isLoading ? (
          <p>Завантаження...</p>
        ) : isError ? (
          <p>Не вдалося завантажити пости.</p>
        ) : posts.length === 0 ? (
          <p>Постів поки немає.</p>
        ) : (
          <PostList posts={posts} />
        )}
      </main>
    </>
  );
}

export default App;