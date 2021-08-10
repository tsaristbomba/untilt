import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { renderWithRedux } from "../Controllers/Redux/store";
import Sidebar from "../Views/Sidebar/sidebar";

describe("SIDEBAR", () => {
  it("My bugs qty starts with 0", () => {
    renderWithRedux(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    const numElement = screen.getByTestId("my-bugs-qty");

    expect(numElement).toHaveTextContent("0");
  });
});
