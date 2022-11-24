import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Container className="">
      <Routes>
        <Route path="/" element={<div>Hi</div>} />
        <Route path="/new" element={<div>new</div>} />
        <Route path="/:id">
          <Route index element={<div>show</div>} />
          <Route path="edit" element={<div>edit</div>} />
        </Route>
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
