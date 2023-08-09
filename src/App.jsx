import { ThemeProvider } from "./context/ThemeContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import { AuthProvider } from "./context/AuthContext";
import RequireAuth from "./components/RequireAuth";
import PersistUserSession from "./components/PersistUserSession";
import LogOut from "./pages/LogOut";
import RecipeForm from "./pages/RecipeForm";
import ViewRecipe from "./pages/ViewRecipe";
import { RecipeReducerProvider } from "./context/RecipeReducerContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <RecipeReducerProvider>
              <Routes>
                <Route element={<PersistUserSession />}>
                  <Route index path="/" element={<Home />} />
                  <Route element={<RequireAuth />}>
                    <Route path="/myrecipes" element={<Dashboard />}>
                      <Route path="create" element={<RecipeForm />} />
                      <Route path="edit/:id" element={<RecipeForm />} />
                      <Route path=":id" element={<ViewRecipe />} />
                    </Route>
                  </Route>
                </Route>
                <Route path="/login" element={<LogIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/logout" element={<LogOut />} />
              </Routes>
            </RecipeReducerProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
