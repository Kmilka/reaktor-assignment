import MainPage from "./Components/MainPage";
import ErrorBoundary from "./Components/ErrorBoundary";
function App() {
  return (
    <div>
      <ErrorBoundary>
        <MainPage />
      </ErrorBoundary>
    </div>
  );
}

export default App;
