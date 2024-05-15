import React from "react";
import Navbar from "./components/Navbar";
import styled from "styled-components";
import Footer from "./components/Footer";
import Home from "./pages/Home";

const AppContainer = styled.div``;

function App() {
  return (
    <AppContainer>
      <Navbar />
      <main>
        <Home />
      </main>
      <Footer />
    </AppContainer>
  );
}

export default App;
