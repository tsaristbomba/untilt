import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { renderWithRedux } from "../redux/store";
import Sidebar from "../components/sidebar";

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
