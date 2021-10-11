import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { renderWithRedux } from "../redux/store";
import BugForm from "../pages/bug-form";

describe("CREATE BUG", () => {
  it("Has Create Bug button", () => {
    renderWithRedux(
      <MemoryRouter>
        <BugForm title="Create Bug" />
      </MemoryRouter>
    );

    const btnElement = screen.getByTestId("create-bug-btn");

    expect(btnElement).toHaveTextContent("Create Bug");
  });
});

// describe("CREATE BUG", () => {
//   it("Has Create Bug button", () => {
//     renderWithRedux(
//       <MemoryRouter>
//         <BugForm title="Create Bug" />
//       </MemoryRouter>
//     );

//     const btnElement = screen.getByTestId("create-bug-btn");

//     expect(btnElement).toHaveTextContent("Create Bug");
//   });
// });
